import { useEffect } from "react"

export default function useClickedOutside(ref, onClickOutside) {
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target) && ref.current !== e.target) {
                onClickOutside(e)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref])
}