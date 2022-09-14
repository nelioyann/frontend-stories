const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const qrCode = require("qrcode");
const fs = require("fs");
const Image = require("@11ty/eleventy-img");

// add a leading 0 to a number if it is only one digit
function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}
const getSimilarCategoriesCount = function (categoriesA, categoriesB) {
  let categoriesNamesA = categoriesA.map((category) => category.name);
  let categoriesNamesB = categoriesB.map((category) => category.name);
  return categoriesNamesA.filter((c) => categoriesNamesB.includes(c)).length;
};

const emojiReadTimeOptions = {
  emoji: "📕",
  showEmoji: false,
  label: "minutes read",
  wpm: 300,
  bucketSize: 3,
};
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  // eleventyConfig.addPassthroughCopy("./src/sw.js");
  // Watch css files for changes
  eleventyConfig.addWatchTarget("./src/css/**/*.css");
  // Create collection from _data/customData.js
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(emojiReadTime, emojiReadTimeOptions);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addCollection("stories", (collection) => {
    const slug = eleventyConfig.getFilter("slugify");
    return collection.getAll()[0].data.stories.map((story) => {
      let excerpt = story.description.split("\n\n")[0];
      let date = new Date(story.edited).toLocaleDateString("fr-FR").split("/").reverse().join("-");
      return {
        ...story,
        slug: `stories/${slug(story.slugs)}`,
        excerpt,
        date
      };
    });
  });
  eleventyConfig.addCollection("categories", function (collectionApi) {
    let categories_set = new Set();
    let stories = collectionApi.getAll()[0].data.stories;
    stories.forEach((story) => {
      categories_set.add(story.category.name);
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
      return stories.filter((story) => {
        return story.category.name === category && story.id !== currentStoryId;
      });
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
  eleventyConfig.addFilter("splitlines", function (input) {
    const parts = input.split(" ");
    const lines = parts.reduce(function (prev, current) {
      if (!prev.length) {
        return [current];
      }

      let lastOne = prev[prev.length - 1];

      if (lastOne.length + current.length > 19) {
        return [...prev, current];
      }

      prev[prev.length - 1] = lastOne + " " + current;

      return prev;
    }, []);

    return lines;
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
  eleventyConfig.addFilter("buildRFC822Date", function (dateString) {
    const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthStrings = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const timeStamp = Date.parse(dateString);
    const date = new Date(timeStamp);

    const day = dayStrings[date.getDay()];
    const dayNumber = addLeadingZero(date.getDate());
    const month = monthStrings[date.getMonth()];
    const year = date.getFullYear();
    const time = `${addLeadingZero(date.getHours())}:${addLeadingZero(
      date.getMinutes()
    )}:00`;
    // const timezone = date.getTimezoneOffset() === 0 ? "GMT" : "BST";
    const timezone = "GMT";

    //Wed, 02 Oct 2002 13:00:00 GMT
    return `${day}, ${dayNumber} ${month} ${year} ${time} ${timezone}`;
  });

  eleventyConfig.on("afterBuild", () => {
    const socialPreviewImagesDir = "_site/images/og-images/";
    fs.readdir(socialPreviewImagesDir, function (err, files) {
      if (files.length > 0) {
        files.forEach(function (filename) {
          if (filename.endsWith(".svg")) {
            let imageUrl = socialPreviewImagesDir + filename;
            Image(imageUrl, {
              formats: ["jpeg"],
              outputDir: "./" + socialPreviewImagesDir,
              filenameFormat: function (id, src, width, format, options) {
                let outputFilename = filename.substring(0, filename.length - 4);
                return `${outputFilename}.${format}`;
              },
            });
          }
        });
      }
    });
  });

  // DEfault return
  return {
    dir: {
      input: "src",
    },
  };
};
