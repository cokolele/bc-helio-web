import { Link } from "react-router-dom"
import * as classes from "./Button.module.sass"

const HTMLButton = props => <button {...props}></button>

function Button({ children, to, unstyled, disabled, outlined, dangerous, IconLeft, IconRight, IconTop, ...props }) {
    let classNames = []

    if (disabled) {
        classNames.push(classes.disabled)
    }
    
    if (unstyled) {
        classNames.push(classes.unstyled)
    } else {
        classNames.push(classes.styled)
        
        if (outlined) {
            classNames.push(classes.outlined)
        }
        if (dangerous) {
            classNames.push(classes.dangerous)
        } else {
            classNames.push(classes.base)
        }
    }

    const Wrapper = to ? Link : HTMLButton

    return (
        <Wrapper
            type={to ? null : "button"}
            {...props}
            to={to}
            tabIndex={disabled ? "-1" : props.tabIndex}
            disabled={disabled}
            className={[ ...classNames, props.className ].join(" ")}
        >
            <>
                { IconTop }
                <span>
                    { IconLeft }
                    { children }
                    { IconRight }
                </span>
            </>
        </Wrapper>
    )
}

export default Button