import { Label } from "/src/components/Inputs"
import { useRef, useEffect, useState, useId } from "react"
import * as classes from "./Input.module.sass"

function Input({ customValidity, setValidity, Icon, className, unstyled, ...props }) {
    const ref = useRef(null)

    const updateValidity = el => {
        el?.setCustomValidity(customValidity || "")

        if (setValidity) {
            setValidity(customValidity || el?.validationMessage)
        }
    }
    
    useEffect(() => {
        updateValidity(ref?.current)
    }, [customValidity])

    return (
        <div className={[unstyled ? null : classes.container, className].join(" ")}>
            <input
                {...props}
                ref={ref}
                className={unstyled ? null : [classes.input, Icon ? classes.hasIcon : null].join(" ")}

                onBlur={e => {
                    if (e.target.checkValidity()) {
                        updateValidity(e.target)
                    }
    
                    if (props.onBlur) {
                        props.onBlur(e)
                    }
                }}

                onInvalid={e => {
                    updateValidity(e.target)
    
                    if (props.onInvalid) {
                        props.onInvalid(e)
                    }
                }}
            />
            { Icon }
        </div>
    )
}

const movableTypes = [undefined, "text", "email", "month", "password", "tel", "url", "search"]

function InputLabeled({ children, label, helperText, labelInput, invalid, className, ...props }) {
    const [validity, setValidity] = useState("")
    const id = useId()

    return (
        <Label
            label={label}
            helperText={validity || helperText}
            labelInput={labelInput}
            className={[
                className,
                movableTypes.includes(props.type) ? classes.movableLabel : null,
                props.value || props.placeholder || validity || props.disabled ? classes.moved : null,
            ].join(" ")}
            invalid={validity || invalid}
            disabled={props.disabled}
            htmlFor={id}
        >
            <Input {...props} id={id} setValidity={setValidity}/>
        </Label>
    )
}


export {
    Input,
    InputLabeled
}