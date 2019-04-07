const mailgun = require("mailgun-js");
const domain = 'secret';
const mg = mailgun({ apiKey: 'secret', domain: domain });

let sendEmail = (data) => {
    return new Promise((resolve, reject) => {

        mg.messages().send(data, (error) => {
            if (error) {
                return reject(error);
            }
            return resolve('true');
        });
    });
};

module.exports = sendEmail;