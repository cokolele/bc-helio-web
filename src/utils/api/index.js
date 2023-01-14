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

    let response

    try {
        response = await fetch(base + resource, options)
    } catch (e) {
        throw new ApiNetworkError(e)
    }

    let json

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
    try {
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

        const response = await fetch(base + resource, options)
        const json = await response.json()

        return { response, json }
    } catch (e) {
        return fetchError(e)
    }
}

const put = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": contentType
            },
            body: contentType == "application/json" ? JSON.stringify(body) : body
        }

        const response = await fetch(base + resource, options)
        const json = await response.json()

        return { response, json }
    } catch (e) {
        return fetchError(e)
    }
}

const patch = async (resource = "/", body = {}, contentType = "application/json") => {
    try {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": contentType
            },
            body: contentType == "application/json" ? JSON.stringify(body) : body
        }

        const response = await fetch(base + resource, options)
        const json = await response.json()

        return { response, json }
    } catch (e) {
        return fetchError(e)
    }
}

const delete_ = async (resource = "/") => {
    try {
        const options = {
            method: "DELETE",
            credentials: "include"
        }

        const response = await fetch(base + resource, options)
        const json = await response.json()

        return { response, json }
    } catch (e) {
        return fetchError(e)
    }
}

export default {
    get,
    post,
    put,
    patch,
    delete: delete_,
    ApiNetworkError,
    ApiBodyParseError,
    ApiResponseError
}