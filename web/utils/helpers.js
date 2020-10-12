export const setOverflowHidden = state => {
  document.body.style.overflow = state ? 'hidden' : ''
  // document.querySelector('html').style.overflow = state ? 'hidden' : ''
}

/**
 *
 * @param {array} arr
 * @param {string} type
 * @param {string} lang ISO Code
 */
export const formatList = (arr, type = 'conjunction', lang = 'en') => {
  if (!Array.isArray(arr) && arr.length > 0) {
    console.warn(
      `${arr} array is empty or not an array. Check the type passed to the formatList helper functiom.`
    )
    return arr
  }
  return new window.Intl.ListFormat(lang, {
    style: 'long',
    type
  }).format(arr)
}

export const makeFirstLetterCapital = string => {
  return `${string.substr(0, 1).toUpperCase()}${string.substr(
    1,
    string.length
  )}`
}

export const camel2title = camelCase =>
  camelCase
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())

export const random = (min, max, { float = false } = {}) =>
  float
    ? Math.random() * (max - min) + min
    : Math.floor(Math.random() * (max - min)) + min

export const removeTrailingSlash = string => {
  return string.replace(/\/$/, '')
}

export const toPlainText = (blocks, opts = {}) => {
  const options = Object.assign({}, { nonTextBehavior: 'remove' }, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export const createImage = (
  string,
  size = 100,
  color = 'green',
  withBorder = false,
  hoverColor = 'red'
) => {
  let drawing = document.createElement('canvas')
  const lineHeight = size * 1.1

  drawing.width = '150'
  drawing.height = '60'

  let ctx = drawing.getContext('2d')
  if (window.devicePixelRatio) {
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }

  ctx.font = `${size}pt/${lineHeight}pt Venus`
  ctx.textAlign = 'center'
  ctx.fillText(string, 75, 50) // numbers are x and y. y measures from the bottom
  const measure = ctx.measureText(string)
  const PADDING = Math.floor(measure.width) / 20

  let newDrawing = document.createElement('canvas')
  newDrawing.width = Math.floor(measure.width)
  newDrawing.height = lineHeight + 4
  if (withBorder) {
    newDrawing.width = newDrawing.width + PADDING * 2
    newDrawing.height = lineHeight + 4 + PADDING * 2
  }

  // Create main image
  let newCtx = newDrawing.getContext('2d')
  // newCtx.rect(0, 0, newDrawing.width, newDrawing.height)
  // newCtx.fillStyle = 'orange'
  // newCtx.fill()

  newCtx.fillStyle = color
  newCtx.font = `${size}pt/${lineHeight}pt Venus`
  newCtx.textAlign = 'center'
  if (withBorder) {
    newCtx.strokeStyle = color
    newCtx.lineWidth = 3
    newCtx.strokeRect(0, 0, newDrawing.width, newDrawing.height)
    newCtx.fillText(
      string,
      newDrawing.width / 2,
      lineHeight - lineHeight * 0.01 + PADDING
    )
  } else {
    newCtx.fillText(
      string,
      newDrawing.width / 2,
      lineHeight - lineHeight * 0.01
    )
  }
  const finalImage = newDrawing.toDataURL('image/png')

  // create hover image
  newCtx.clearRect(0, 0, newDrawing.width, newDrawing.height)

  if (withBorder) {
    newCtx.fillStyle = color
    newCtx.fillRect(0, 0, newDrawing.width, newDrawing.height)
    newCtx.fillStyle = hoverColor
    newCtx.fillText(
      string,
      newDrawing.width / 2,
      lineHeight - lineHeight * 0.01 + PADDING
    )
  } else {
    newCtx.fillStyle = 'transparent'
    newCtx.strokeStyle = color
    newCtx.lineWidth = 3
    newCtx.strokeText(
      string,
      newDrawing.width / 2,
      lineHeight - lineHeight * 0.01
    )
  }
  const hoverImage = newDrawing.toDataURL('image/png')
  return {
    image: finalImage,
    hoverImage: hoverImage,
    dimension: {
      measure: withBorder
        ? {
            width: measure.width + PADDING * 2
          }
        : { width: measure.width },
      height: withBorder ? lineHeight + PADDING * 2 : lineHeight
    }
  }
}
