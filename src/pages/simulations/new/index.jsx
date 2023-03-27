import { Button } from "/src/components/Inputs"
import { IconUploadFile, IconAdd } from "/src/components/Icons/24/Emph"
import { useLanguage } from "/src/utils/hooks"
import * as classes from "./SimulationNew.module.sass"
 
function SimulationNew() {
    const language = useLanguage()

    return (
        <div className={classes.containerChoose}>
            <Button
                outlined
                IconTop={<IconUploadFile/>}
            >
                { language["button.upload_file_simulation"] }
            </Button>
            <Button
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