/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const response = (status, message, data) => {
    const resp = {
        status,
        message
    }
    return data ? { ...resp, data } : resp
}

const Ok = (message, data) => response(200, message, data)
const BadRequest = (message) => response(400, message)
const Unauthorised = (message) => response(401, message)
const NotFound = (message) => response(404, message)
const ServerError = (message) => response(500, message)

module.exports = {
    BadRequest,
    Ok,
    NotFound,
    ServerError,
    Unauthorised
}
