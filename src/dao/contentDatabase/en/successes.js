/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const Successes = include("models/SuccessesEnum")

const successMessages = {
    [Successes.emailSend]: "Email sent successfully.",
    [Successes.emailSave]: "Email saved successfully."
}

module.exports = successMessages
