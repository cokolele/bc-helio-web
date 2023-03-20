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
    IconCancelStatus
} from "/src/components/Icons/20/Emph"
import { IconArrowForward, IconArrowBack } from "/src/components/Icons/24/Emph"
import { Button } from "/src/components/Inputs"
import * as classes from "./SimulationsList.module.sass"

const limit = 10

function List({ listState, listSorterState }) {
    const [list, setList] = listState
    const [listSorter, setListSorter] = listSorterState
    const language = useLanguage()
    const [page, setPage] = useState(1)

    const loading = !list || !listSorter
    const empty = list?.length == 0

    return (
        <div>
            <ul className={loading || empty ? classes.listSkeleton : classes.list}>
                {
                    loading ?
                        <Skeleton inline count={5} />
                    : empty ?
                        language["page.simulation_list.empty"]
                    :
                        list.filter((sim, i) => i >= (page - 1) * limit && i < page * limit)
                            .sort(listSorter)
                            .map((sim, i) => (
                                <ListItem key={i} sim={sim} />
                            ))
                }
            </ul>
            <Pagination
                listState={listState}
                pageState={[page, setPage]}
            />
        </div>
    )
}

function ListItem({ sim }) {
    const [{ locale }, dispatch] = useAppState()
    const language = useLanguage()

    return (
        <li>
            <Link to={sim.uuid}>
                <div>
                    <span>{ sim.name }</span>
                </div>
                <div>
                    <span>{ new Date(sim.createTime).toLocaleDateString(locale) }</span>
                </div>
                <div>
                    <span>{ typeMapper(sim.simulationType) }</span>
                </div>
                <div>
                    {
                        sim.finished ?
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
                <div>
                    <IconArrowForwardIos className={classes.iconArrow} />
                </div>
            </Link>
        </li>
    )
}

function Pagination({ listState, pageState }) {
    const [params, setParams] = useSearchParams()
    const [list, setList] = listState
    const [page, setPage] = pageState

    useEffect(() => {
        const pageParam = parseInt(params.get("page"), 10)

        if (!isNaN(pageParam)) {
            if (pageParam < 1) {
                setPage(1)
            } else if (list?.length && pageParam > Math.ceil(list.length / limit)) {
                setPage(Math.ceil(list.length / limit))
            } else {
                setPage(pageParam)
            }
        }
    }, [params, list])

    if (!list || list.length == 0) {
        return null
    }

    return (
        <div className={classes.pagination}>
            {
                page != 1 &&
                <Button
                    IconLeft={<IconArrowBack />}
                    outlined
                    onClick={() => setParams({ ...params, page: page - 1 })}
                />
            }
            {
                page != Math.ceil(list.length / limit) &&
                <Button
                    IconLeft={<IconArrowForward />}
                    outlined
                    onClick={() => setParams({ ...params, page: page + 1 })}
                />
            }
        </div>
    )
}

export default List