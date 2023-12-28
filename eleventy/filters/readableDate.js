/* ***** ----------------------------------------------- ***** **
/* ***** Readable Date Filter 时间格式转换
/* ***** ----------------------------------------------- ***** */

const { DateTime } = require('luxon')

module.exports = (isoDate) => {
  return DateTime.fromISO(isoDate).toFormat('LLL dd, yyyy')
}
