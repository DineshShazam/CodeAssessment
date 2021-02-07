const nodemailer = require('nodemailer')

const mailer = (mailData) => {
    return new Promise((resolve,reject) => {
        try {
            const transport = nodemailer.createTransport({
               service:'gmail',
               auth: {
                   user:process.env.EMAIL_USER,
                   pass:process.env.EMAIL_PASSWORD
               }
            })
        
            transport.verify((error,success) => {
                if(error) {
                    console.log(error);
                    reject(new Error('Transport Creation Failed'));
                }
                transport.sendMail(mailData,(error,sent) => {
                    if(error) {
                        console.log(error);
                        reject(new Error('Mail Not Sent'));
                    }
                    resolve(sent);
                })
            })
        } catch (error) {
            console.log(error);
            reject(new Error('Mailing Service Not available'));
        }   
    })
    
}

module.exports = mailer;


// sgMail.send(mailData).then((result) => {
//     console.log(result);
//     return result
// }).catch((error) => {
//     //Log friendly error
// console.log(error.toString());
// console.log(output)

// //Extract error msg
// const {message, code, response} = error;

// //Extract response msg
// const {headers, body} = response;
// console.log(body);
//     return new Error('Mail Transportation Error');
// })