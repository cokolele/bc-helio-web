import { useLanguage } from "/src/utils/hooks"
import { IconScreenRotation, IconLoaderSpinning } from "/src/components/Icons/48/Emph"
import * as classes from "./SimulationGraph.module.sass"

function SimulationGraph() {
    const language = useLanguage()

    return (
        <div className={classes.container}>
            <div className={classes.rotateWarning}>
                <IconScreenRotation />
                <span>{ language["page.simulation_graph.not_landscape"] }</span>
            </div>
            <div className={classes.graph}>
                <IconLoaderSpinning />
            </div>
        </div>
    )
}

export default SimulationGraph