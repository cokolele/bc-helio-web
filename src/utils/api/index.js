class ApiNetworkError extends Error {
    constructor(e) {
        super(e.message)
        this.name = this.constructor.name
        this.originalError = e
    }
}

class ApiBodyParseError extends Error {
    constructor(e, response) {
        super(e.message)
        this.name = this.constructor.name
        this.originalError = e
        this.response = response
    }
}

class ApiResponseError extends Error {
    constructor(response, json) {
        super(response.status + " - " + response.statusText)
        this.name = this.constructor.name
        this.response = response

        if (json && response.status === 400) {
            this.message = json.message
            this.code = json.error
        }
    }
}

const base = process.env.NODE_ENV == "production" ? "https://api.officialdomain.com" : "/api"

const get = async (resource = "/", contentType = "application/json") => {
    const options = {
        method: "GET",
        headers: {
            Accept: contentType
        }
    }

    let response, json

    try {
        response = await fetch(base + resource, options)
    } catch (e) {
        throw new ApiNetworkError(e)
    }

    if (contentType == "application/json") {
        try {
            json = await response.json()
        } catch (e) {
            throw new ApiBodyParseError(response, e)
        }
    }

    if (!response.ok) {
        throw new ApiResponseError(response, json)
    }

    return { response, json }
}

const post = async (resource = "/", body = {}, contentType = "application/json") => {
    const options = {
        method: "POST",
        headers: {},
        body: contentType == "application/json" ? JSON.stringify(body) : body
    }

    if (contentType) {
        options.headers = {
            ...options.headers,
            "Content-Type": contentType
        }
    }

    let response, json

    try {
        response = await fetch(base + resource, options)
    } catch (e) {
        throw new ApiNetworkError(e)
    }

    try {
        if (response?.headers["content-type"] == "application/json") {
            if (response?.headers["content-length"]) {
                json = await response.json()
            } else {
                json = {}
            }
        }
    } catch (e) {
        throw new ApiBodyParseError(response, e)
    }

    if (!response.ok) {
        throw new ApiResponseError(response, json)
    }

    return { response, json }
}

export default {
    get,
    post,
    ApiNetworkError,
    ApiBodyParseError,
    ApiResponseError
}