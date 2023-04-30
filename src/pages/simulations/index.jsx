import api from "/src/utils/api"
import { useEffect } from "react"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { IconAdd } from "/src/components/Icons/24/Emph"
import { Button } from "/src/components/Inputs"
import * as classes from "./Simulations.module.sass"
import fakeData from "/src/fakeData"

import Controls from "./Controls"
import Filters from "./Filters"
import List from "./List"

const useFakeData = true

const fetchAllSimulations = async (dispatch, language) => {
    if (useFakeData) {
        await new Promise(resolve => setTimeout(resolve, 4000))

        return dispatch({
            type: "setSimulations",
            simulations: fakeData.simulations
        })
    }

    if (!window.navigator.onLine) {
        dispatch({
            type: "setError",
            message: language["api.error.offline"]
        })
        return dispatch({
            type: "setSimulations",
            simulations: []
        })
    }

    let ids

    try {
        ids = await api.get("/simulation/all")
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

        return dispatch({
            type: "setSimulations",
            simulations: []
        })
    }

    try {
        ids = ids.json.map(simulation => simulation.uuid)

        let requests = await Promise.allSettled(ids.map(id => api.get("/simulation/" + id)))

        const simulations = requests
            .filter(request => request.status === "fulfilled")
            .map(request => request.value.json)

        if (simulations.length !== requests.length) {
            dispatch({
                type: "setError",
                message: language["api.error.invalid_response_partial"]
            })
        }

        dispatch({
            type: "setSimulations",
            simulations
        })
    } catch (e) {
        dispatch({
            type: "setError",
            message: language["api.error.invalid_response"]
        })
        dispatch({
            type: "setSimulations",
            simulations: []
        })
    }
}

function Simulations() {
    const [{ simulations }, dispatch] = useAppState()
    const language = useLanguage()

    useEffect(() => {
        if (!simulations.list) {
            fetchAllSimulations(dispatch, language)
        }
    }, [])

    return (
        <>
            <section className={classes.primaryActions}>
                <Button
                    IconTop={<IconAdd />}
                    outlined
                    to="new"
                >
                    {language["button.add_simulation"]}
                </Button>
            </section>
            <section className={classes.simulationsList}>
                <Controls />
                <div className={classes.labels}>
                    <span>{language["label.name"]}</span>
                    <span>{language["label.date"]}</span>
                    <span>{language["label.type"]}</span>
                    <span>{language["label.status"]}</span>
                    <span></span>
                </div>
                <Filters />
                <List />
            </section>
        </>
    )
}

export default Simulations