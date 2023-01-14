import * as classes from "./Button.module.sass"

export function ButtonRaw({ label, IconLeft, IconRight, IconTop, ...props }) {
    return (
        <button type="button" {...props} className={[classes.buttonRaw, props.className].join(" ")} >
            { IconTop && <IconTop /> }
            <span>
                { IconLeft && <IconLeft />}
                {label}
                { IconRight && <IconRight />}
                </span>
        </button>
    )
}