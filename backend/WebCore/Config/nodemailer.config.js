const nodemailer = require('nodemailer');
const config = require("./auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});


const sendConfirmationEmail = (firstName, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${firstName}</h2>
        <p>Thank you for registering. Please confirm your account by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${email}/${confirmationCode}>Click here</a>
        </div>`,
    }).catch(err => console.log(err));
};

module.exports = {
    sendConfirmationEmail
}