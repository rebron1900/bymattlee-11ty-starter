/* ***** ----------------------------------------------- ***** **
/* ***** Cache Bust Filter 增加版本时间戳
/* ***** ----------------------------------------------- ***** */

const timestamp = Math.floor(Date.now() / 1000)

module.exports = (value) => {
  return `${value}?${timestamp}`
}
