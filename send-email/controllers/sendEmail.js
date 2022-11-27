const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <wbilashee@gmail.com>',
        to: "malekak44@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.json(info);
}

const sendEmail = async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: "malekak44@gmail.com",
        from: "wbilashee@gmail.com",
        subject: "Node Mailer",
        text: "Sending email using nodejs",
        html: "<strong>is so simple.</strong>",
    }

    const info = await sgMail.send(msg);
    res.json(info);
}

module.exports = {
    sendEmail,
    sendEmailEthereal,
};