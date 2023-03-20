import { useAppState } from "/src/states/app"

import enUS from "./locales/en-US"
import skSK from "./locales/sk-SK"

const languages = {
    "en-US": enUS,
    "sk-SK": skSK
}

export default function useLanguage() {
    const [{ locale }] = useAppState()

    return languages[locale] || skSK
}