/* ***** ----------------------------------------------- ***** **
/* ***** RSS Last Updated Date Filter
/* ***** ----------------------------------------------- ***** */

const { DateTime } = require('luxon');

module.exports = collection => {
  if(!collection || !collection.length) {
    throw new Error( "Collection is empty in rssLastUpdatedDate filter." );
  }

  // Newest date in the collection
  return collection[0].publishedAt;
}
