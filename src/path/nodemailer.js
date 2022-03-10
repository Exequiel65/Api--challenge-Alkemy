require('dotenv').config();
const nodemailer = require('nodemailer')

async function main(remitent,message1){

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.PASS_EMAIL,
        },
      });
    
    transporter.verify()
    .then(() =>{
        console.log('ready for send emails')
    })

    var message = {
        from : "Api-Challenge Alkemy" + "<" + process.env.EMAIL + ">",
        to : remitent,
        subject : "Registro",
        // text : "Esta es una prueba de nodemailer",
        html : message1
    }
    let info = await transporter.sendMail(message)

    console.log("Message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}


module.exports = main