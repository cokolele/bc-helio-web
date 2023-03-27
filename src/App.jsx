import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppStateProvider } from "/src/states/app"

import Layout from "/src/pages/Layout"
import NotFound from "/src/pages/404"
import Simulations from "/src/pages/simulations"
import SimulationDetail from "/src/pages/simulations/{uuid}"
import SimulationNew from "/src/pages/simulations/new"
import SimulationNewCreate from "/src/pages/simulations/new/create"
import Nodes from "/src/pages/nodes"
import Settings from "/src/pages/settings"

function App() {
    return (
        <AppStateProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/simulations" replace />} />
                        <Route path="simulations">
                            <Route index element={<Simulations />} />
                            <Route path=":id">
                                <Route index element={<SimulationDetail />} />
                                <Route path="graph" element={<NotFound />} />
                            </Route>
                            <Route path="new" element={<SimulationNew />} />
                            <Route path="new/create" element={<SimulationNewCreate />} />
                        </Route>
                        <Route path="nodes" element={<Nodes />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppStateProvider>
    )
}

export default App