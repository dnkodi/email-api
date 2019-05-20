/* eslint-disable no-process-env */
/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const fs = require("fs")
const path = require("path")
const nodeEvars = {
    DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_COLLECTION: process.env.MONGO_COLLECTION
}

const fileEvars = fs.existsSync(path.join(".", "evars.json")) ? JSON.parse(fs.readFileSync("./evars.json")) : {}
const config = {
    ...nodeEvars,
    ...fileEvars
}

module.exports = config
