import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { Button, SelectLabeled } from "/src/components/Inputs"
import * as classes from "./Nodes.module.sass"

function Filters() {
    const [{ nodes }, dispatch] = useAppState()
    const language = useLanguage()

    if (!nodes.filters) {
        return null
    }

    if (nodes.filters === true) {
        nodes.filters = {
            type: "",
            active: "",
            computing: ""
        }
    }

    const disabled = !nodes.list

    const onFilterChange = filter => {
        const newFilters = {
            ...nodes.filters,
            ...filter
        }

        dispatch({
            type: "setNodesFilters",
            filters: newFilters
        })

        dispatch({
            type: "setNodesShown",
            nodes: nodes.list.filter(node => {
                const { type, active, computing } = newFilters

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
        })
    }

    return (
        <ul className={classes.filters}>
            <li>
                <SelectLabeled
                    className={classes.select}
                    allowBlank
                    label={language["label.type"]}
                    list={nodes.list ? nodes.list.map(({ gpu }) => gpu) : []}
                    value={nodes.filters.type}
                    onChange={value => onFilterChange({type: value})}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    className={classes.select}
                    allowBlank
                    label={language["page.node_list.is_active"]}
                    list={[language["yes"], language["no"]]}
                    value={nodes.filters.active}
                    onChange={value => onFilterChange({active: value})}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    className={classes.select}
                    allowBlank
                    label={language["page.node_list.is_computing"]}
                    list={[language["yes"], language["no"]]}
                    value={nodes.filters.computing}
                    onChange={value => onFilterChange({computing: value})}
                    disabled={disabled}
                />
            </li>
            <div className={classes.filler}></div>
            <li>
                <Button
                    className={classes.closeFiltersButton}
                    dangerous
                    outlined
                    onClick={() => {
                        dispatch({
                            type: "setNodesFilters",
                            filters: null
                        })

                        dispatch({
                            type: "setNodesShown",
                            nodes: nodes.list
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