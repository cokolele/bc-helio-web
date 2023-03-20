import { useEffect, useState } from "react"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { typeMapper, typesList, dimensionsList } from "/src/utils/simulation"
import { IconSearch } from "/src/components/Icons/20/Emph"
import { SelectLabeled, Button, InputLabeled } from "/src/components/Inputs"
import * as classes from "./SimulationsList.module.sass"

function ListFilters({ listState }) {
    const [list, setList] = listState
    const [{ simulations }, dispatch] = useAppState()
    const language = useLanguage()

    const [search, setSearch] = useState("")
    const [date, setDate] = useState("")
    const [dimension, setDimension] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")

    const disabled = !simulations

    useEffect(() => {
        if (!disabled) {
            setList(simulations.filter(sim => {
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
            )
        }
    }, [search, date, dimension, type, status])

    return (
        <ul className={classes.filters}>
            <li>
                <InputLabeled
                    type="search"
                    Icon={<IconSearch />}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    disabled={disabled}
                />
            </li>
            <li>
                <InputLabeled
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    allowBlank
                    list={dimensionsList}
                    value={dimension}
                    onChange={setDimension}
                    disabled={disabled}
                />
                <SelectLabeled
                    allowBlank
                    list={typesList}
                    value={type}
                    onChange={setType}
                    disabled={disabled}
                />
            </li>
            <li>
                <SelectLabeled
                    allowBlank
                    list={[
                        language["status.done"],
                        language["status.in_progress"],
                        language["status.pending"],
                        language["status.canceled"]
                    ]}
                    value={status}
                    onChange={setStatus}
                    disabled={disabled}
                />
            </li>
            <li>
                <Button
                    dangerous
                    outlined
                    onClick={() => {
                        setList(simulations)
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

export default ListFilters