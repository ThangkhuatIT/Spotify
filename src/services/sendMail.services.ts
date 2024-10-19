import nodemailer from 'nodemailer'
import Config from '../config'
import { Types } from 'mongoose'
export async function sendConfirmMail({
  token,
  email,
  userId
}: {
  token: string
  email: string
  userId: Types.ObjectId
}) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: Config.EMAIL,
      pass: Config.PASSWORDEMAIL
    }
  })
  const verificationUrl = `${Config.FRONT_END_URL}/auth/verify-email?token=${token}&userId=${userId}`

  await transporter.sendMail({
    from: `"Spotify from thangdzkhongaiyeu" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verify yor account',
    html: `
      <h1>Welcome to Your App!</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `
  })
}
export async function sendResetPassMail(token: string, email: string, id: Types.ObjectId) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: Config.EMAIL,
      pass: Config.PASSWORDEMAIL
    }
  })
  const verificationUrl = `${Config.FRONT_END_URL}/reset_passWord?token=${token}`
  await transporter.sendMail({
    from: `"Spotify from thangdzkhongaiyeu" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Reset your password',
    html: `
      <h1>Welcome to Your App!</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `
  })
}
