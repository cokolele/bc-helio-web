import api from "/src/utils/api"
import { useEffect, useState } from "react"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import fakeData from "/src/fakeData"

import Controls from "./Controls"
import Filters from "./Filters"
import List from "./List"

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

    let requests = await Promise.allSettled(ids.map(id => api.get("/simulation/" + id)))

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

const fetchFake = async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 4000));

    dispatch({
        type: "setNodes",
        nodes: fakeData.nodes
    })
}

function NodesList() {
    const [{ nodes, showFilters }, dispatch] = useAppState()
    const [list, setList] = useState(null)
    const [listSorter, setListSorter] = useState(null)
    const language = useLanguage()

    useEffect(() => {
        setList(nodes)
    }, [nodes])

    useEffect(() => {
        if (!nodes) {
            //fetchAllSimulations(dispatch)
            fetchFake(dispatch)
        }
    }, [])

    useEffect(() => () => {
        dispatch({
            type: "setShowFilters",
            show: false
        })
    }, [])

    return (
        <>
            <Controls
                listState={[list, setList]}
                listSorterState={[listSorter, setListSorter]}
            />
            {
                showFilters &&
                <Filters listState={[list, setList]} />
            }
            <List
                listState={[list, setList]}
                listSorterState={[listSorter, setListSorter]}
            />
        </>
    )
}

export default NodesList