module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  // Watch css files for changes
  eleventyConfig.addWatchTarget("./src/css/**/*.css");
  // eleventyConfig.addPassthroughCopy("./src/scripts");
  
  return {
    dir: {
      input: "src",
    },
  };
};
