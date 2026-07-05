import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import nodemailer from 'nodemailer'

const requiredEnv = ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'ODYSSEY_TO_EMAIL']
const missing = requiredEnv.filter((name) => !process.env[name])

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
}

const root = process.cwd()
const pdfDir = path.join(root, 'dist', 'pdf')
const pdfFiles = (await readdir(pdfDir))
  .filter((file) => file.endsWith('.pdf'))
  .sort()

if (pdfFiles.length === 0) {
  throw new Error('No PDF files found. Run npm run build:pdf first.')
}

const latestPdf = pdfFiles.at(-1)
const pdfPath = path.join(pdfDir, latestPdf)
const pdfBytes = await readFile(pdfPath)
const issueTitle = latestPdf.replace(/\.pdf$/, '').replaceAll('-', ' ')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

await transporter.sendMail({
  from: `"Backend Odyssey Gazette" <${process.env.GMAIL_USER}>`,
  to: process.env.ODYSSEY_TO_EMAIL,
  subject: `Backend Odyssey Gazette: ${issueTitle}`,
  html: `
    <h1>Backend Odyssey Gazette</h1>
    <p>Your latest backend newspaper is attached as a PDF.</p>
    <p>Read it on your phone when you have a quiet pocket of time.</p>
  `,
  attachments: [
    {
      filename: latestPdf,
      content: pdfBytes,
      contentType: 'application/pdf',
    },
  ],
})

console.log(`Sent ${latestPdf} to ${process.env.ODYSSEY_TO_EMAIL}`)
