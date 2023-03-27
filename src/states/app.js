import { useReducer, createContext, useContext } from "react"

const initialState = {
    locale: navigator?.languages?.some(lang => ["en", "en-US", "en-GB"].includes(lang)) ? "en-US" : "sk-SK",
    theme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    error: null,

    simulations: {
        list: null,
        listShown: null,
        compactView: false,
        sort: null,
        filters: null
    },
    nodes: {
        list: null,
        listShown: null,
        sort: null,
        filters: null
    }
}

function reducer(state, action) {
    console.log("app state update: ", action)

    try {
        switch (action.type) {
            case "toggleLocale": {
                return {
                    ...state,
                    locale: state.locale === "sk-SK" ? "en-US" : "sk-SK"
                }
            }
            case "toggleTheme": {
                return {
                    ...state,
                    theme: state.theme === "light" ? "dark" : "light"
                }
            }
            case "setSimulations": {
                state.simulations.list = action.simulations
                state.simulations.listShown = action.simulations

                return { ...state }
            }
            case "setSimulationsShown": {
                state.simulations.listShown = action.simulations

                return { ...state }
            }
            case "setSimulationsFilters": {
                state.simulations.filters = action.filters

                return { ...state }
            }
            case "setSimulationsSort": {
                state.simulations.sort = action.sort

                return { ...state }
            }
            case "toggleSimulationsView": {
                state.simulations.compactView = !state.simulations.compactView

                return { ...state }
            }
            case "setNodes": {
                state.nodes.list = action.nodes
                state.nodes.listShown = action.nodes

                return { ...state }
            }
            case "setNodesShown": {
                state.nodes.listShown = action.nodes

                return { ...state }
            }
            case "setNodesFilters": {
                state.nodes.filters = action.filters

                return { ...state }
            }
            case "setNodesSort": {
                state.nodes.sort = action.sort

                return { ...state }
            }
            case "setError": {
                state.error = action.message

                return { ...state }
            }
            default: {
                throw Error("Unknown action: " + action.type)
            }
        }
    } catch (e) {
        console.error("app state update error: ", e)

        return { ...state }
    }
}

const StateCtx = createContext(null)
const DispatchCtx = createContext(null)

export function AppStateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <StateCtx.Provider value={state}>
            <DispatchCtx.Provider value={dispatch}>
                {children}
            </DispatchCtx.Provider>
        </StateCtx.Provider>
    )
}

export function useAppState() {
    return [useContext(StateCtx), useContext(DispatchCtx)]
}