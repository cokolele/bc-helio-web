import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import { typeMapper } from "/src/utils/simulation"
import {
    IconArrowForwardIos,
    IconCheckCircleStatus,
    IconScheduleStatus,
    IconHistoryStatus,
    IconCancelStatus,
    IconCloudUpload
} from "/src/components/Icons/20/Emph"
import { IconArrowForward, IconArrowBack } from "/src/components/Icons/24/Emph"
import { Button } from "/src/components/Inputs"
import * as classes from "./Simulations.module.sass"

const limit = 10

const saveToRecents = uuid => {
    let recents = localStorage.getItem("recents")
    recents = recents ? JSON.parse(recents) : []

    if (recents.includes(uuid)) {
        recents = recents.filter(e => e != uuid)
    }

    if (recents.unshift(uuid) > limit) {
        recents.pop()
    }

    localStorage.setItem("recents", JSON.stringify(recents))
}

function List() {
    const [{ simulations }, dispatch] = useAppState()
    const language = useLanguage()
    const [page, setPage] = useState(1)

    const loading = !simulations.listShown || !simulations.sort
    const empty = simulations.listShown?.length == 0

    return (
        <>
            <ul
                className={[
                    loading || empty ? classes.listSkeleton : classes.list,
                    simulations.compactView ? classes.compact : null
                ].join(" ")}
            >
                {
                    loading ?
                        <>
                            <Skeleton inline count={5} />
                            <Skeleton inline count={5} />
                            <Skeleton inline count={5} />
                        </>
                    : empty ?
                        language["page.simulation_list.empty"]
                    :
                        simulations.listShown
                            .sort(simulations.sort.comparer)
                            .filter((sim, i) => i >= (page - 1) * limit && i < page * limit)
                            .map((sim, i) => (
                                <ListItem key={i} sim={sim} />
                            ))
                }
            </ul>
            <Pagination pageState={[page, setPage]} />
        </>
    )
}

function ListItem({ sim }) {
    const [{ locale }, dispatch] = useAppState()
    const language = useLanguage()

    return (
        <li>
            <Link
                to={sim.uuid}
                onClick={() => saveToRecents(sim.uuid)}
            >
                <div className={classes.name}>
                    <span>{ sim.name }</span>
                </div>
                <div className={classes.date}>
                    <span>{ new Date(sim.createTime).toLocaleDateString(locale) }</span>
                </div>
                <div className={classes.type}>
                    <span>{ typeMapper(sim.simulationType) }</span>
                </div>
                <div className={classes.status}>
                    {
                        sim.uploaded ?
                            <>
                                <IconCloudUpload />
                                <span>{ language["status.uploaded"] }</span>
                            </>
                        : sim.finished ?
                            <>
                                <IconCheckCircleStatus />
                                <span>{ language["status.done"] }</span>
                            </>
                        : sim.endTime ?
                            <>
                                <IconCancelStatus />
                                <span>{ language["status.canceled"] }</span>
                            </>
                        : sim.beginTime ?
                            <>
                                <IconHistoryStatus />
                                <span>{ language["status.in_progress"] }</span>
                            </>
                        :
                            <>
                                <IconScheduleStatus />
                                <span>{ language["status.pending"] }</span>
                            </>
                    }
                </div>
                <div className={classes.iconArrow}>
                    <IconArrowForwardIos/>
                </div>
            </Link>
        </li>
    )
}

function Pagination({ pageState }) {
    const [{ simulations }, dispatch] = useAppState()
    const [params, setParams] = useSearchParams()
    const [page, setPage] = pageState
    const language = useLanguage()

    useEffect(() => {
        const pageParam = parseInt(params.get("page"), 10)

        if (!isNaN(pageParam)) {
            if (pageParam < 1) {
                setPage(1)
            } else if (simulations.listShown?.length && pageParam > Math.ceil(simulations.listShown.length / limit)) {
                setPage(Math.ceil(simulations.listShown.length / limit))
            } else {
                setPage(pageParam)
            }
        }
    }, [simulations.listShown])

    if (!simulations.listShown || simulations.listShown.length == 0) {
        return null
    }

    return (
        <div className={classes.pagination}>
            {
                page != 1 &&
                <Button
                    IconLeft={<IconArrowBack />}
                    outlined
                    aria-label={language["button.previous_page"]}
                    onClick={() => {
                        setParams({
                            ...Object.fromEntries(params),
                            page: page - 1
                        })
                        setPage(page - 1)
                    }}
                />
            }
            {
                page != Math.ceil(simulations.listShown.length / limit) &&
                <Button
                    IconLeft={<IconArrowForward />}
                    outlined
                    aria-label={language["button.next_page"]}
                    onClick={() => {
                        setParams({
                            ...Object.fromEntries(params),
                            page: page + 1
                        })
                        setPage(page + 1)
                    }}
                />
            }
        </div>
    )
}

export default List