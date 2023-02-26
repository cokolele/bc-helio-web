import { matchRoutes, useLocation } from "react-router-dom"

const routes = [
    "/",
    "*",
    "/simulations",
    "/simulations/new",
    "/simulations/:id",
    "/simulations/:id/graph",
    "/nodes",
    "/settings",
    "/simulations/new/create"
].map(path => ({ path }))

export default function useCurrentRoute() {
    const location = useLocation()
    const [{ route }] = matchRoutes(routes, location)

    return route.path
}