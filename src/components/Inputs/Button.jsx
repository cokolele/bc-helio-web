import * as classes from "./Button.module.sass"

function ButtonRaw({ children, ...props }) {
    return (
        <button
            type="button"
            {...props}
            className={[classes.buttonRaw, props.className].join(" ")}
        >
            { children }
        </button>
    )
}

function ButtonUnstyled({ children, IconLeft, IconRight, IconTop, ...props }) {
    return (
        <button
            type="button"
            {...props}
            className={[classes.buttonUnstyled, props.className].join(" ")}
        >
            { IconTop && <IconTop /> }
            <span>
                { IconLeft && <IconLeft />}
                { children }
                { IconRight && <IconRight />}
            </span>
        </button>
    )
}

function Button({ children, raw, unstyled, IconLeft, IconRight, IconTop, ...props }) {
    if (raw) {
        return ButtonRaw({ children, ...props })
    }

    if (unstyled) {
        return ButtonUnstyled({ children, IconLeft, IconRight, IconTop, ...props })
    }
}

export default Button