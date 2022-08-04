const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/references");
  eleventyConfig.addPassthroughCopy("./src/scripts");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("copyrightDate", (dateObj) => {
    return DateTime.now().toFormat("yyyy");
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
