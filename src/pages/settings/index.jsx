import { IconLanguage } from "/src/components/Icons/40"
import { SegmentedButtonLabeled } from "/src/components/Inputs"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"

import * as classes from "./Settings.module.sass"

const localeMap = {
    "en-US": "EN",
    "sk-SK": "SK"
}

function Settings() {
    const [{ locale }, dispatch] = useAppState()
    const language = useLanguage()

    return (
        <div className={classes.container}>
            <div className={classes.row}>
                <IconLanguage/>
                <SegmentedButtonLabeled
                    className={classes.select}
                    label={language["label.language"]}
                    list={Object.values(localeMap)}
                    value={localeMap[locale]}
                    onChange={value => dispatch({ type: "toggleLocale" })}
                />
            </div>
        </div>
    )
}

export default Settings