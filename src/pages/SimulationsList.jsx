import api from "/src/utils/api"
import { useEffect, useState, useLayoutEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { useAppState } from "/src/states/app"
import { typeMapper } from "/src/utils/simulation"
import { useLocale } from "/src/utils/hooks"
import {
    IconArrowForwardIos,
    IconCheckCircleStatus,
    IconScheduleStatus,
    IconHistoryStatus,
    IconCancelStatus,
} from "/src/components/Icons/Emph/20"
import {
    IconAdd
} from "/src/components/Icons/Emph/24"
import { IconSwapVert } from "/src/components/Icons/20"
import { Select, Button } from "/src/components/Inputs"
import * as classes from "./SimulationsList.module.sass"
import fakeData from "/src/fakeData"

const fetchAllSimulations = async (dispatch) => {
    let ids

    try {
        ids = await api.get("/simulation/all")
        ids = ids.json.map(simulation => simulation.uuid)
    } catch (e) {
        if (e instanceof api.ApiNetworkError || e instanceof api.ApiBodyParseError) {
            // warning bad server
        } else if (e instanceof api.ApiResponseError) {
            // warning bad action
        } else {
            console.log(e)
            // warning unexpected json server responses should never happen
        }

        return
    }

    let requests = await Promise.allSettled( ids.map(id => api.get("/simulation/" + id)) )

    const simulations = requests
        .filter(request => request.status === "fulfilled")
        .map(request => request.value.json)

    if (simulations.length !== requests.length) {
        // warning bad action
    }

    dispatch({
        type: "setSimulations",
        simulations
    })
}

const fetchAllSimulationsFake = async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 4000));

    dispatch({
        type: "setSimulations",
        simulations: fakeData.simulations
    })
}

const sortings = {
    new: (a, b) => Date.parse(a.createTime) < Date.parse(b.createTime),
    recent: (a, b) => Math.random() < 1/2,
    alph: (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })
}

const sortLabels = {
    new: "Najnovšie",
    recent: "Posledné navštívené",
    alph: "Abecedne"
}

function SimulationsList() {
    const [{ simulations, locale }, dispatch] = useAppState()
    const [params, setParams] = useSearchParams()

    const [page, setPage] = useState(parseInt(params.get("page")))
    const [sort, setSort] = useState(params.get("sort"))

    // page correction
    useLayoutEffect(() => {
        if (!page || page < 1) {
            setPage(1)
        } else if (simulations?.length && page > Math.ceil(simulations.length / 10)) {
            setPage(Math.ceil(simulations.length / 10))
        }
    }, [page, simulations])

    // sort correction
    useLayoutEffect(() => {
        if (!sortings[sort]) {
            setSort(Object.keys(sortings)[0])
        }
    }, [])
    
    useEffect(() => {
        if (!simulations) {
            //fetchAllSimulations(dispatch)
            fetchAllSimulationsFake(dispatch)
        }
    }, [])
    
    return (
        <>
            <section className={classes.primaryActions}>
                <Button IconTop={IconAdd} outlined to="new" >Pridať simuláciu</Button>
            </section>
            <section>
                <ListControls sort={sort} setSort={setSort} />
                <ListLabels />
                <ListFilters />
                <List simulations={simulations} sort={sort} locale={locale} />
            </section>
        </>
    )
}

function ListControls({ sort, setSort }) {
    const sortIds = Object.keys(sortings)

    return (
        <div className={classes.controls}> 
            <Select
                IconLeft={IconSwapVert}
                list={sortIds.map(sortId => sortLabels[sortId])}
                selected={sortIds.indexOf(sort)}
                onSelect={i => setSort(sortIds[i])}
            >
                {sortLabels[sort]}
            </Select>
        </div>
    )
}

function ListLabels() {
    return (
        <div className={classes.labels}>
            <span>názov</span>
            <span>dátum</span>
            <span>typ</span>
            <span>status</span>
            <span></span>
        </div>
    )
}

function ListFilters() {
    return (
        <div className={classes.filters}></div>
    )
}

function List({ simulations, sort, locale }) {
    const loading = !simulations
    const empty = simulations?.length === 0

    return (
        <ul className={loading || empty ? classes.listSkeleton : classes.list}>
            {
                loading ?
                    <Skeleton inline count={5}/>
                :
                empty ?
                    "Žiadne simulácie"
                :
                    simulations?.sort(sortings[sort]).map(sim => 
                        <li key={sim.uuid}>
                            <Link to={sim.uuid}>
                                <div><span>{sim.name}</span></div>
                                <div><span>{new Date(sim.createTime).toLocaleDateString(locale)}</span></div>
                                <div><span>{typeMapper(sim.simulationType)}</span></div>
                                <div>
                                    {
                                        sim.finished ?
                                            <><IconCheckCircleStatus /><span>Dokončené</span></> :
                                        sim.endTime ?
                                            <><IconCancelStatus /><span>Zrušené</span></> :
                                        sim.beginTime ?
                                            <><IconHistoryStatus /><span>Vykonáva sa</span></> :
                                            <><IconScheduleStatus /><span>V poradí</span></>
                                    }
                                </div>
                                <div>
                                    <IconArrowForwardIos className={classes.iconArrow}/>
                                </div>
                            </Link>
                        </li>
                    )
            }
        </ul>
    )
}

export default SimulationsList