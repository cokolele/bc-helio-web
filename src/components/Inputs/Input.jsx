import LabelWrapper from "/src/components/Inputs/LabelWrapper"
import * as classes from "./Input.module.sass"
import { useRef, useEffect } from "react"

function Input({ label, helperText, validity, labelInput, ...inputProps }) {
    const hasValue = inputProps.value || inputProps.placeholder || validity
    const movableLabelTypes = [undefined, "text", "email", "month", "password", "tel", "url"]

    let classNames = []

    if (hasValue) {
        classNames.push(classes.hasValue)
    }
    if (validity) {
        classNames.push(classes.invalid)
    }
    if (movableLabelTypes.includes(inputProps.type)) {
        classNames.push(classes.movableLabel)
    }
    if (inputProps.disabled) {
        classNames.push(classes.disabled)
    }
    
    const ref = useRef(null)

    useEffect(() => {
        if (validity) {
            ref?.current.setCustomValidity(validity)
        }
    }, [validity])

    return (
        <LabelWrapper
            label={label}
            helperText={validity ?? helperText}
            labelInput={labelInput}
            className={[classes.container, ...classNames].join(" ")}
        >
            <input ref={ref} {...inputProps} />
        </LabelWrapper>
    )
}

export default Input