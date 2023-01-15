import api from "/src/utils/api"
import { useEffect, useState, useLayoutEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { typeMapper } from "/src/utils/simulation"
import {
    IconArrowForwardIos,
    IconCheckCircleStatus,
    IconScheduleStatus,
    IconHistoryStatus,
    IconCancelStatus,
} from "/src/components/Icons/Emph/20"
import { IconSwapVert } from "/src/components/Icons/20"
import { SelectButtonRaw } from "/src/components/Inputs"
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

    console.log(simulations)

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
    new: (a, b) => a,
    recent: (a, b) => b,
    alph: (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })
}

const sortLabels = {
    new: "Najnovšie",
    recent: "Posledné navštívené",
    alph: "Abecedne"
}

function SimulationsList() {
    const [{ simulations }, dispatch] = useAppState()
    const [params, setParams] = useSearchParams()

    const [page, setPage] = useState(parseInt(params.get("page")))
    const [sort, setSort] = useState(params.get("sort"))

    // page correction
    useLayoutEffect(() => {
        if (!page || page < 1) {
            setPage(1)
        } else if (simulations && page > Math.ceil(simulations.length / 10)) {
            setPage(Math.ceil(simulations.length / 10))
        }
    }, [simulations])

    // sort correction
    useLayoutEffect(() => {
        if (!sortings[sort]) {
            setSort(Object.keys(sortings)[0])
        }
    }, [])
    
    //page correction
    useEffect(() => {
        if (!page || page < 1) {
            setPage(1)
            return
        } else if (simulations && page > Math.ceil(simulations.length / 10)) {
            setPage(Math.ceil(simulations.length / 10))
            return
        }
    }, [page, simulations])
    
    // all simulations fetch
    useEffect(() => {
        if (!simulations) {
            //fetchAllSimulations(dispatch)
            fetchAllSimulationsFake(dispatch)
        }
    }, [])
    
    return (
        <>
            <section className={classes.primaryActions}></section>
            <section className={classes.container}>
                <ListControls sort={sort} setSort={setSort}/>
                <ListLabels />
                <ListFilters />
                <List simulations={simulations} sort={sort} />
            </section>
        </>
    )
}

function ListControls({ sort, setSort }) {
    const sortIds = Object.keys(sortings)

    return (
        <div className={classes.controls}> 
            <SelectButtonRaw
                IconLeft={IconSwapVert}
                list={sortIds.map(sortId => sortLabels[sortId])}
                selected={sortIds.indexOf(sort)}
                onSelect={i => setSort(sortIds[i])}
            >
                {sortLabels[sort]}
            </SelectButtonRaw>
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

function List({ simulations, sort }) {
    if (!simulations) {
        return <ul className={classes.listLoading}>Načítavam</ul>
    }

    if (!simulations.length) {
        return <ul className={classes.listEmpty}>Žiadne simulácie</ul>
    }

    return (
        <ul className={classes.list}>
            {
                simulations.sort(sortings[sort]).map(({ name, simulationType, beginTime, finished, endTime }, i) => (
                    <li tabIndex={0} key={i}>
                        <div><span>{name}</span></div>
                        <div><span>1.1.2023</span></div>
                        <div><span>{typeMapper(simulationType)}</span></div>
                        <div>
                            {
                                finished ?
                                    <><IconCheckCircleStatus /><span>Dokončené</span></> :
                                endTime ?
                                    <><IconCancelStatus /><span>Zrušené</span></> :
                                beginTime ?
                                    <><IconHistoryStatus /><span>Vykonáva sa</span></> :
                                    <><IconScheduleStatus /><span>V poradí</span></>
                            }
                        </div>
                        <div>
                            <IconArrowForwardIos className={classes.iconArrow}/>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default SimulationsList