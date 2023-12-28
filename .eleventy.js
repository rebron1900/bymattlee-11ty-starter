/* ***** ----------------------------------------------- ***** **
/* ***** Eleventy Config
/* ***** ----------------------------------------------- ***** */

// Import transforms
const parseContent = require("./eleventy/transforms/parseContent.js");
const minifyHtml = require("./eleventy/transforms/minifyHtml.js");
const addHeaderCredit = require("./eleventy/transforms/addHeaderCredit.js");

// Import filters
const absoluteUrl = require("./eleventy/filters/absoluteUrl.js");
const cacheBust = require("./eleventy/filters/cacheBust.js");
const htmlDate = require("./eleventy/filters/htmlDate.js");
const readableDate = require("./eleventy/filters/readableDate.js");
const rssLastUpdatedDate = require("./eleventy/filters/rssLastUpdatedDate.js");
const rssDate = require("./eleventy/filters/rssDate.js");
const articleUrl = require("./eleventy/filters/articleUrl.js");
const articleCategoryUrl = require("./eleventy/filters/articleCategoryUrl.js");
const blocksToHtml = require("./eleventy/filters/blocksToHtml.js");
const highlight = require("./eleventy/filters/highlight.js");

// Import shortcodes
const imageUrl = require("./eleventy/shortcodes/imageUrl.js");
const imageSrcset = require("./eleventy/shortcodes/imageSrcset.js");
const isSamePageOrSection = require("./eleventy/shortcodes/isSamePageOrSection.js");
const svg = require("./eleventy/shortcodes/svg.js");
const currentYear = require("./eleventy/shortcodes/currentYear.js");

const ghostContentAPI = require("@tryghost/content-api");
const { ghost } = require("./config.js");

// Init Ghost API
const api = new ghostContentAPI({ ...ghost });

// Strip Ghost domain from urls
const stripDomain = (url) => {
  return url.replace(process.env.GHOST_API_URL, "");
};

module.exports = function (config) {
  // Transforms
  // config.addTransform("parseContent", parseContent);
  if (process.env.NODE_ENV !== "development")
    config.addTransform("minifyHtml", minifyHtml);
  config.addTransform("addHeaderCredit", addHeaderCredit);

  // Filters
  config.addFilter("absoluteUrl", absoluteUrl);
  config.addFilter("cacheBust", cacheBust);
  config.addFilter("htmlDate", htmlDate);
  config.addFilter("readableDate", readableDate);
  config.addFilter("rssLastUpdatedDate", rssLastUpdatedDate);
  config.addFilter("rssDate", rssDate);
  config.addFilter("articleUrl", articleUrl);
  config.addFilter("articleCategoryUrl", articleCategoryUrl);
  config.addFilter("blocksToHtml", blocksToHtml);
  config.addFilter("highlight",highlight);

  // Shortcodes
  config.addShortcode("imageUrl", imageUrl);
  config.addShortcode("imageSrcset", imageSrcset);
  config.addShortcode("isSamePageOrSection", isSamePageOrSection);
  config.addShortcode("svg", svg);
  config.addShortcode("currentYear", currentYear);

  // Layout aliases
  config.addLayoutAlias("base", "layouts/base.njk");
  config.addLayoutAlias("default", "layouts/default.njk");
  config.addLayoutAlias("page", "layouts/page.njk");

  config.addFilter("getReadingTime", (text) => {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  });

  // Date formatting filter
  config.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Don't ignore the same files ignored in the git repo
  config.setUseGitIgnore(false);

  // Get all pages, called 'docs' to prevent
  // conflicting the eleventy page object
  config.addCollection("docs", async function (collection) {
    collection = await api.pages
      .browse({
        include: "authors",
        limit: "all",
      })
      .catch((err) => {
        console.error(err);
      });

    collection.map((doc) => {
      doc.url = stripDomain(doc.url);
      doc.primary_author.url = stripDomain(doc.primary_author.url);

      // Convert publish date into a Date object
      doc.published_at = new Date(doc.published_at);
      return doc;
    });

    return collection;
  });

  // Get all posts
  config.addCollection("posts", async function (collection) {
    collection = await api.posts
      .browse({
        include: "tags,authors",
        limit: "all",
        filter: "visibility:public"
      })
      .catch((err) => {
        console.error(err);
      });

    collection.forEach((post) => {
      post.url = stripDomain(post.url);
      post.primary_author.url = stripDomain(post.primary_author .url);
      post.tags.map((tag) => (tag.url = stripDomain(tag.url)));
      post.tags = post.tags.filter(tag => tag.visibility == 'public');
      // Convert publish date into a Date object
      post.published_at = new Date(post.published_at);
    });

    // Bring featured post to the top of the list
    collection.sort((post, nextPost) => nextPost.featured - post.featured);

    return collection;
  });

  // Get all authors
  config.addCollection("authors", async function (collection) {
    collection = await api.authors
      .browse({
        limit: "all",
        filter: "visibility:public"
      })
      .catch((err) => {
        console.error(err);
      });

    // Get all posts with their authors attached
    const posts = await api.posts
      .browse({
        include: "authors",
        filter: "visibility:public",
        limit: "all",
      })
      .catch((err) => {
        console.error(err);
      });

    // Attach posts to their respective authors
    collection.forEach(async (author) => {
      const authorsPosts = posts.filter((post) => {
        post.url = stripDomain(post.url);
        return post.primary_author.id === author.id;
      });
      if (authorsPosts.length) author.posts = authorsPosts;

      author.url = stripDomain(author.url);
    });

    return collection;
  });

  // Get all tags
  config.addCollection("tags", async function (collection) {
    collection = await api.tags
      .browse({
        include: "count.posts",
        limit: "all",
        filter: "visibility:public",
      })
      .catch((err) => {
        console.error(err);
      });

    // Get all posts with their tags attached
    const posts = await api.posts
      .browse({
        include: "tags,authors",
        limit: "all",
        filter: "visibility:public",
      })
      .catch((err) => {
        console.error(err);
      });

    // Attach posts to their respective tags
    collection.forEach(async (tag) => {
      const taggedPosts = posts.filter((post) => {
        post.url = stripDomain(post.url);
        return post.primary_tag && post.primary_tag.slug === tag.slug;
      });
      if (taggedPosts.length) tag.posts = taggedPosts;

      tag.url = stripDomain(tag.url);
    });

    return collection;
  });

  return {
    dir: {
      input: "src/site",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
