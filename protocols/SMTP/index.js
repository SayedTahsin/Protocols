require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const mailOptions = {
  from: `"Protocol Lab" <${process.env.SMTP_USER}>`,
  to: "receiver@example.com",
  subject: "Test Email from SMTP Demo",
  text: "Hello from your Node.js SMTP demo!",
}

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    return console.error("❌ Error:", err)
  }
  console.log("✅ Email sent:", info.response)
})
