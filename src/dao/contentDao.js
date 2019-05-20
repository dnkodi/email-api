/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const db = include("dao/contentDatabase")
const Errors = include("models/ErrorsEnum")

const findSuccessText = (actionName, locale = "en") => db[locale].successes[actionName]

const findErrorText = (errorName, locale = "en") => db[locale].errors[errorName] || db[locale].errors[Errors.febeServerError]

module.exports = {
    findSuccessText,
    findErrorText
}
