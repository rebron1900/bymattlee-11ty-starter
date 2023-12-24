const ghostContentAPI = require("@tryghost/content-api");
const { ghost } = require("../../../config");

// Init Ghost API
const api = new ghostContentAPI({ ...ghost });

// Get all site information
module.exports = async function () {
  const siteData = await api.settings
    .browse({
      include: "icon,url",
    })
    .catch((err) => {
      console.error(err);
    });

  if (process.env.SITE_URL) siteData.url = process.env.SITE_URL;

  return siteData;
};
