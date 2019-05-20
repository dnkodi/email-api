/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const express = require("express")
const cors = require("cors")
const EmailController = include("controllers/EmailController")
const { send } = include("controllers/controller")
const schema = include("models/requestSchemas")
const { NotFound } = include("services/responses")
const Logger = include("services/Logger")

const app = express()
const port = 2010
const logger = new Logger("ApplicationServer")

// Middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    const start = Date.now()

    if (req.path !== "/") {
        res.on("finish", () => {
            const duration = Date.now() - start
            logger.info(req.originalUrl, {
                duration,
                endpoint: req.path,
                method: req.method,
                status: res.statusCode
            })
        })
    }

    next()
})

// Routes
app.post("/api/v1/emails", send(EmailController.handleEmail, schema.EmailRequest))
app.use("*", (req, res) => res.status(404).json(NotFound("Not found, go away.")))

// Initialise Application
app.listen(port, () => logger.debug(`Server listening on port ${port}.`))
