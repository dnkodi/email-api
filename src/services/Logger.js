/* eslint-disable no-console */

const config = include("utils/config")

/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const ansi = {
    DEBUG: "\x1b[36m%s\x1b[0m",
    INFO: "\x1b[32m%s\x1b[0m",
    WARN: "\x1b[33m%s\x1b[0m",
    ERROR: "\x1b[31m%s\x1b[0m"
}

const prettyStringify = (json) => Object.keys(json).map(key => `${key}: ${JSON.stringify(json[key])}`).join(", ")

class Logger {

    constructor(component) {
        this.fields = {
            application: "email-api",
            component,
            env: config.deploymentEnv
        }
        this.debug = this.log("DEBUG")
        this.info = this.log("INFO")
        this.warn = this.log("WARN")
        this.error = this.log("ERROR")
    }

    log(type) {
        return (msg, additionalFields = {}) => {
            if (config.nodeEnv !== "test") {
                const message = typeof msg === "object" ? prettyStringify(msg) : msg
                const json = { message, ...this.fields, type, ...additionalFields }
                console.log(ansi[type], JSON.stringify(json))
            }
        }
    }

}

module.exports = Logger
