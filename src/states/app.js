import { useReducer, createContext, useContext } from 'react'

const initialState = {
    simulations: null,
    nodes: null,
    showFilters: false,
    locale: navigator?.languages?.some(lang => ["en", "en-US", "en-GB"].includes(lang)) ? "en-US" : "sk-SK",
    theme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
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
                return {
                    ...state,
                    simulations: action.simulations
                }
            }
            case "setNodes": {
                return {
                    ...state,
                    nodes: action.nodes
                }
            }
            case "setShowFilters": {
                return {
                    ...state,
                    showFilters: action.show
                }
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