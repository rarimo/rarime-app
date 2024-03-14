/* eslint-disable no-console */
import fs from 'fs'
import camelCase from 'lodash/camelCase.js'
import upperFirst from 'lodash/upperFirst.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const iconsDir = path.resolve(__dirname, '../src/assets/icons')
const iconsEnumFile = path.resolve(__dirname, '../src/enums/icons.ts')

const ICONS_ENUM_FILE_TEMPLATE = `import { SvgIcon } from '@mui/material'

export enum Icons {
  %s
}

export const ICON_COMPONENTS: Record<string, typeof SvgIcon> = {}
`

function generateIconsEnum() {
  const iconNames = fs
    .readdirSync(iconsDir)
    .filter(file => file.endsWith('.svg'))
    .map(file => file.replace('-icon.svg', ''))

  const iconEnum = iconNames
    .map(iconName => `${upperFirst(camelCase(iconName))} = '${iconName}',`)
    .join('\n  ')

  fs.writeFileSync(iconsEnumFile, ICONS_ENUM_FILE_TEMPLATE.replace('%s', iconEnum))
  console.log(`Generated ${iconNames.length} icons.`)
  console.log(`Icons enum saved to ${iconsEnumFile}`)
}

function renameIconFiles() {
  const iconsToRename = fs
    .readdirSync(iconsDir)
    .filter(file => file.endsWith('.svg'))
    .filter(file => !file.endsWith('-icon.svg'))

  iconsToRename.forEach(file => {
    const filePath = path.resolve(iconsDir, file)
    const newFilePath = path.resolve(iconsDir, file.replace('.svg', '-icon.svg'))
    fs.renameSync(filePath, newFilePath)
  })
  console.log(`Renamed ${iconsToRename.length} icon files.`)
}

renameIconFiles()
generateIconsEnum()
