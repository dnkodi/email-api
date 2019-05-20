/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const sgMail = require("@sendgrid/mail")
const conf = include("utils/config")
const { Ok, ServerError } = include("services/responses")
const { findErrorText, findSuccessText } = include("dao/contentDao")
const Errors = include("models/ErrorsEnum")
const Successes = include("models/SuccessesEnum")
const DbClient = include("dao/DbClient")
const misc = include("utils/misc")
const ClockManager = include("services/ClockManager")

const { SENDGRID_API_KEY } = conf

class EmailController {
    static async handleEmail(req) {
        const id = misc.generateUUID()
        const mongo = new DbClient()
        try {
            const clock = new ClockManager()
            const time = await clock.getTime()
            const now = time + (3600000 * 10) // Time in Sydney

            const today8am = new Date(now).setUTCHours(8, 0, 0, 0)
            const today5pm = new Date(now).setUTCHours(23, 0, 0, 0)
            const details = { ...req.body, id, time }

            // If it is within 8am to 5pm send the email and save
            if (now > today8am && now < today5pm) {
                try {
                    sgMail.setApiKey(SENDGRID_API_KEY)

                    const data = { ...details, status: "SUCCESS" }
                    const msg = {
                        to: data.to,
                        from: "test@example.com",
                        subject: data.subject,
                        html: `<strong>${data.content}</strong>`
                    }
                    const result = await sgMail.send(msg)
                    if (result[0].statusCode === 202) await mongo.saveEmail(data)
                    else await mongo.saveEmail({ ...data, status: "FAILED" })
                    return Ok(findSuccessText(Successes.emailSend), {
                        id,
                        status: data.status
                    })
                }
                catch (e) {
                    return ServerError(findErrorText(Errors.emailSendError))
                }
            }
            else {
                const data = { ...details, status: "QUEUED" }
                await mongo.saveEmail(data)
                return Ok(findSuccessText(Successes.emailSave), {
                    id,
                    status: data.status
                })
            }
        }
        catch (e) {
            return ServerError(findErrorText(Errors.emailSaveError))
        }
    }
}

module.exports = EmailController
