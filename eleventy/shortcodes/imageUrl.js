/* ***** ----------------------------------------------- ***** **
/* ***** Image URL Shortcode 图片宽高处理
/* ***** ----------------------------------------------- ***** */

const client = require('../utilities/sanityClient.js')
const imageUrlBuilder = require('@sanity/image-url')

const builder = imageUrlBuilder(client)

module.exports = (image, width) => {
  return builder.image(image).width(width).url()
}
