import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import * as classes from "./simulationDetail.module.sass"
import fakeData from "/src/fakeData"

const fetchDetails = async (id, setSimulation) => {
    try {
        const details = await api.get("/simulation/" + id)
        setSimulation(details.json)
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
}

const fetchDetailsFake = async (id, setSimulation) => {
    setSimulation(fakeData.simulations.filter(s => s.uuid == id)[0])
}
 
function simulationNew() {
    const [{ simulations }, dispatch] = useAppState()
    const { id } = useParams()

    const [simulation, setSimulation] = useState(null)

    useEffect(() => {
        const simulation = simulations?.filter(s => s.uuid == id)[0]

        if (simulation) {
            setSimulation(simulation)
        } else {
            fetchDetailsFake(id, setSimulation)
        }
    }, [])

    return <pre>{JSON.stringify(simulation, null, 2)}</pre>
}

export default simulationNew