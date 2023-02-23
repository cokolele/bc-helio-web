import api from "/src/utils/api"
import { useEffect, useState, useLayoutEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { useAppState } from "/src/states/app"
import { useLocale } from "/src/utils/hooks"
import {
    IconFiberManualRecordStatusGreen,
    IconFiberManualRecordStatusYellow,
    IconFiberManualRecordStatusGrey
} from "/src/components/Icons/Emph/20"
import {
    IconExpandMore
} from "/src/components/Icons/Emph/24"
import { IconSwapVert } from "/src/components/Icons/20"
import { Select, Button } from "/src/components/Inputs"
import * as simulationsListClasses from "./SimulationsList.module.sass"
import * as classes from "./NodesList.module.sass"
import fakeData from "/src/fakeData"

const fetchAllSimulations = async (dispatch) => {
    let ids

    try {
        ids = await api.get("/simulation/all")
        ids = ids.json.map(simulation => simulation.uuid)
    } catch (e) {
        if (e instanceof api.ApiNetworkError || e instanceof api.ApiBodyParseError) {
            // warning bad server
        } else if (e instanceof api.ApiResponseError) {
            // warning bad action
        } else {
            console.log(e)
            // warning unexpected json server responses should never happen
        }

        return
    }

    let requests = await Promise.allSettled( ids.map(id => api.get("/simulation/" + id)) )

    const simulations = requests
        .filter(request => request.status === "fulfilled")
        .map(request => request.value.json)

    if (simulations.length !== requests.length) {
        // warning bad action
    }

    dispatch({
        type: "setSimulations",
        simulations
    })
}

const fetchFake = async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 4000));

    dispatch({
        type: "setNodes",
        nodes: fakeData.nodes
    })
}

const sortings = {
    new: (a, b) => Date.parse(a.lastUpdatedTime) < Date.parse(b.lastUpdatedTime),
    alph: (a, b) => a.gpu.localeCompare(b.gpu, "en", { sensitivity: "base" })
}

const sortLabels = {
    new: "Posledné pridané",
    alph: "Abecedne"
}

function NodesList() {
    const [{ nodes, locale }, dispatch] = useAppState()
    const [params, setParams] = useSearchParams()

    const [page, setPage] = useState(parseInt(params.get("page")))
    const [sort, setSort] = useState(params.get("sort"))

    // page correction
    useLayoutEffect(() => {
        if (!page || page < 1) {
            setPage(1)
        } else if (nodes?.length && page > Math.ceil(nodes.length / 10)) {
            setPage(Math.ceil(nodes.length / 10))
        }
    }, [page, nodes])

    // sort correction
    useLayoutEffect(() => {
        if (!sortings[sort]) {
            setSort(Object.keys(sortings)[0])
        }
    }, [])
    
    useEffect(() => {
        if (!nodes) {
            //fetchAllSimulations(dispatch)
            fetchFake(dispatch)
        }
    }, [])
    
    return (
        <>
            <ListControls sort={sort} setSort={setSort}/>
            <ListFilters />
            <List nodes={nodes} sort={sort} locale={locale} />
        </>
    )
}

function ListControls({ sort, setSort }) {
    const sortIds = Object.keys(sortings)

    return (
        <div className={simulationsListClasses.controls}> 
            <Select
                unstyled 
                IconLeft={IconSwapVert}
                list={sortIds.map(sortId => sortLabels[sortId])}
                selected={sortIds.indexOf(sort)}
                onSelect={i => setSort(sortIds[i])}
            >
                {sortLabels[sort]}
            </Select>
        </div>
    )
}

function ListFilters() {
    return (
        <div className={classes.filters}></div>
    )
}

function List({ nodes, sort, locale }) {
    const loading = !nodes
    const empty = nodes?.length === 0

    return (
        <ul className={loading || empty ? classes.listSkeleton : classes.list}>
            {
                loading ?
                    <>
                        <Skeleton inline />
                        <Skeleton inline />
                        <Skeleton inline />
                    </>
                :
                empty ?
                    "Žiadne uzly"
                :
                nodes?.sort(sortings[sort]).map((node, i) => <ListItem key={i} node={node} locale={locale} />)
            }
        </ul>
    )
}

function ListItem({ node, locale }) {
    const [open, setOpen] = useState(false)

    return (
        <li>
            <div className={classes.header} onClick={() => setOpen(!open)}>
                {
                    node.isComputing ?
                        <IconFiberManualRecordStatusGreen /> :
                    node.isActive ?
                        <IconFiberManualRecordStatusYellow /> :
                        <IconFiberManualRecordStatusGrey />
                }
                <span>{node.gpu != "UKNOWN" ? node.gpu : "Neznámy"}</span>
                <Button unstyled IconLeft={IconExpandMore} />
            </div>
            {
                open &&
                <div className={classes.details}>
                    <span>Aktívny</span>
                    <span>{node.isActive ? "áno" : "nie"}</span>
                    <span>Pracuje</span>
                    <span>{node.isComputing ? "áno" : "nie"}</span>
                    <span>Posledná odozva</span>
                    <span>{new Date(node.lastUpdatedTime).toLocaleString(locale)}</span>
                </div>
            }
        </li>
    )
}

export default NodesList