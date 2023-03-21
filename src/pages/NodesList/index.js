import api from "/src/utils/api"
import { useEffect } from "react"
import { useAppState } from "/src/states/app"
import fakeData from "/src/fakeData"

import Controls from "./Controls"
import Filters from "./Filters"
import List from "./List"

const fetchAllSimulations = async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 4000));

    dispatch({
        type: "setNodes",
        nodes: fakeData.nodes
    })

    return

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

function NodesList() {
    const [{ nodes }, dispatch] = useAppState()

    useEffect(() => {
        if (!nodes.list) {
            fetchAllSimulations(dispatch)
        }
    }, [])

    return (
        <>
            <Controls />
            <Filters />
            <List />
        </>
    )
}

export default NodesList