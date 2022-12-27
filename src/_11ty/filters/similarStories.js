module.exports = function (stories, currentStoryId, category) {
    return stories.filter((story) => {
      return story.category.name === category && story.id !== currentStoryId;
    });
  }