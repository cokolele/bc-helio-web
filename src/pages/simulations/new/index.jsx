import { useRef } from "react"
import { Button } from "/src/components/Inputs"
import { useNavigate } from "react-router-dom"
import { IconUploadFile, IconAdd } from "/src/components/Icons/24/Emph"
import { useLanguage } from "/src/utils/hooks"
import { useAppState } from "/src/states/app"
import * as classes from "./SimulationNew.module.sass"
 
function SimulationNew() {
    const language = useLanguage()
    const ref = useRef(null)
    const [{ simulations }, dispatch] = useAppState()
    const navigate = useNavigate()

    const onUpload = async e => {
        try {
            if (!simulations.list) {
                throw new Error()
            }

            const file = e.target.files[0]
            const content = await file.text()
            const simulation = JSON.parse(content)
            simulation.uploaded = true
            simulation.uuid += "-uploaded"

            dispatch({
                type: "setSimulations",
                simulations: [ simulation, ...simulations.list ]
            })

            navigate("/simulations/" + simulation.uuid)
        } catch(e) {
            console.error(e)

            dispatch({
                type: "setError",
                message: language["page.simulation_new.upload_fail"]
            })
        }
    }

    return (
        <div className={classes.container}>
            <label htmlFor="upload">
                <Button
                    className={classes.uploadButton}
                    outlined
                    IconTop={<IconUploadFile/>}
                    onClick={() => ref.current?.click()}
                >
                    { language["button.upload_file_simulation"] }
                </Button>
            </label>
            <input
                type="file"
                accept=".json,application/json"
                id="upload"
                ref={ref}
                onChange={onUpload}
            />
            <Button
                className={classes.createButton}
                outlined
                IconTop={<IconAdd/>}
                to="create"
            >
                { language["button.create_simulation"] }
            </Button>
        </div>
    )
}

export default SimulationNew