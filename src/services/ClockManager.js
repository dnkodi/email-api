/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const Sntp = require("sntp")
const Logger = include("services/Logger")

const logger = new Logger("ClockManager")

class ClockManager {
    constructor() {
        this.time = ""
    }
    async getTime() {
        try {
            logger.debug("Clock")
            await Sntp.start()
            this.time = Sntp.now() // With offset
            Sntp.stop()

            return this.time
        }
        catch (e) {
            throw Error("API Time error")
        }
    }
}

module.exports = ClockManager
