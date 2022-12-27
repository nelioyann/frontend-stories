module.exports = function (collectionApi) {
  let categories_set = new Set();
  let stories = collectionApi.getAll()[0].data.stories;
  stories.forEach((story) => {
    categories_set.add(story.category.name);
  });
  return Array.from(categories_set);
};
