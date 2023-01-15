import { useState, useRef } from "react"
import { IconCheck } from "/src/components/Icons/Emph/20"
import { ButtonRaw } from "./Button"
import * as classes from "./Select.module.sass"

function SelectDropdown({ children }) {
    return <div className={classes.dropdown}>{ children }</div>
}

function SelectList({ list, selected, onSelect }) {
    return (
        <SelectDropdown>
            <ul className={classes.list}>
                {
                    list.map((label, i) => 
                        <li
                            key={i}
                            tabIndex={i == selected ? -1 : 0}
                            onClick={() => i != selected && onSelect(i)}
                        >
                            { i == selected && <IconCheck /> }
                            <span>{label}</span>
                        </li>
                    )
                }
            </ul>
        </SelectDropdown>
    )
}

function SelectButtonRaw({ children, list, selected, onSelect, ...buttonProps }) {
    const [show, setShow] = useState(false)

    const onClick = (e) => {
        setShow(!show)

        if (buttonProps.onClick) {
            buttonProps.onClick(e)
        }
    }

    const onBlur = (e) => {
        if (
            !e.target.contains(e.relatedTarget) // is children: button li
            && !Array.from(e.target.parentNode.children).includes(e.relatedTarget) // are siblings: li + li 
        ) {
            setShow(false)
        }

        if (buttonProps.onClick) {
            buttonProps.onClick(e)
        }
    }

    return (
        <ButtonRaw {...buttonProps} onClick={onClick} onBlur={onBlur}>
            { children }
            {
                show &&
                <SelectList
                    list={list}
                    selected={selected}
                    onSelect={onSelect}
                />
            }
        </ButtonRaw>
    )
}

export {
    SelectDropdown,
    SelectList,
    SelectButtonRaw
}