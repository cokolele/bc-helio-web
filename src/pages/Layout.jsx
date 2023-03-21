import { Outlet, useParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { 
    IconManageSearch,
    IconDns,
    IconSettings,
    IconReceiptLong,
    IconArrowBackIosNew,
    IconArrowForwardIos
} from "/src/components/Icons/40"
import { Button } from "/src/components/Inputs"
import { useCurrentRoute, useLanguage } from "/src/utils/hooks"
import * as classes from "./Layout.module.sass"
import { useEffect, useState } from "react"

function Layout() {
    const currentRoute = useCurrentRoute()

    return (
        <div className={classes.container}>
            <NavigationMain currentRoute={currentRoute}/>
            <main>
                <Header currentRoute={currentRoute}/>
                <Outlet />
            </main>
        </div>
    )
}

function NavigationMain({ currentRoute }) {
    const [state, dispatch] = useAppState()
    const [open, setOpen] = useState(false)
    const language = useLanguage()

    return (
        <>
            <nav
                className={open ? classes.menuOpened : null}
                onClick={e => {
                    if (open && (e.target.closest("button") || e.target.closest("a"))) {
                        setOpen(false)
                    }
                }}
            >
                {
                    (currentRoute == "/simulations" || currentRoute == "/nodes") ?
                        <>
                            <div className={classes.top}>
                                <h3>HelioLogo</h3>
                                <Button
                                    className={classes.menuButtonOpen}
                                    unstyled
                                    IconLeft={<IconArrowForwardIos/>}
                                    onClick={() => !open && setOpen(true)}
                                >
                                    { language[open ? "nav.menu_close" : "nav.menu_open"] }
                                </Button>
                            </div>
                            <div className={classes.middle}>
                                <Button
                                    unstyled
                                    IconLeft={<IconManageSearch/>}
                                    onClick={() => dispatch({
                                        type: currentRoute == "/simulations" ? "setSimulationsFilters" : "setNodesFilters",
                                        filters: true
                                    })}
                                >
                                    { language["nav.search"] }
                                </Button>
                                {
                                    currentRoute == "/simulations" ?
                                        <Button
                                            unstyled
                                            IconLeft={<IconDns/>}
                                            to="/nodes"
                                        >
                                            { language["nav.node_list"] }
                                        </Button>
                                    :
                                        <Button
                                            unstyled
                                            IconLeft={<IconReceiptLong/>}
                                            to="/simulations"
                                        >
                                            { language["nav.simulation_list"] }
                                        </Button>
                                    
                                }
                            </div>
                            <div className={classes.bottom}>
                                <Button
                                    unstyled
                                    IconLeft={<IconSettings/>}
                                    to="/settings"
                                >
                                    { language["nav.settings"] }
                                </Button>
                            </div>
                        </>
                    :
                        <>
                            <div className={classes.middle}>
                                <Button
                                    unstyled
                                    IconLeft={<IconArrowBackIosNew/>}
                                    to={-1}
                                >
                                    { language["nav.back"] }
                                </Button>
                            </div>
                        </>
                }
            </nav>
            <div
                className={classes.menuBackground}
                onClick={() => setOpen(false)}
            ></div>
        </>
    )
}

function Header({ currentRoute }) {
    const language = useLanguage()

    const labels = {
        "/simulations": language["header.simulation_list"],
        "/nodes": language["header.node_list"],
        "/settings": language["header.settings"],
        "/simulations/new": language["header.simulation_add"],
        "/simulations/:id": <>{language["header.simulation_detail"]} <span>{useParams().id?.split("-")[0]}</span></>,
        "/simulations/:id/graph": <>{language["header.simulation_graph"]} <span>{useParams().id?.split("-")[0]}</span></>,
        "/simulations/new/create": language["header.simulation_add_new"]
    }
    
    return <h1>{labels[currentRoute]}</h1>
}

export default Layout