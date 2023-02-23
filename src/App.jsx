import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppStateProvider } from "/src/states/app"

import Layout from "/src/pages/Layout"
import NotFound from "/src/pages/NotFound"
import SimulationsList from "/src/pages/SimulationsList"
import SimulationDetail from "/src/pages/SimulationDetail"
import SimulationNew from "/src/pages/SimulationNew"
import NodesList from "/src/pages/NodesList"

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
                            <Route path="new" element={<SimulationNew />} />
                        </Route>
                        <Route path="nodes" element={<NodesList />} />
                        <Route path="settings" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    
                    {/*
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/simulations" replace />} />
                        <Route path="simulations">
                            <Route index element={<SimulationsList />} />
                            <Route path=":id">
                                <Route index element={<SimulationDetail />} />
                                <Route path="graph" element={<SimulationGraph />} />
                            </Route>
                        </Route>
                        <Route path="nodes" element={<NodesList />} />
                    </Route>
                    */}
                </Routes>
            </BrowserRouter>
        </AppStateProvider>
    )
}

export default App