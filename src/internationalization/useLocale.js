import { useAppState } from "/src/states/app"

export default function useLocale() {
    const [{ locale }] = useAppState()

    import("./locales/sk-SK.json", { assert: { type: "json" } })
        .then(lang => lang)
}