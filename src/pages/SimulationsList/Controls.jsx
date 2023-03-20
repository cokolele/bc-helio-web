import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useLanguage } from "/src/utils/hooks"
import { IconSwapVert } from "/src/components/Icons/20"
import { Select } from "/src/components/Inputs"
import * as classes from "./SimulationsList.module.sass"

function Controls({ listState, listSorterState }) {
    const [list, setList] = listState
    const [listSorter, setListSorter] = listSorterState
    const [params, setParams] = useSearchParams()
    const language = useLanguage()

    const sortings = {
        new: {
            label: language["sort.new"],
            comparer: (a, b) => Date.parse(a.createTime) < Date.parse(b.createTime)
        },
        recent: {
            label: language["sort.recent_visited"],
            comparer: (a, b) => Math.random() < 1 / 2
        },
        alph: {
            label: language["sort.alph"],
            comparer: (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        }
    }

    const labelMapper = Object.fromEntries(Object.entries(sortings).map(([name, sort]) => [sort.label, name]))

    const [sort, setSort] = useState(Object.keys(sortings)[0])

    useEffect(() => {
        const sortParam = params.get("sort")

        if (sortings[sortParam]) {
            setSort(sortParam)
            setListSorter(() => sortings[sortParam].comparer)
        } else if (listSorter == null) {
            setListSorter(() => sortings[sort].comparer)
        }
    }, [params])

    return (
        <div className={classes.controls}>
            <Select
                className={classes.sort}
                list={Object.keys(labelMapper)}
                value={sortings[sort].label}
                onChange={value => setParams({ ...params, sort: labelMapper[value] })}
                button
                unstyled
                IconLeft={<IconSwapVert />}
                disabled={!list}
            />
        </div>
    )
}

export default Controls