/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const Errors = include("models/ErrorsEnum")

const errors = {
    [Errors.emailSendError]: "Email not sent. Please try again.",
    [Errors.emailSaveError]: "Email not saved. Please try again."
}

module.exports = errors
