const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const mailer = (mailParams, mailData) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, `../../${mailParams.path}`), { encoding: 'utf-8' }, (err, stringValue) => {

            if (err) {
                reject(new Error(`Error in Reading File, ${err}`));
            } else {
                try {
                    const template = handlebars.compile(stringValue);
                    const _html = template(mailData);
                    const MailParam = {
                        from:mailParams.from,
                        to:mailParams.to,
                        subject:mailParams.subject,
                        html: _html,
                    };
                    const transport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASSWORD
                        }
                    })

                    transport.verify((error, success) => {
                        if (error) {    
                            reject(new Error('Transport Creation Failed'));
                        }
                        transport.sendMail(MailParam, (error, sent) => {
                            if (error) {      
                                reject(new Error('Mail Not Sent'));
                            }
                            resolve(sent);
                        })
                    })
                } catch (error) {
                    reject(new Error('Mailing Service Not available'));
                }

            }
        });

    });

}

module.exports = mailer;