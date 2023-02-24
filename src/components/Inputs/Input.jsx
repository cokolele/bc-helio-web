import LabelWrapper from "/src/components/Inputs/LabelWrapper"
import * as classes from "./Input.module.sass"

function Input({ label, helperText, error, ...inputProps }) {
    const hasValue = inputProps.value || inputProps.placeholder || error

    return (
        <LabelWrapper
            label={label}
            helperText={error ?? helperText}
            className={`
                ${classes.container}
                ${hasValue ? classes.hasValue : ""}
                ${error ? classes.hasError : ""}
                ${inputProps.disabled ? classes.disabled : ""}
            `}
        >
            <input
                {...inputProps}
                />
        </LabelWrapper>
    )
}

export default Input