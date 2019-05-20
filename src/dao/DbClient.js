/* eslint-disable no-console */
/*
 * Created by Duleep Kodithuwakku on 20-05-2019.
 */
const MongoClient = require("mongodb").MongoClient
const conf = include("utils/config")

const Logger = include("services/Logger")

const logger = new Logger("MongoDB")

const { MONGO_URI, MONGO_DB, MONGO_COLLECTION } = conf

class DbClient {
    constructor() {
        this.db = {}
    }

    async connect() {
        try {
            const client = await MongoClient.connect(MONGO_URI, { "useNewUrlParser": true })
            this.db = client.db(MONGO_DB)
            logger.debug("Connection Successful")
        }
        catch (error) {
            console.log(error)
        }

    }

    async saveEmail(data) {
        try {
            await this.connect()
            if (this.db) {
                const collection = this.db.collection(MONGO_COLLECTION)
                await collection.insertOne(data)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    async close() {
        try {
            await this.db.close()
        }

        catch (error) {
            console.log(error)
        }
    }

}

module.exports = DbClient
