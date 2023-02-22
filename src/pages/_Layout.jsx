import { Outlet, Link, useParams } from "react-router-dom"
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
            {
                currentRoute == "/simulations" || currentRoute == "/nodes" ?
                    <NavigationMain currentRoute={currentRoute}/>
                :
                    <NavigationReturn currentRoute={currentRoute}/>
            }
            <main>
                <Header currentRoute={currentRoute}/>
                <div className={classes.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

function NavigationMain({ currentRoute }) {
    return (
        <nav>
            <div className={classes.section}>
                <div className={classes.top}>
                    Helio
                </div>
                <div className={classes.middle}>
                    <NavigationItem onClick={() => {}} label="Vyhľadávať" Icon={IconManageSearch}/>
                    {
                        currentRoute == "/simulations" ?
                            <NavigationItem href="/nodes" label="Zoznam uzlov" Icon={IconDns}/>
                        :
                            <NavigationItem href="/simulations" label="Zoznam Simulácií" Icon={IconReceiptLong}/>
                        
                    }
                </div>
                <div className={classes.bottom}>
                    <NavigationItem href="/settings" label="Nastavenia" Icon={IconSettings}/>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.middle}>
                    <NavigationItem href={-1} label="Vrátiť sa" Icon={IconArrowBackIosNew} collapsed/>
                </div>
            </div>
        </nav>
    )
}

function NavigationReturn({ currentRoute }) {
    return (
        <nav className={classes.collapsed}>
            <div className={classes.middle}>
                <NavigationItem href={-1} label="Vrátiť sa" Icon={IconArrowBackIosNew} collapsed/>
            </div>
        </nav>
    )
}

function NavigationItem({ href, onClick, label, Icon }) {
    const content = (
        <>
            <Icon />
            <span>{label}</span>
        </>
    )
    
    if (href) {
        return <Link className={classes.item} to={href}>{content}</Link>
    } else {
        return <Button raw className={classes.item} onClick={onClick}>{content}</Button>
    }
}

function Header({ currentRoute }) {
    switch (currentRoute) {
        case "/simulations":
            return <h1>Zoznam simulácií</h1>
        case "/nodes":
            return <h1>Zoznam uzlov</h1>
        case "/settings":
            return <h1>Používateľské nastavenia</h1>
        case "/simulations/:id":
            return <h1>Simulácia <span>{useParams().id.split("-")[0]}</span></h1>
        case "/simulations/:id/graph":
            return <h1>Graf simulácie</h1>
        default:
            return null
    }
}

export default Layout