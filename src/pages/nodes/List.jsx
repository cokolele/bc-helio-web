import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { useAppState } from "/src/states/app"
import { useLanguage } from "/src/utils/hooks"
import {
    IconFiberManualRecordStatusGreen,
    IconFiberManualRecordStatusYellow,
    IconFiberManualRecordStatusGrey
} from "/src/components/Icons/20/Emph"
import {
    IconExpandMore,
    IconArrowForward,
    IconArrowBack
} from "/src/components/Icons/24/Emph"
import { Button } from "/src/components/Inputs"
import * as simulationsClasses from "/src/pages/simulations/Simulations.module.sass"
import * as classes from "./Nodes.module.sass"

const limit = 21

function List() {
    const [{ nodes }, dispatch] = useAppState()
    const language = useLanguage()
    const [page, setPage] = useState(1)

    const loading = !nodes.listShown || !nodes.sort
    const empty = nodes.listShown?.length == 0

    return (
        <>
            <ul className={loading || empty ? classes.listSkeleton : classes.list}>
                {
                    loading ?
                        <>
                            <Skeleton inline count={2}/>
                            <Skeleton inline count={2}/>
                            <Skeleton inline count={2}/>
                        </>
                    : empty ?
                        language["page.node_list.empty"]
                    :
                        nodes.listShown
                            .filter((node, i) => i >= (page - 1) * limit && i < page * limit)
                            .sort(nodes.sort.comparer)
                            .map((node, i) => (
                                <ListItem key={i} node={node}/>
                            ))
                }
            </ul>
            <Pagination pageState={[page, setPage]} />
        </>
    )
}

function ListItem({ node }) {
    const [{ locale }, dispatch] = useAppState()
    const language = useLanguage()
    const [open, setOpen] = useState(false)

    return (
        <li>
            <div
                className={classes.header}
                onClick={() => setOpen(!open)}
            >
                {
                    node.isComputing ?
                        <IconFiberManualRecordStatusGreen />
                    : node.isActive ?
                        <IconFiberManualRecordStatusYellow />
                    :
                        <IconFiberManualRecordStatusGrey />
                }
                <span>{ node.gpu != "UKNOWN" ? node.gpu.replaceAll("_", " ") : language["page.node_list.unknown"] }</span>
                <Button
                    unstyled
                    IconLeft={<IconExpandMore />}
                />
            </div>
            {
                open &&
                <div className={classes.details}>
                    <span>{ language["page.node_list.is_active"] }</span>
                    <span>{ node.isActive ? language["yes"] : language["no"] }</span>
                    <span>{ language["page.node_list.is_computing"] }</span>
                    <span>{ node.isComputing ? language["yes"] : language["no"] }</span>
                    <span>{ language["page.node_list.last_update_time"] }</span>
                    <span>{ new Date(node.lastUpdatedTime).toLocaleString(locale) }</span>
                </div>
            }
        </li>
    )
}

function Pagination({ pageState }) {
    const [{ nodes }, dispatch] = useAppState()
    const [params, setParams] = useSearchParams()
    const [page, setPage] = pageState

    useEffect(() => {
        const pageParam = parseInt(params.get("page"), 10)

        if (!isNaN(pageParam)) {
            if (pageParam < 1) {
                setPage(1)
            } else if (nodes.listShown?.length && pageParam > Math.ceil(nodes.listShown.length / limit)) {
                setPage(Math.ceil(nodes.listShown.length / limit))
            } else {
                setPage(pageParam)
            }
        }
    }, [nodes.listShown])

    if (!nodes.listShown || nodes.listShown.length == 0) {
        return null
    }

    return (
        <div className={simulationsClasses.pagination}>
            {
                page != 1 &&
                <Button
                    IconLeft={<IconArrowBack />}
                    outlined
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
                page != Math.ceil(nodes.listShown.length / limit) &&
                <Button
                    IconLeft={<IconArrowForward />}
                    outlined
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