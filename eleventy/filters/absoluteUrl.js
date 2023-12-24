/* ***** ----------------------------------------------- ***** **
/* ***** Absolute URL Filter
/* ***** ----------------------------------------------- ***** */

const { ghost } = require('../../config.js')
const homeUrl = ghost.dev_url

module.exports = (value) => {
  return homeUrl ? homeUrl + value : value;
}
