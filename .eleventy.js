const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");

const qrCode = require("qrcode");
const getSimilarCategoriesCount = function (categoriesA, categoriesB) {
  let categoriesNamesA = categoriesA.map((category) => category.name);
  let categoriesNamesB = categoriesB.map((category) => category.name);
  return categoriesNamesA.filter((c) => categoriesNamesB.includes(c)).length;
};
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  // Watch css files for changes
  eleventyConfig.addWatchTarget("./src/css/**/*.css");
  // Create collection from _data/customData.js
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(emojiReadTime);
  eleventyConfig.addCollection("stories", (collection) => {
    const slug = eleventyConfig.getFilter("slugify");
    return collection.getAll()[0].data.stories.map((story) => {
    let excerpt = story.description.split("\n\n")[0];
      return {
        ...story,
        slug: `stories/${slug(story.slugs)}`,
        excerpt
      };
    });
  });
  eleventyConfig.addCollection("categories", function (collectionApi) {
    let categories_set = new Set();
    let stories = collectionApi.getAll()[0].data.stories;
    stories.forEach((story) => {
      categories_set.add(story.category.name)
    });
    return Array.from(categories_set);
  });
  eleventyConfig.addCollection("categoriesAndAll", function (collectionApi) {
    let categories_set = new Set();
    categories_set.add("All");
    let stories = collectionApi.getAll()[0].data.stories;
    stories.forEach((story) => {
      categories_set.add(story.category.name);
    });
    return Array.from(categories_set);
  });
  eleventyConfig.addFilter(
    "similarStories",
    function (stories, currentStoryId, category) {
      return stories
        .filter((story) => {
          return (
            story.category.name === category &&
            story.id !== currentStoryId
          );
        })
        
    }
  );
  eleventyConfig.addFilter("filterByCategory", function (stories, category) {
    /*
    case matters, so let's lowercase the desired category, cat
    and we will lowercase our posts categories
    */
    category = category.toLowerCase();
    if (category === "all") {
      return stories;
    }
    let result = stories.filter((story) => {
      let story_category = story.category.name.toLowerCase();
      return story_category === category;
    });
    return result;
  });

  // Filter for limiting the number of items in array
  // https://gist.github.com/jbmoelker/9693778
  eleventyConfig.addFilter("limitTo", function (array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addNunjucksAsyncFilter(
    "qrcode",
    async function (value, callback) {
      let result = await qrCode.toString(value, { type: "svg", margin: 4 });
      callback(null, result);
    }
  );
  // Convert ISO date to readable date of day month and year
  eleventyConfig.addFilter("readableDate", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  });


  

  // DEfault return
  return {
    dir: {
      input: "src",
    },
  };
};
