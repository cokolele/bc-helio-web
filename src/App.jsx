import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppStateProvider } from "/src/states/app"

import Layout from "/src/pages/Layout"
import NotFound from "/src/pages/NotFound"
import SimulationsList from "/src/pages/SimulationsList"
import SimulationDetail from "/src/pages/SimulationDetail"
import { SimulationNewChoose, SimulationNewCreate } from "/src/pages/SimulationNew"
import NodesList from "/src/pages/NodesList"
import Settings from "/src/pages/Settings"

function App() {
    return (
        <AppStateProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/simulations" replace />} />
                        <Route path="simulations">
                            <Route index element={<SimulationsList />} />
                            <Route path=":id">
                                <Route index element={<SimulationDetail />} />
                                <Route path="graph" element={<NotFound />} />
                            </Route>
                            <Route path="new" element={<SimulationNewChoose />} />
                            <Route path="new/create" element={<SimulationNewCreate />} />
                        </Route>
                        <Route path="nodes" element={<NodesList />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppStateProvider>
    )
}

export default App