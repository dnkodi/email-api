/*
 * Created by Duleep Kodithuwakku on 19-05-2019.
 */
const { to, content, subject } = include("models/requestSchemas/properties")

const EmailRequest = {
    id: "/EmailRequest",
    type: "object",
    properties: {
        to,
        content,
        subject
    },
    included: [
        "to",
        "content",
        "subject"
    ]
}

module.exports = EmailRequest
