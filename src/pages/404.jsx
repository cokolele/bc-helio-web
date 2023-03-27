import { useLanguage } from "/src/utils/hooks"
import * as classes from "./404.module.sass"

function NotFound() {
    const language = useLanguage()

    return (
        <div className={classes.container}>
            <div className={classes.left}>404</div>
            <div className={classes.right}>
                <span className={classes.header}>{ language["page.not_found.title"] }</span>
                <span className={classes.text}>{ language["page.not_found.description"] }</span>
            </div>
        </div>
    )
}

export default NotFound