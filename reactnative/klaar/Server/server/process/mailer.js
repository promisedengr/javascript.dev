const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const fs = require('fs')
const path = require('path')
const OAuth2 = google.auth.OAuth2
const config = require('config')
const credential = {
    mailerUser: config.get('google.mailerUser'),
    clientId: config.get('google.clientId'),
    clientSecret: config.get('google.clientSecret'),
    redirectUri: config.get('google.redirectUri'),
    refreshToken: config.get('google.refreshToken')
}
const templates = {
    'registration': {
        html: fs.readFileSync(path.resolve(__dirname, './mailerHtml/registrationTemplate.html'), 'utf8'),
        variables: {
            'email': '\\$\\{email\\}',
            '1': '\\$\\{1\\}',
            '2': '\\$\\{2\\}',
            '3': '\\$\\{3\\}',
            '4': '\\$\\{4\\}'
        }
    },
    getHtmlFromTemlate: function(templateName, variables = {}) {
        const template = this[templateName]
        let html = template.html
        for(const key of Object.keys(template.variables)) {
            html = html.replace(new RegExp(template.variables[ key ], 'g'), variables[ key ])
        }
        return html
    }
}
module.exports = {
    send: async({
        to,
        templateName,
        variables = {},
        subject = "Klaar shop message",
        text = "This message was sent from Klaar shop",
        html = '<p>This message was sent from <span style="color: #0ec403"><strong>Klaar shop</strong></span></p>' 
    }) => {
        try {
            const oauth2Client = new OAuth2(credential.clientId, credential.clientSecret, credential.redirectUri)
            oauth2Client.setCredentials({
                refresh_token: credential.refreshToken
            })
            const accessToken = await oauth2Client.getAccessToken()
            .then(res => {
                return res.token
            })
            const smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: credential.mailerUser, 
                    clientId: credential.clientId,
                    clientSecret: credential.clientSecret,
                    refreshToken: credential.refreshToken,
                    accessToken
                }
            })
            const mailOptions = {
                from: credential.mailerUser,
                to,
                subject,
                text,
                html: templateName ? templates.getHtmlFromTemlate(templateName, variables) : html
            }
            await smtpTransport.sendMail(
                mailOptions
            )
        } catch(e) {
            throw e
        }
    }
}