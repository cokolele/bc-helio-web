import api from "/src/utils/api"
import { useLanguage } from "/src/utils/hooks"
import { IconScreenRotation, IconLoaderSpinning } from "/src/components/Icons/48/Emph"
import { useParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { useEffect, useState, useRef } from "react"
import {
    select,
    scaleLog,
    extent,
    axisBottom,
    axisLeft,
    line
} from "d3"
import * as classes from "./SimulationGraph.module.sass"

const fetchData = async (id, simulations, setData, dispatch, language) => {
    if (id.endsWith("-uploaded")) {
        const sim = simulations.list?.find(sim => sim.uuid == id)

        return setData(sim ? sim.graph : -1)
    }

    if (!window.navigator.onLine) {
        dispatch({
            type: "setError",
            message: language["api.error.offline"]
        })

        return setData(-1)
    }

    let graph

    try {
        graph = await api.get("/simulation/" + id + "/spectrum", "application/octet-stream")
        graph = await graph.response.text()
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

        return setData(-1)
    }

    try {
        graph = graph.trim().split(/\s+/)
        setData(graph)
    } catch (e) {
        dispatch({
            type: "setError",
            message: language["api.error.invalid_response"]
        })

        setData(-1)
    }
}

const drawGraph = (el, data) => {
    const dataX = data.filter((_, i) => i % 3 == 0).map(d => Number(d)).filter(d => d)
    const dataY2 = data.filter((_, i) => (i - 1) % 3 == 0).map(d => Number(d)).filter(d => d)
    const dataY = data.filter((_, i) => (i - 2) % 3 == 0).map(d => Number(d)).filter(d => d)
    
    select(el).selectChild().remove()

    const elRect = el.getBoundingClientRect()

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = elRect.width - margin.left - margin.right,
    height = elRect.height - margin.top - margin.bottom

    const svg = select(el)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = scaleLog()
        .domain(extent(dataX))
        .range([0, width])

    const y = scaleLog()
        .domain(extent(dataY))
        .range([height, 0])
    
    svg.append("g")
            .call(axisLeft(y).tickArguments([5, "1.0e"]))
        .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(axisBottom(x))
    
    svg.append("path")
        .datum(dataY.map((_, i) => [dataX[i], dataY[i]]))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line()
            .x(d => x(d[0]))
            .y(d => y(d[1]))
        )
}

function SimulationGraph() {
    const language = useLanguage()
    const [{ simulations }, dispatch] = useAppState()
    const { id } = useParams()
    const [data, setData] = useState(null)
    const ref = useRef(null)

    useEffect(() => {
        fetchData(id, simulations, setData, dispatch, language)
    }, [])

    useEffect(() => {
        if (data && data != -1 && ref?.current) {
            drawGraph(ref.current, data)

            const onResize = () => drawGraph(ref.current, data)
    
            addEventListener("resize", onResize)

            return () => {
                removeEventListener("resize", onResize)
            }
        }
    }, [data, ref])

    return (
        <div className={classes.container}>
            <div className={classes.rotateWarning}>
                <IconScreenRotation />
                <span>{ language["page.simulation_graph.not_landscape"] }</span>
            </div>
            <div className={classes.graph} ref={ref}>
                { 
                    !data &&
                    <IconLoaderSpinning />
                }
                {
                    data == -1 &&
                    <span className={classes.error}>{language["page.simulation_graph.unavailable"]}</span>
                }
            </div>
        </div>
    )
}

export default SimulationGraph