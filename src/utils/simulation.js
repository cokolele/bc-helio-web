export function typeMapper(apiType) {
    switch (apiType) {
        case "ONE_DIMENSION_FP":
            return "1D - FP"
        case "ONE_DIMENSION_BP":
            return "1D - BP"
        case "TWO_DIMENSION_FP":
            return "2D - FP"
        case "TWO_DIMENSION_FT":
            return "2D - FT"
        case "TWO_DIMENSION_BP":
            return "2D - BP"
        default:
            return "Unknown"
    }
}

export const typesList = ["BP", "FP", "FT"]
export const dimensionsList = ["1D", "2D"]