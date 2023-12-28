/* ***** ----------------------------------------------- ***** **
/* ***** Current Year Shortcode 获取年份
/* ***** ----------------------------------------------- ***** */

const { DateTime } = require('luxon')

module.exports = () => {
  return DateTime.local().toFormat('yyyy')
}
