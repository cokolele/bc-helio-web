import api from "/src/utils/api"
import Skeleton from "react-loading-skeleton"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { typeMapper } from "/src/utils/simulation"
import {
    IconErrorStatusOrange,
    IconDownload,
    IconShowChart,
    IconLoaderSpinning
} from "/src/components/Icons/24/Emph"
import { Button } from "/src/components/Inputs"
import * as classes from "./SimulationDetail.module.sass"
import fakeData from "/src/fakeData"

const useFakeData = true

const fetchDetails = async (id, setSimulation, dispatch, language) => {
    if (useFakeData) {
        await new Promise(resolve => setTimeout(resolve, 1000))

        setSimulation(fakeData.simulations.find(s => s.uuid == id) || - 1)

        return
    }

    if (!window.navigator.onLine) {
        dispatch({
            type: "setError",
            message: language["api.error.offline"]
        })

        setSimulation(-1)

        return
    }

    try {
        const details = await api.get("/simulation/" + id)
        setSimulation(details.json)
    } catch (e) {
        if (e instanceof api.ApiNetworkError || e instanceof api.ApiBodyParseError) {
            dispatch({
                type: "setError",
                message: language["api.error.unsuccessful_request"]
            })
        } else if (e instanceof api.ApiResponseError) {
            dispatch({
                type: "setError",
                message: language["api.error.invalid_request"]
            })
        }

        setSimulation(-1)
    }
}
 
