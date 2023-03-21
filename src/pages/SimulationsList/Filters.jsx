import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { typeMapper, typesList, dimensionsList } from "/src/utils/simulation"
import { IconSearch } from "/src/components/Icons/20/Emph"
import { SelectLabeled, Button, InputLabeled } from "/src/components/Inputs"
import * as classes from "./SimulationsList.module.sass"

function ListFilters() {
    const [{ simulations }, dispatch] = useAppState()
    const language = useLanguage()

    if (!simulations.filters) {
        return null
    }

    if (simulations.filters === true) {
        simulations.filters = {
            search: "",
            date: "",
            dimension: "",
            type: "",
            status: ""
        }
    }

    const disabled = !simulations.list

    const onFilterChange = filter => {
        const newFilters = {
            ...simulations.filters,
            ...filter
        }

        dispatch({
            type: "setSimulationsFilters",
            filters: newFilters
        })

        dispatch({
            type: "setSimulationsShown",
            simulations: simulations.list.filter(sim => {
                const { search, date, dimension, type, status } = newFilters

                if (search && !sim.name.includes(search)) {
                    return false
                }
    
                if (date && new Date(sim.createTime).toDateString() !== new Date(date).toDateString()) {
                    return false
                }
    
                const typeArray = typeMapper(sim.simulationType).split(" ")
    
                if (dimension && typeArray[0] !== dimension) {
                    return false
                }
    
                if (type && typeArray[2] !== type) {
                    return false
                }
    
                if (status) {
                    if (status == language["status.done"] && !sim.finished) {
                        return false
                    } else if (status == language["status.canceled"] && !sim.endTime) {
                        return false
                    } else if (status == language["status.in_progress"] && (!sim.beginTime || sim.endTime)) {
                        return false
                    } else if (status == language["status.pending"] && (sim.beginTime || sim.finished)) {
                        return false
                    }
                }
    
                return true
            })
        })
    }

    return (
        <ul className={classes.filters}>
            <li>
                <InputLabeled
                    label={language["label.name"]}
                    type="search"
                    Icon={<IconSearch />}
                    value={simulations.filters.search}
                    onChange={e => onFilterChange({search: e.target.value})}
                    disabled={disabled}
                />
            </li>
            <li>
                <InputLabeled
                    label={language["label.date"]}
                    type="date"
                    value={simulations.filters.date}
                    onChange={e => onFilterChange({date: e.target.value})}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    label={language["label.type"]}
                    allowBlank
                    list={dimensionsList}
                    value={simulations.filters.dimension}
                    onChange={value => onFilterChange({dimension: value})}
                    disabled={disabled}
                />
                <SelectLabeled
                    allowBlank
                    list={typesList}
                    value={simulations.filters.type}
                    onChange={value => onFilterChange({type: value})}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    label={language["label.status"]}
                    allowBlank
                    list={[
                        language["status.done"],
                        language["status.in_progress"],
                        language["status.pending"],
                        language["status.canceled"]
                    ]}
                    value={simulations.filters.status}
                    onChange={value => onFilterChange({status: value})}
                    disabled={disabled}
                />
            </li>
            <li>
                <Button
                    className={classes.closeFiltersButton}
                    dangerous
                    outlined
                    onClick={() => {
                        dispatch({
                            type: "setSimulationsFilters",
                            filters: null
                        })

                        dispatch({
                            type: "setSimulationsShown",
                            simulations: simulations.list
                        })
                    }}
                >
                    {language["button.hide_filters"]}
                </Button>
            </li>
        </ul>
    )
}

export default ListFilters