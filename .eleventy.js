const { EleventyRenderPlugin } = require("@11ty/eleventy");
const getSimilarCategoriesCount = function (categoriesA, categoriesB) {
  let categoriesNamesA = categoriesA.map((category) => category.name);
  let categoriesNamesB = categoriesB.map((category) => category.name);
  return categoriesNamesA.filter((c) => categoriesNamesB.includes(c)).length;
};
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/images/");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  // Watch css files for changes
  eleventyConfig.addWatchTarget("./src/css/**/*.css");
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
  eleventyConfig.addCollection("categories", function (collectionApi) {
    let categories_set = new Set();
    let stories = collectionApi.getAll()[0].data.stories;
    stories.forEach((story) => {
      story.categories.forEach((category) => categories_set.add(category.name));
    });
    return Array.from(categories_set);
  });
  eleventyConfig.addFilter(
    "similarStories",
    function (stories, currentStoryId, categories) {
      return stories
        .filter((story) => {
          return (
            getSimilarCategoriesCount(categories, story.categories) >= 1 &&
            story.id !== currentStoryId
          );
        })
        .sort((a, b) => {
          return (
            getSimilarCategoriesCount(b.categories, categories) -
            getSimilarCategoriesCount(a.categories, categories)
          );
        });
    }
  );
  eleventyConfig.addFilter("filterByCategory", function(posts, category) {
    /*
    case matters, so let's lowercase the desired category, cat
    and we will lowercase our posts categories
    */
    category = category.toLowerCase();
    let result = posts.filter(p => {
      let p_categories = p.categories.map(c => c.name.toLowerCase());
      return p_categories.includes(category);
    });
    return result;
  });

  // Filter for limiting the number of items in array
  // https://gist.github.com/jbmoelker/9693778
  eleventyConfig.addFilter("limitTo", function (array, limit) {
    return array.slice(0, limit);
  }
  );


  return {
    dir: {
      input: "src",
    },
  };
};
