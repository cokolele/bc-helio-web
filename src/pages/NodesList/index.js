import api from "/src/utils/api"
import { useEffect } from "react"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import fakeData from "/src/fakeData"

import Controls from "./Controls"
import Filters from "./Filters"
import List from "./List"

const useFakeData = true

const fetchAllSimulations = async (dispatch, language) => {
    if (useFakeData) {
        await new Promise(resolve => setTimeout(resolve, 4000))

        dispatch({
            type: "setNodes",
            nodes: fakeData.nodes
        })

        return
    }

    if (!window.navigator.onLine) {
        dispatch({
            type: "setError",
            message: language["api.error.offline"]
        })
        dispatch({
            type: "setNodes",
            nodes: []
        })

        return
    }

    try {
        const nodes = await api.get("/node/all")

        dispatch({
            type: "setNodes",
            nodes: nodes.json
        })
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

        dispatch({
            type: "setNodes",
            nodes: []
        })

        return
    }
}

function NodesList() {
    const [{ nodes }, dispatch] = useAppState()
    const language = useLanguage()

    useEffect(() => {
        if (!nodes.list) {
            fetchAllSimulations(dispatch, language)
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