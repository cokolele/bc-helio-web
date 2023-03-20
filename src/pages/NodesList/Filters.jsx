import { useEffect, useState } from "react"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { Button, SelectLabeled } from "/src/components/Inputs"
import * as classes from "./NodesList.module.sass"

function Filters({ listState }) {
    const [list, setList] = listState
    const [{ nodes }, dispatch] = useAppState()
    const language = useLanguage()

    const [type, setType] = useState("")
    const [active, setActive] = useState("")
    const [computing, setComputing] = useState("")

    const disabled = !list

    useEffect(() => {
        if (!disabled) {
            setList(nodes.filter(node => {
                if (type && node.gpu !== type) {
                    return false
                }

                if ((active == language["no"] && node.isActive) || (active == language["yes"] && !node.isActive)) {
                    return false
                }

                if ((computing == language["no"] && node.isComputing) || (computing == language["yes"] && !node.isComputing)) {
                    return false
                }

                return true
            })
            )
        }
    }, [type, active, computing])

    return (
        <ul className={classes.filters}>
            <li>
                <SelectLabeled
                    className={classes.select}
                    allowBlank
                    label={language["label.type"]}
                    list={list ? list.map(({ gpu }) => gpu) : []}
                    value={type}
                    onChange={setType}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    className={classes.select}
                    allowBlank
                    label={language["page.node_list.is_active"]}
                    list={[language["yes"], language["no"]]}
                    value={active}
                    onChange={setActive}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    className={classes.select}
                    allowBlank
                    label={language["page.node_list.is_computing"]}
                    list={[language["yes"], language["no"]]}
                    value={computing}
                    onChange={setComputing}
                    disabled={disabled}
                />
            </li>
            <div className={classes.filler}></div>
            <li>
                <Button
                    dangerous
                    outlined
                    onClick={() => {
                        setList(nodes)
                        dispatch({
                            type: "setShowFilters",
                            show: false
                        })
                    }}
                >
                    {language["button.hide_filters"]}
                </Button>
            </li>
        </ul>
    )
}

export default Filters