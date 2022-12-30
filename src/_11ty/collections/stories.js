const slug = require("slugify");

module.exports = function(collection) {
    return collection.getAll()[0].data.stories.map((story) => {
      let excerpt = story.description.split("\n\n")[0];
      let date = new Date(story.edited).toLocaleDateString("fr-FR").split("/").reverse().join("-");
      return {
        ...story,
        slug: `findings/${slug(story.slugs)}`,
        excerpt,
        date
      };
    });
  }