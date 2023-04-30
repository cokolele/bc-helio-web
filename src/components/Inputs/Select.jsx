import { useState, useRef } from "react"
import { Input, Button, SegmentedButton, Label } from "/src/components/Inputs"
import { IconExpandMore } from "/src/components/Icons/20/Emph"
import * as classes from "./Select.module.sass"

function Select({ list, value, onChange, allowBlank, button, unstyled, className, forceShow, ...props }) {
    const [show, setShow] = useState(forceShow ? true : false)
    const ref = useRef(null)

    return (
        <div
            className={unstyled ? className : [classes.container, className].join(" ")}
            ref={ref}
            onBlur={e => {
                if (ref.current && !ref.current.contains(e.relatedTarget)) {
                    setShow(false)
                }
            }}
        >
            {
                button ?
                    <Button
                        unstyled={unstyled}
                        onClick={e => {
                            setShow(!show)

                            if (props.onClick) {
                                props.onClick(e)
                            }
                        }}
                        {...props}
                    >
                        { value }
                    </Button>
                :
                    <Input
                        unstyled={unstyled}
                        className={unstyled ? null : [classes.inputContainer, show ? classes.opened : null].join(" ")}
                        type="button"
                        value={value}
                        onClick={() => setShow(!show)}
                        Icon={!unstyled && <IconExpandMore/>}
                        {...props}
                    />
            }
            {
                show &&
                <SegmentedButton
                    unstyled
                    className={unstyled ? null : classes.list}
                    list={allowBlank ? ["-", ...list] : list}
                    value={value}
                    onChange={value => {
                        onChange(value)
                        setShow(false)
                    }}
                />
            }
        </div>
    )
}

function SelectLabeled({ children, label, helperText, labelInput, invalid, className, ...props }) {
    return (
        <Label
            label={label}
            helperText={helperText}
            labelInput={labelInput}
            className={className}
            invalid={invalid}
            disabled={props.disabled}
        >
            <Select {...props}/>
        </Label>
    )
}

export {
    Select,
    SelectLabeled
}