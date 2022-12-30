const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const pluginRss = require("@11ty/eleventy-plugin-rss");


// FILTERS
const limit = require("./src/_11ty/filters/limit.js");
const readableDate = require("./src/_11ty/filters/readableDate.js");
const buildRFC822Date = require("./src/_11ty/filters/buildRFC822Date.js");
const qrcode = require("./src/_11ty/filters/qrcode.js");
const similarStories = require("./src/_11ty/filters/similarStories.js");
const splitLines = require("./src/_11ty/filters/splitLines.js");
const filterByCategory = require("./src/_11ty/filters/filterByCategory.js");
// COLLECTIONS
const categories = require("./src/_11ty/collections/categories.js");
const stories = require("./src/_11ty/collections/stories.js");
const categoriesAndAll = require("./src/_11ty/collections/categoriesAndAll.js");
const generateSocialPreviewImages = require("./src/_11ty/utils/generateSocialPreviewImages.js");
const minifyHtml = require("./src/_11ty/utils/minifyHtml.js");

module.exports = function (eleventyConfig) {
  // Passthrough Copy
  // eleventyConfig.addPassthroughCopy("./src/assets/styles/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets/images/");
  eleventyConfig.addPassthroughCopy({"./src/static/":"/"});

  // Watch Targets
  eleventyConfig.addWatchTarget("./src/assets/styles/**/*.css");

  // PLUGINS
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(emojiReadTime);
  eleventyConfig.addPlugin(pluginRss);

  // COLLECTIONS
  eleventyConfig.addCollection("stories", stories);
  eleventyConfig.addCollection("categories", categories);
  eleventyConfig.addCollection("categoriesAndAll", categoriesAndAll);

  // FILTERS
  eleventyConfig.addFilter("similarStories", similarStories);
  eleventyConfig.addFilter("filterByCategory", filterByCategory);
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("splitlines", splitLines);
  eleventyConfig.addNunjucksAsyncFilter("qrcode", qrcode);
  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("buildRFC822Date", buildRFC822Date);

  eleventyConfig.addTransform("htmlmin", minifyHtml);
  eleventyConfig.on("eleventy.after", generateSocialPreviewImages);

  // Default return
  return {
    dir: {
      input: "src",
    },
  };
};
