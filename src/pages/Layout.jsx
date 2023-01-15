import { Outlet, Link } from "react-router-dom"
import { 
    IconManageSearch,
    IconDns,
    IconSettings,
    IconReceiptLong
} from "/src/components/Icons/40"
import { useCurrentRoute } from "/src/utils/hooks"
import * as classes from "./Layout.module.sass"

function Layout() {
    const currentRoute = useCurrentRoute()

    return (
        <div className={classes.container}>
            <nav className={classes.navigation}>
                <div className={classes.top}>
                    Helio
                </div>
                <div className={classes.middle}>
                    <NavigationItem onClick={() => {}} label="Vyhľadávať" Icon={IconManageSearch}/>
                    {
                        currentRoute === "/" || currentRoute == "/simulations" ?
                            <NavigationItem href="/nodes" label="Zoznam uzlov" Icon={IconDns}/>
                        :
                            <NavigationItem href="/simulations" label="Zoznam Simulácií" Icon={IconReceiptLong}/>
                        
                    }
                </div>
                <div className={classes.bottom}>
                    <NavigationItem href="/settings" label="Nastavenia" Icon={IconSettings}/>
                </div>
            </nav>
            <main className={classes.main}>
                <Header currentRoute={currentRoute}/>
                <div className={classes.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

function Header({ currentRoute }) {
    switch (currentRoute) {
        case "/simulations":
            return <h1 className={classes.header}>Zoznam simulácií</h1>
        case "/nodes":
            return <h1 className={classes.header}>Zoznam uzlov</h1>
        case "/settings":
            return <h1 className={classes.header}>Používateľské nastavenia</h1>
        case "/simulations/:id":
            return <h1 className={classes.header}>Simulácia</h1>
        case "/simulations/:id/graph":
            return <h1 className={classes.header}>Graf simulácie</h1>
        default:
            return null
    }
}

function NavigationItem({ href, onClick, label, Icon }) {
    const content = (
        <>
            <Icon className={classes.icon}/>
            <span className={classes.label}>
                {label}
            </span>
        </>
    )

    if (href) {
        return <Link className={classes.item} to={href}>{content}</Link>
    } else {
        return <button className={classes.item} type="button" onClick={onClick}>{content}</button>
    }
}

export default Layout