//https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update
import { useEffect, useRef } from "react"

export default function useUpdateEffect(effect, dependencies) {
    const isInitialMount = useRef(true)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            return effect()
        }
    }, dependencies);
}