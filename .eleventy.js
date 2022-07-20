const { EleventyRenderPlugin } = require("@11ty/eleventy");
const getSimilarCategoriesCount = function(categoriesA, categoriesB) {
  let categoriesNamesA = categoriesA.map((category) => category.name);
  let categoriesNamesB = categoriesB.map((category) => category.name);
  return categoriesNamesA.filter(c => categoriesNamesB.includes(c)).length;
}
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  // Watch css files for changes
  eleventyConfig.addWatchTarget("./src/css/**/*.css");
  // eleventyConfig.addPassthroughCopy("./src/scripts");
  // Create collection from _data/customData.js
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addCollection("stories", (collection) => {
    // const slug = eleventyConfig.getFilter("slugify");
    return collection.getAll()[0].data.stories;
    // .map((story) => {
    //   return {
    //     ...story,
    //     slug: `stories/${slug(story.name)}`,
    //   };
    // });
  });

  eleventyConfig.addFilter("similarStories", function(stories, currentStoryId, categories){
    return stories.filter((story) => {
      return getSimilarCategoriesCount(categories, story.categories) >= 1 && story.id !== currentStoryId;
    }).sort((a,b) => {
      return getSimilarCategoriesCount(b.categories, categories) - getSimilarCategoriesCount(a.categories, categories);
    });
  });

  return {
    dir: {
      input: "src",
    },
  };
};
