import { useState, useRef } from "react"
import { IconCheck } from "/src/components/Icons/Emph/20"
import Button from "./Button"
import { useClickedOutside } from "/src/utils/hooks"
import * as classes from "./Select.module.sass"

function SelectList({ list, selected, onSelect, ...buttonProps }) {
    return (
        <ul>
            {
                list.map((label, i) => 
                    <li key={i}>
                        <Button
                            unstyled
                            disabled={i == selected}
                            onClick={() => i != selected && onSelect(i)}
                            IconLeft={i == selected && IconCheck}
                            {...buttonProps}
                        >
                            { label }
                        </Button>
                    </li>
                )
            }
        </ul>
    )
}

function Select({ children, list, selected, onSelect, ...buttonProps }) {
    const [show, setShow] = useState(false)

    const onClick = e => {
        setShow(!show)

        if (buttonProps.onClick) {
            buttonProps.onClick(e)
        }
    }

    const _onSelect = i => {
        setShow(false)
        onSelect(i)
    }

    const onBlur = e => {
        if (ref.current && !ref.current.contains(e.relatedTarget)) {
            setShow(false)
        }
    }

    const ref = useRef(null)

    useClickedOutside(ref, () => setShow(false))

    return (
        <div className={classes.container} ref={ref} onBlur={onBlur}>
            <Button {...buttonProps} onClick={onClick}>
                { children }
            </Button>
            {
                show &&
                <SelectList
                    list={list}
                    selected={selected}
                    onSelect={_onSelect}
                />
            }
        </div>
    )
}

export default Select

export {
    SelectList
}