import { matchRoutes, useLocation } from "react-router-dom"

const routes = ["/", "*", "/simulations", "/simulations/:id", "/simulations/:id/graph", "/nodes", "/settings"]
    .map(path => ({ path }))

export default useCurrentRoute = () => {
    const location = useLocation()
    const [{ route }] = matchRoutes(routes, location)

    return route.path
}