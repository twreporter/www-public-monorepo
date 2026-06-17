import { $isTextNode, type DOMConversionMap, TextNode } from 'lexical'

export const hexToRgb = (hex: string) => {
  const normalizedHex =
    hex.length === 3
      ? hex
          .split('')
          .map((channel) => channel + channel)
          .join('')
      : hex
  const [red, green, blue] = normalizedHex.match(/.{2}/g) ?? []

  if (!red || !green || !blue) {
    return ''
  }

  return `rgb(${parseInt(red, 16)}, ${parseInt(green, 16)}, ${parseInt(
    blue,
    16
  )})`
}

export const parseAllowedColor = (input: string): string => {
  if (input === 'transparent') return 'transparent'
  if (/^rgba\(0,\s*0,\s*0,\s*0\)$/.test(input)) return 'transparent'

  const rgbMatch = input.match(/^rgb\((\d+), (\d+), (\d+)\)$/)
  if (rgbMatch) {
    return input
  }

  const hexMatch = input.match(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
  if (!hexMatch) {
    return ''
  }

  const hex = hexMatch[1]
  if (!hex) {
    return ''
  }

  return hexToRgb(hex)
}

const DEFAULT_BACKGROUND_COLORS = [
  parseAllowedColor('transparent'),
  parseAllowedColor('#f1f1f1'),
]
const DEFAULT_TEXT_COLOR = parseAllowedColor('#404040')

const isDefaultBackgroundColor = (color: string) => {
  const parsedColor = parseAllowedColor(color)
  return parsedColor !== '' && DEFAULT_BACKGROUND_COLORS.includes(parsedColor)
}

const isDefaultTextColor = (color: string) => {
  const parsedColor = parseAllowedColor(color)
  return parsedColor !== '' && parsedColor === DEFAULT_TEXT_COLOR
}

export const sanitizeTextStyle = (style: string): string => {
  if (style === '' || typeof document === 'undefined') {
    return style
  }

  const element = document.createElement('span')
  element.style.cssText = style

  let shouldSanitize = false
  if (isDefaultBackgroundColor(element.style.backgroundColor)) {
    element.style.removeProperty('background-color')
    shouldSanitize = true
  }
  if (isDefaultTextColor(element.style.color)) {
    element.style.removeProperty('color')
    shouldSanitize = true
  }

  return shouldSanitize ? element.style.cssText : style
}

function getExtraStyles(element: HTMLElement): string {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = ''
  const backgroundColor = parseAllowedColor(element.style.backgroundColor)
  const color = parseAllowedColor(element.style.color)
  if (backgroundColor !== '' && !isDefaultBackgroundColor(backgroundColor)) {
    extraStyles += `background-color: ${backgroundColor};`
  }
  if (color !== '' && !isDefaultTextColor(color)) {
    extraStyles += `color: ${color};`
  }
  return extraStyles
}

function buildImportMap(): DOMConversionMap {
  const importMap: DOMConversionMap = {}

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode)
      if (!importer) {
        return null
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element)
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output
          }
          const extraStyles = getExtraStyles(element)
          if (extraStyles) {
            const { forChild } = output
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent)
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles)
                }
                return textNode
              },
            }
          }
          return output
        },
      }
    }
  }

  return importMap
}

export default buildImportMap
