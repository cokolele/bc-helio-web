import { SegmentedButton, Input, Button } from "/src/components/Inputs"
import { IconUploadFile, IconAdd } from "/src/components/Icons/Emph/24"
import { useState } from "react"
import * as classes from "./SimulationNew.module.sass"
 
function simulationNew() {

    const [value, setValue] = useState("Value")

    return (
        <div className={classes.container}>
            <div className={classes.primaryButtons}>
                <Button outlined IconTop={<IconUploadFile/>}>Nahrať zo súboru</Button>
                <Button outlined IconTop={<IconAdd/>}>Vytvoriť</Button>
            </div>
            <form>
                <Input
                    label="Názov"
                />

                <SegmentedButton
                    label="Dimenzionalita"
                    list={["1D", "2D"]}
                    selected={0}
                />

                <SegmentedButton
                    label="Spôsob simulovania"
                    list={["BP", "FP", "FP-T"]}
                    selected={0}
                />
            </form>
        </div>
    )
}

export default simulationNew