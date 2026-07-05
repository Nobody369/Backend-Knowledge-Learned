import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const requiredEnv = ['RESEND_API_KEY', 'ODYSSEY_TO_EMAIL', 'ODYSSEY_FROM_EMAIL']
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
const attachment = pdfBytes.toString('base64')
const issueTitle = latestPdf.replace(/\.pdf$/, '').replaceAll('-', ' ')

const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: process.env.ODYSSEY_FROM_EMAIL,
    to: [process.env.ODYSSEY_TO_EMAIL],
    subject: `Backend Odyssey Gazette: ${issueTitle}`,
    html: `
      <h1>Backend Odyssey Gazette</h1>
      <p>Your latest backend newspaper is attached as a PDF.</p>
      <p>Read it on your phone when you have a quiet pocket of time.</p>
    `,
    attachments: [
      {
        filename: latestPdf,
        content: attachment,
      },
    ],
  }),
})

if (!response.ok) {
  throw new Error(`Email failed: ${response.status} ${await response.text()}`)
}

console.log(`Sent ${latestPdf} to ${process.env.ODYSSEY_TO_EMAIL}`)
