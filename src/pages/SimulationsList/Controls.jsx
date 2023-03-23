import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import {
    IconSwapVert,
    IconViewAgenda,
    IconListAlt
} from "/src/components/Icons/20"
import { Select, Button } from "/src/components/Inputs"
import * as classes from "./SimulationsList.module.sass"

function Controls() {
    const [{ simulations }, dispatch] = useAppState()
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
    const [sort, setSort] = useState(null)

    useEffect(() => {
        const sortParam = params.get("sort")

        if (!simulations.sort) {
            setSort(sortings[sortParam] ? sortParam : Object.keys(sortings)[0])
        } else {
            setParams({
                ...Object.fromEntries(params),
                sort: simulations.sort.name
            })
            setSort(simulations.sort.name)
        }
    }, [])

    useEffect(() => {
        if (sort) {
            dispatch({
                type: "setSimulationsSort",
                sort: {
                    comparer: sortings[sort].comparer,
                    name: sort
                }
            })
        }
    }, [sort])

    return (
        <div className={classes.controls}>
            <Select
                className={classes.sort}
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
                disabled={!simulations.list}
            />
            <Button
                className={classes.listView}
                unstyled
                IconTop={<IconListAlt/>}
            />
        </div>
    )
}

export default Controls