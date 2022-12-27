module.exports = function (stories, category) {
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
  }