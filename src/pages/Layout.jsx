import { Outlet, useParams } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { 
    IconManageSearch,
    IconDns,
    IconSettings,
    IconReceiptLong,
    IconArrowBackIosNew
} from "/src/components/Icons/40"
import { Button } from "/src/components/Inputs"
import { useCurrentRoute, useLanguage } from "/src/utils/hooks"
import * as classes from "./Layout.module.sass"
import { useEffect } from "react"

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
    const language = useLanguage()

    if (currentRoute == "/simulations" || currentRoute == "/nodes") {
        return (
            <nav>
                <div className={classes.top}>
                    <h3>HelioLogo</h3>  
                </div>
                <div className={classes.middle}>
                    <Button
                        unstyled
                        IconLeft={<IconManageSearch/>}
                        onClick={() => dispatch({
                            type: "setShowFilters",
                            show: true
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
            </nav>
        )
    }

    return (
        <nav>
            <div className={classes.middle}>
                <Button
                    unstyled
                    IconLeft={<IconArrowBackIosNew/>}
                    to={-1}
                >
                    { language["nav.back"] }
                </Button>
            </div>
        </nav>
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