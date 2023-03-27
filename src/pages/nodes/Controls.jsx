import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { IconSwapVert } from "/src/components/Icons/20"
import { Select } from "/src/components/Inputs"
import * as simulationsClasses from "/src/pages/Simulations/Simulations.module.sass"

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
            setParams({
                ...Object.fromEntries(params),
                sort: nodes.sort.name
            })
            setSort(nodes.sort.name)
        }
    }, [])

    useEffect(() => {
        if (sort) {
            dispatch({
                type: "setNodesSort",
                sort: {
                    comparer: sortings[sort].comparer,
                    name: sort
                }
            })
        }
    }, [sort])

    return (
        <div className={simulationsClasses.controls}>
            <Select
                className={simulationsClasses.sort}
                list={Object.keys(labelMapper)}
                value={sort && sortings[sort].label}
                onChange={value => {
                    value = labelMapper[value]
                    setSort(value)
                    setParams({
                        ...Object.fromEntries(params),
                        sort: value
                    })
                }}
                button
                unstyled
                IconLeft={<IconSwapVert />}
                disabled={!nodes.listShown || nodes.listShown.length == 0}
            />
        </div>
    )
}

export default Controls