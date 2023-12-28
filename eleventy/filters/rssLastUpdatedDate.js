/* ***** ----------------------------------------------- ***** **
/* ***** RSS Last Updated Date Filter 获取文章最新时间
/* ***** ----------------------------------------------- ***** */

const { DateTime } = require('luxon')

module.exports = (collection) => {
  if (!collection || !collection.length) return ''

  // Newest date in the collection
  return collection[0].publishedAt
}
