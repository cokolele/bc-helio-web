import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useLanguage } from "/src/utils/hooks"
import { IconSwapVert } from "/src/components/Icons/20"
import { Select } from "/src/components/Inputs"
import * as simulationsListClasses from "/src/pages/SimulationsList/SimulationsList.module.sass"

function Controls({ listState, listSorterState }) {
    const [list, setList] = listState
    const [listSorter, setListSorter] = listSorterState
    const [params, setParams] = useSearchParams()
    const language = useLanguage()

    const sortings = {
        new: {
            label: language["sort.updated"],
            comparer: (a, b) => Date.parse(a.lastUpdatedTime) < Date.parse(b.lastUpdatedTime)
        },
        alph: {
            label: language["sort.alph"],
            comparer: (a, b) => a.gpu.localeCompare(b.gpu, "en", { sensitivity: "base" })
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
        <div className={simulationsListClasses.controls}>
            <Select
                className={simulationsListClasses.sort}
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