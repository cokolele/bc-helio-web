import * as classes from "./LabelWrapper.module.sass"

function LabelWrapper({ children, label, helperText, labelInput, ...props }) {
    return (
        <div {...props} className={[classes.container, props.className].join(" ")}>
            {
                label &&
                <span className={classes.label}>
                    { label }
                    { labelInput }
                </span>
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

export default LabelWrapper