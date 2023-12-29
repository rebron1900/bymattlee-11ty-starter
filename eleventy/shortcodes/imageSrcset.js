/* ***** ----------------------------------------------- ***** **
/* ***** Image Srcset Shortcode 图片多规格转换
/* ***** ----------------------------------------------- ***** */

const absoluteUrl = require("../filters/absoluteUrl.js");
const imageUrl = require("../shortcodes/imageUrl.js");
const { envUrls } = require("../../config.js");
const sizeOf = require("image-size");

// Generate responsive image srcset based on width
module.exports = (image, isLocal = false) => {
  let imageSrcset = [];

  const imageWidths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800];

  if (image.match(envUrls.cdnUrl)) {
    // If image is local, determine the width of the image and then generate
    // markup for images at sizes smaller than the image

    imageWidths.forEach((width) => {
      imageSrcset.push(`${image}!${width}w ${width}w`);
    });
  } else {
    imageSrcset.push(image);
  }

  return imageSrcset.join(", ");
};
