import { Outlet, useParams } from "react-router-dom"
import { 
    IconManageSearch,
    IconDns,
    IconSettings,
    IconReceiptLong,
    IconArrowBackIosNew
} from "/src/components/Icons/40"
import { Button } from "/src/components/Inputs"
import { useCurrentRoute } from "/src/utils/hooks"
import * as classes from "./Layout.module.sass"

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
    return (
        <nav className={classes.collapsedd}>
            {
                currentRoute == "/simulations" || currentRoute == "/nodes" ?
                    <>
                        <div className={classes.top}>
                            <h3>HelioLogo</h3>  
                        </div>
                        <div className={classes.middle}>
                            <Button unstyled IconLeft={<IconManageSearch/>}>Vyhľadávať</Button>
                            {
                                currentRoute == "/simulations" ?
                                    <Button unstyled IconLeft={<IconDns/>} to="/nodes">Zoznam uzlov</Button>
                                :
                                    <Button unstyled IconLeft={<IconReceiptLong/>} to="/simulations">Zoznam Simulácií</Button>
                                
                            }
                        </div>
                        <div className={classes.bottom}>
                            <Button unstyled IconLeft={<IconSettings/>} to="/settings">Nastavenia</Button>
                        </div>
                    </>
                :
                    <Button unstyled IconLeft={<IconArrowBackIosNew/>} to={-1}>Vrátiť sa</Button>
            }
        </nav>
    )
}

function Header({ currentRoute }) {
    const labels = {
        "/simulations": "Zoznam simulácií",
        "/nodes": "Zoznam uzlov",
        "/settings": "Používateľské nastavenia",
        "/simulations/new": "Pridať simuláciu",
        "/simulations/:id": <>Simulácia <span>{useParams().id?.split("-")[0]}</span></>,
        "/simulations/:id/graph": "Graf simulácie",
        "/simulations/new/create": "Pridať novú simuláciu"

    }
    
    return <h1>{labels[currentRoute]}</h1>
}

export default Layout