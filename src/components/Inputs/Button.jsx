import * as classes from "./Button.module.sass"

function ButtonRaw({children, IconLeft, IconRight, IconTop, ...props }) {
    return (
        <button type="button" {...props} className={[classes.buttonRaw, props.className].join(" ")} >
            { IconTop && <IconTop /> }
            <span>
                { IconLeft && <IconLeft />}
                { children }
                { IconRight && <IconRight />}
            </span>
        </button>
    )
}

export {
    ButtonRaw
}