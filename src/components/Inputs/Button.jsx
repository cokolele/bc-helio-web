import * as classes from "./Button.module.sass"

function Button({ children, raw, unstyled, disabled, outlined, dangerous, IconLeft, IconRight, IconTop, ...props }) {
    let classNames = []

    if (raw) {
        classNames.push(classes.raw)
    } else if (unstyled) {
        classNames.push(classes.unstyled)
    } else {
        classNames.push(classes.styled)
        
        if (disabled) {
            classNames.push(classes.disabled)
        }
        if (outlined) {
            classNames.push(classes.outlined)
        }
        if (dangerous) {
            classNames.push(classes.dangerous)
        } 
    }

    return (
        <button
            type="button"
            {...props}
            disabled={disabled}
            className = {[ ...classNames, props.className ].join(" ")}
        >
            {
                raw ? children :
                <>
                    { IconTop && <IconTop /> }
                    <span>
                        { IconLeft && <IconLeft />}
                        { children }
                        { IconRight && <IconRight />}
                    </span>
                </>
            }
        </button>
    )
}

export default Button