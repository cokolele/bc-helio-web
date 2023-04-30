import { Button, Label } from "/src/components/Inputs"
import { IconCheck } from "/src/components/Icons/20/Emph"
import * as classes from "./SegmentedButton.module.sass"

function SegmentedButton({ list, value, onChange, disabledList, unstyled, className }) {
    if (disabledList?.includes(value)) {
        onChange(list[0] == value ? list[1] : list[0])
    }

    return (
        <ul
            className={[unstyled ? null : classes.list, className].join(" ")}
            role="radiogroup"
        >
            {
                list.map((item, i) => (
                    <li
                        key={i}
                        className={unstyled ? null : classes.item}
                        role="radio"
                    >
                        <Button
                            unstyled
                            className={unstyled ? null : [classes.option, item === value ? classes.selected : null].join(" ")}
                            disabled={item === value || disabledList?.includes(item)}
                            IconLeft={item === value && <IconCheck />}
                            onClick={() => onChange(item === "-" ? "" : item)}
                        >
                            {item}
                        </Button>
                    </li>
                ))
            }
        </ul>
    )
}

function SegmentedButtonLabeled({ children, label, helperText, labelInput, invalid, className, ...props }) {
    return (
        <Label
            label={label}
            helperText={helperText}
            labelInput={labelInput}
            className={className}
            invalid={invalid}
            disabled={props.disabled}
        >
            <SegmentedButton {...props}/>
        </Label>
    )
}

export {
    SegmentedButton,
    SegmentedButtonLabeled
}