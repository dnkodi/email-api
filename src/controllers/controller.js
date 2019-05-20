/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const { validate } = require("jsonschema")
const { BadRequest } = include("services/responses")
const Logger = include("services/Logger")

const logger = new Logger("V0.RequestValidator")

const validateRequest = (req, schema, action) => {
    if (req.is("application/json")) {
        const result = validate(req.body, schema)
        if (result.valid) return action(req)
        else {
            logger.error("Received invalid JSON body.", {
                endpoint: req.path,
                method: req.method,
                body: req.body,
                errors: result.errors.map(e => `${e.property} ${e.message}`)
            })
            return BadRequest("Malformed JSON.")
        }
    }
    else return BadRequest("Request must be JSON.")
}

const send = (action, schema) => (req, res) => {
    const response = schema ? validateRequest(req, schema, action) : action(req)
    if (Boolean(response.then)) response.then(resp => res.status(resp.status).json(resp)).catch(error => res.status(error.status).json(error))
    else res.status(response.status).json(response)
}

module.exports = {
    send
}
