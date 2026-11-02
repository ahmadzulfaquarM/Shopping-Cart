
import { readFile, writeFile } from 'node:fs/promises'

const files = [
  'src/components/home/Hero/HeroImage.jsx',
  'src/components/home/PromotionalBanner/PromotionalBanner.jsx',
  'src/data/categories.js',
  'src/data/products.js',
  'src/data/testimonials.js',
]

for (const file of files) {
  const original = await readFile(file, 'utf8')

  const updated = original
    .replaceAll('assets/images/', 'assets/images-optimized/')
    .replace(/\.(png|jpg|jpeg)(?=["'])/gi, '.webp')

  if (updated !== original) {
    await writeFile(file, updated, 'utf8')
    console.log(`Updated: ${file}`)
  } else {
    console.log(`No changes needed: ${file}`)
  }
}

console.log('\nImport updates completed!')
