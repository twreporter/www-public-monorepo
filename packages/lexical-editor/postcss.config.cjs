const path = require('node:path')
const fs = require('node:fs')
const crypto = require('node:crypto')

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function hashFile(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 8)
}

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url')({
      filter: '**/*.{svg,png,jpg,jpeg,gif,webp,woff,woff2}',
      url: (asset) => {
        // asset.absolutePath: 原始檔案絕對路徑
        // asset.pathname: 原始 url(...) 字串解析後的 pathname

        const sourcePath = asset.absolutePath
        if (!sourcePath || !fs.existsSync(sourcePath)) {
          return asset.url
        }

        const fileBuffer = fs.readFileSync(sourcePath)
        const ext = path.extname(sourcePath)
        const baseName = path.basename(sourcePath, ext)
        const hash = hashFile(fileBuffer)

        const outputFileName = `${baseName}.${hash}${ext}`
        const outputDir = path.resolve(__dirname, 'dist/assets')
        const outputPath = path.join(outputDir, outputFileName)

        ensureDir(outputDir)

        if (!fs.existsSync(outputPath)) {
          fs.copyFileSync(sourcePath, outputPath)
        }

        // 這裡回傳「相對於 dist/style.css」的 URL
        return `assets/${outputFileName}`
      },
    }),
  ],
}