
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const inputDir = 'src/assets/images'
const outputDir = 'src/assets/images-optimized'

async function processDirectory(source, destination) {
  await mkdir(destination, { recursive: true })

  const entries = await readdir(source, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name)
    const destinationPath = path.join(destination, entry.name)

    if (entry.isDirectory()) {
      await processDirectory(sourcePath, destinationPath)
      continue
    }

    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue

    const outputPath = destinationPath.replace(/\.(png|jpe?g)$/i, '.webp')

    await sharp(sourcePath)
      .webp({ quality: 80, effort: 5 })
      .toFile(outputPath)

    console.log(`Optimized: ${entry.name}`)
  }
}

await processDirectory(inputDir, outputDir)

console.log('\nImage optimization completed!')
