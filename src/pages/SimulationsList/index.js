import api from "/src/utils/api"
import { useEffect } from "react"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { IconAdd } from "/src/components/Icons/24/Emph"
import { Button } from "/src/components/Inputs"
import * as classes from "./SimulationsList.module.sass"
import fakeData from "/src/fakeData"

import Controls from "./Controls"
import Filters from "./Filters"
import List from "./List"

const fetchAllSimulations = async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 4000));

    dispatch({
        type: "setSimulations",
        simulations: fakeData.simulations
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

function SimulationsList() {
    const [{ simulations }, dispatch] = useAppState()
    const language = useLanguage()

    useEffect(() => {
        if (!simulations.list) {
            fetchAllSimulations(dispatch)
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

export default SimulationsList