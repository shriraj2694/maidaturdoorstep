const nodemailer = require("nodemailer");


const sendMail = async(req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'rubie53@ethereal.email',
        pass: '6yGjMET3e63pYm2h9k',
    },
    });

let info = await transporter.sendMail({
    from: '"shriraj 👻" <shriraj@example.com>', // sender address
    to: "mokshad.nemade221@vit.edu, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
});

console.log("Message sent: %s", info.messageId);
res.json(info);
   // res.send("I am sending mail");
};

module.exports = sendMail;