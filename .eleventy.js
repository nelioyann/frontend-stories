module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  // Watch css files for changes
  eleventyConfig.addWatchTarget("./src/css/**/*.css");
  // eleventyConfig.addPassthroughCopy("./src/scripts");
  // Create collection from _data/customData.js

  eleventyConfig.addCollection("stories", (collection) => {
    return collection.getAll()[0].data.stories;
  });
  return {
    dir: {
      input: "src",
    },
  };
};
