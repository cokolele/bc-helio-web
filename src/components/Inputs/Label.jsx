import * as classes from "./Label.module.sass"

function Label({ children, label, helperText, labelInput, disabled, invalid, className, ...props }) {
    return (
        <div
            className={[
                classes.container,
                className,
                disabled ? classes.disabled : null,
                invalid ? classes.invalid : null,
            ].join(" ")}
        >
            {
                (label || labelInput) &&
                <label {...props} className={classes.label}>
                    { label }
                    { labelInput &&
                        <span aria-hidden="true">
                            { labelInput }
                        </span>
                    }
                </label>
            }
            { children }
            {
                helperText &&
                <span className={classes.helperText}>
                    { helperText }
                </span>
            }
        </div>
    )
}

export default Label