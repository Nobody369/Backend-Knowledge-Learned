import { mkdir, readdir } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const issuesDir = path.join(root, 'docs', 'issues')
const outputDir = path.join(root, 'dist', 'pdf')

const candidates = [
  process.env.CHROME_PATH,
  process.env.GOOGLE_CHROME_SHIM,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const issueFiles = (await readdir(issuesDir))
  .filter((file) => file.endsWith('.html'))
  .sort()

if (issueFiles.length === 0) {
  throw new Error('No HTML issues found in docs/issues.')
}

const latestIssue = issueFiles.at(-1)
const inputPath = path.join(issuesDir, latestIssue)
const outputName = latestIssue.replace(/\.html$/, '.pdf')
const outputPath = path.join(outputDir, outputName)

await mkdir(outputDir, { recursive: true })

let lastError

for (const browserPath of candidates) {
  try {
    await printPdf(browserPath, inputPath, outputPath)
    console.log(`PDF created: ${outputPath}`)
    process.exit(0)
  } catch (error) {
    lastError = error
  }
}

throw new Error(`Could not find or run Chrome/Edge for PDF generation. Last error: ${lastError?.message}`)

function printPdf(browserPath, htmlPath, pdfPath) {
  const url = pathToFileURL(htmlPath).href
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=1000',
    `--print-to-pdf=${pdfPath}`,
    url,
  ]

  return new Promise((resolve, reject) => {
    const child = spawn(browserPath, args, {
      stdio: 'pipe',
      windowsHide: true,
    })

    let stderr = ''

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${browserPath} exited with code ${code}: ${stderr}`))
      }
    })
  })
}
