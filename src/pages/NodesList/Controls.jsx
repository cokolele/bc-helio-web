import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { IconSwapVert } from "/src/components/Icons/20"
import { Select } from "/src/components/Inputs"
import * as simulationsListClasses from "/src/pages/SimulationsList/SimulationsList.module.sass"

function Controls() {
    const [{ nodes }, dispatch] = useAppState()
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
    const [sort, setSort] = useState(null)

    useEffect(() => {
        const sortParam = params.get("sort")

        if (!nodes.sort) {
            setSort(sortings[sortParam] ? sortParam : Object.keys(sortings)[0])
        } else {
            const prevSort = labelMapper[nodes.sort.label]
            setParams({
                ...params,
                sort: prevSort
            })
            setSort(prevSort)
        }
    }, [])

    useEffect(() => {
        if (sort) {
            dispatch({
                type: "setNodesSort",
                sort: sortings[sort]
            })
        }
    }, [sort])

    return (
        <div className={simulationsListClasses.controls}>
            <Select
                className={simulationsListClasses.sort}
                list={Object.keys(labelMapper)}
                value={sort && sortings[sort].label}
                onChange={value => {
                    value = labelMapper[value]
                    setSort(value)
                    setParams({
                        ...params,
                        sort: value
                    })
                }}
                button
                unstyled
                IconLeft={<IconSwapVert />}
                disabled={!nodes.list}
            />
        </div>
    )
}

export default Controls