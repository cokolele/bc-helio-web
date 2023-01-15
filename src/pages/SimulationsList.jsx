import api from "/src/utils/api"
import { useEffect, useState } from "react"
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

function SimulationsList() {
    let [{ simulations }, dispatch] = useAppState()
    const [searchParams] = useSearchParams()

    const [page, setPage] = useState(searchParams.page ?? 1)

    // all simulations fetch
    useEffect(() => {
        if (simulations) {
            return
        }

        //fetchAllSimulations(dispatch)
        fetchAllSimulationsFake(dispatch)
    }, [])

    // page correction
    useEffect(() => {
        if (!simulations) {
            return
        }

        if (page < 1) {
            setPage(1)
            return
        } else if (page > Math.ceil(simulations.length / 10)) {
            setPage(Math.ceil(simulations.length / 10))
            return
        }
    }, [simulations])

    return (
        <>
            <section className={classes.primaryActions}></section>
            <section className={classes.container}>
                <ListControls />
                <ListLabels />
                <ListFilters />
                <List simulations={simulations} />
            </section>
        </>
    )
}

function ListControls() {
    return (
        <div className={classes.controls}> 
            <SelectButtonRaw
                IconLeft={IconSwapVert}
                list={["Posledné navštívené", "Najnovšie", "Abecedne"]}
                selected={1}
                onSelect={i => {}}
            >
                Najnovšie
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

function List({ simulations }) {
    if (!simulations) {
        return <ul className={classes.listLoading}>Načítavam</ul>
    }

    if (!simulations.length) {
        return <ul className={classes.listEmpty}>Žiadne simulácie</ul>
    }

    return (
        <ul className={classes.list}>
            {
                simulations.map(({ name, simulationType, beginTime, finished, endTime }, i) => (
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