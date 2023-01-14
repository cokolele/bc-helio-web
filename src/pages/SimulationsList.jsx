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
import { ButtonRaw } from "/src/components/Inputs"
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
            <section className={classes.list}>
                <div className={classes.controls}>
                    <ButtonRaw label="Najnovšie" IconLeft={IconSwapVert}/>
                </div>
                <div className={classes.labels}>
                    <span>názov</span>
                    <span>dátum</span>
                    <span>typ</span>
                    <span>status</span>
                    <span></span>
                </div>
                <div className={classes.filters}></div>
                <ul className={
                    !simulations ?
                        classes.itemsLoading :
                    simulations.length ?
                        classes.items :
                        classes.itemsEmpty
                }>
                    <ListContent simulations={simulations} />
                </ul>
            </section>
        </>
    )
}

function ListContent({ simulations }) {
    if (!simulations) {
        return <>Načítavam</>
    }

    if (!simulations.length) {
        return <>Žiadne simulácie</>
    }

    return simulations.map(({ name, simulationType, beginTime, finished, endTime }, i) => (
        <li tabIndex={0} key={i}>
            <div>{name}</div>
            <div>1.1.2023</div>
            <div>{typeMapper(simulationType)}</div>
            <div>
                {
                    finished ?
                        <><IconCheckCircleStatus />Dokončené</> :
                    endTime ?
                        <><IconCancelStatus />Zrušené</> :
                    beginTime ?
                        <><IconHistoryStatus />Vykonáva sa</> :
                        <><IconScheduleStatus />V poradí</>
                }
            </div>
            <div>
                <IconArrowForwardIos className={classes.iconArrow}/>
            </div>
        </li>
    ))
}

export default SimulationsList