function SimulationDetail() {
    const [{ simulations, locale }, dispatch] = useAppState()
    const { id } = useParams()
    const language = useLanguage()
    const [simulation, setSimulation] = useState(simulations.list?.find(s => s.uuid == id))
    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        if (!simulation) {
            fetchDetails(id, setSimulation, dispatch, language)
        }
    }, [])

    let duration

    if (simulation?.beginTime) {
        const timeDiff = Math.abs(
            (simulation.endTime ? new Date(simulation.endTime) : Date.now()) - new Date(simulation.beginTime)
        )

        let days = timeDiff / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        
        duration = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
    }

    const loading = !simulation
    const error = simulation == -1

    if (error) {
        return (
            <div className={classes.container}>
                <span className={classes.error}>{ language["page.simulation_details.empty"] }</span>
            </div>
        )
    }

    if (loading) {
        return (
            <div className={classes.container}>
                <div className={classes.simulation}>
                    <section className={classes.metadata}>
                        {
                            [...new Array(6)].map((e, i) => <Skeleton key={i} inline />)
                        }
                    </section>
                    <section className={classes.status}>
                        {
                            [...new Array(6)].map((e, i) => (
                                <Skeleton
                                    key={i}
                                    inline 
                                    className={classes.skelet}
                                    containerClassName={classes.skelet}
                                />
                            ))
                        }
                    </section>
                    <section className={classes.parameters}>
                        {
                            [...new Array(12)].map((e, i) => (
                                <Skeleton
                                    key={i}
                                    inline
                                    className={classes.skelet}
                                    containerClassName={classes.skelet}
                                />
                            ))
                        }
                    </section>
                    <section className={classes.actions}>
                        <Button
                            IconLeft={<IconDownload/>}
                            outlined
                            disabled
                        >
                            { language["button.download_simulation"] }
                        </Button>
                        <Button
                            IconLeft={<IconShowChart/>}
                            to="graph"
                            disabled
                        >
                            { language["button.show_simulation_graph"] }
                        </Button>
                    </section>
                </div>
            </div>
        )
    }

    const onDownload = async () => {
        setDownloading(true)

        try {
            let data = {...simulation}
            
            if (data.finished) {
                try {
                    const graphData = await api.get("/simulation/" + id + "/spectrum", "application/octet-stream")
                    const text = await graphData.response.text()
    
                    // only grap download:
                    // const blob = await graphData.response.blob()
    
                    data.graph = text.trim().split(/\s+/)
                } catch (e) {
                    dispatch({
                        type: "setError",
                        message: language["page.simulation_graph.api.download_error"]
                    })
                }
            }

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
            const link = document.createElement("a")
            const url = URL.createObjectURL(blob)

            link.href = url
            link.download = simulation.name + ".json"
            link.click()

            URL.revokeObjectURL(url)
        } catch (e) {
            dispatch({
                type: "setError",
                message: language["page.simulation_graph.api.download_error"]
            })
        }

        setDownloading(false)
    }

    return (
        <div className={classes.container}>
            <div className={classes.simulation}>
                <section className={classes.metadata}>
                    <span>{ language["label.name"] }</span>
                    <span>{ simulation.name }</span>
                    <span>{ language["label.type"] }</span>
                    <span>{ typeMapper(simulation.simulationType) }</span>
                    <span>{ language["label.date"] }</span>
                    <span>{ new Date(simulation.createTime).toLocaleString(locale) }</span>
                </section>
                {
                    !(simulation.finished || simulation.endTime) &&
                    <div className={classes.warning}>
                        <IconErrorStatusOrange/>
                        { language["page.simulation_detail.unfinished_warning"] }
                    </div>
                }
                <section className={classes.status}>
                    <span>{ language["label.status"] }</span>
                    <span>
                        {
                            simulation.uploaded ?
                                language["status.uploaded"]
                            : simulation.finished ?
                                language["status.done"]
                            : simulation.endTime ?
                                language["status.canceled"]
                            : simulation.beginTime ?
                                language["status.in_progress"]
                            :
                                language["status.pending"]
                        }
                    </span>
                    <span>{ language["label.duration"] }</span>
                    <span>
                        {
                            !duration ?
                                "-"
                            : duration[0] ?
                                [
                                    duration[0] + language["date.days_short"],
                                    duration[1] + language["date.hours_short"],
                                    duration[2] + language["date.minutes_short"]
                                ].join(" ")
                            : duration[1] ?
                                [
                                    duration[1] + language["date.hours_short"],
                                    duration[2] + language["date.minutes_short"],
                                ].join(" ")
                            :
                                [
                                    duration[2] ? duration[2] + language["date.minutes_short"] : null,
                                    duration[3] + language["date.seconds_short"]
                                ].join(" ")
                        }
                    </span>
                    <span>{ language["label.progress"] }</span>
                    <span>
                        {
                            (
                                Math.round(
                                    (simulation.billionsOfSimulations - simulation.billionsOfSimulationsLeft)
                                    / simulation.billionsOfSimulations
                                    * 100
                                )
                            ) + "%"
                        }
                    </span>
                </section>
                <section className={classes.parameters}>
                    <span>{ language["label.iteration_count"] }</span>
                    <span>{ simulation.billionsOfSimulations ?? "-"}</span>
                    <span>{ language["label.time_delta"] }</span>
                    <span>{ simulation.dt ?? "-"}</span>
                    <span>{ language["label.solar_wind_speed"] }</span>
                    <span>{ simulation.v ?? "-"}</span>
                    <span>{ language["label.dif_coef"] }</span>
                    <span>{ simulation.k0 ?? "-"}</span>
                    <span>{ language["label.kparkper"] }</span>
                    <span>{ simulation.kparKper ?? "-"}</span>
                    <span>{ language["label.mu_width_cos"] }</span>
                    <span>{ simulation.mu ?? "-"}</span>
                </section>
                <section className={classes.actions}>
                    <Button
                        IconLeft={downloading ? <IconLoaderSpinning /> : <IconDownload/>}
                        outlined
                        onClick={onDownload}
                    >
                        { language["button.download_simulation"] }
                    </Button>
                    <Button
                        IconLeft={<IconShowChart/>}
                        to="graph"
                        disabled={!simulation.finished}
                    >
                        { language["button.show_simulation_graph"] }
                    </Button>
                </section>
            </div>
        </div>
    )
}

export default SimulationDetail