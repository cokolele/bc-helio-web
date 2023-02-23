import { SegmentedButton, Button } from "/src/components/Inputs"
import { useState } from "react"
import * as classes from "./simulationNew.module.sass"
 
function simulationNew() {
    const [i, setI] = useState(0)

    return (
        <div>
            <SegmentedButton
                label="label babel"
                helperText="label babel"
                list={["option1", "option2", "option3"]}
                selected={i}
                onSelect={setI}
            />
        </div>
    )
}

export default simulationNew