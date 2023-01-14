import * as classes from "./NotFound.module.sass"

function NotFound() {
    return (
        <div className={classes.container}>
            <div className={classes.left}>404</div>
            <div className={classes.right}>
                <span className={classes.header}>Mrzí nás to!</span>
                <span className={classes.text}>Nenašli sme stránku, ktorú hľadáte...</span>
            </div>
        </div>
    )
}

export default NotFound