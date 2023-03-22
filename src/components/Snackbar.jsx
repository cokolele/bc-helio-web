import { Button } from "/src/components/Inputs"
import { IconCancel } from "/src/components/Icons/24/Emph"
import * as classes from "./Snackbar.module.sass"

function Snackbar({ text, action, onAction, onClose, className }) {
    return (
        <div className={[classes.container, className].join(" ")}>
            <div className={classes.text}>{ text }</div>
            <div className={classes.buttons}>
                {
                    onAction &&
                    <Button
                        className={classes.action}
                        unstyled
                        onClick={onAction}
                    >
                        { action }
                    </Button>
                }
                {
                    onClose &&
                    <Button
                        className={classes.close}
                        unstyled
                        onClick={onClose}
                        IconLeft={<IconCancel/>}
                    />
                }
            </div>
        </div>
    )
}

export default Snackbar