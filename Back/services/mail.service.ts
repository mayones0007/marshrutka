const nodemailer = require("nodemailer")

interface email {
  [key: string]: any
}

export const emailService = new class EmailService {
  async sendEmail(email: email): Promise<void> {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'marshrutka.go@gmail.com',
        pass: 'gsyzkzevzdopqnng',
      },
    })

    await transporter.sendMail({
      from:  '"🚌 Маршрутка" <marshrutka.go@gmail.com>',
      to: email.to, // list of receivers
      subject: email.subject, // Subject line
      text: email.text, // plain text body
      html: email.html, // html body
    })
  }
}