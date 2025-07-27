module.exports = function(eleventyConfig) {
  // Filtro personalizado para formatear fechas
  eleventyConfig.addFilter("formatDate", function(date) {
    return new Date(date).toISOString().split('T')[0]; // Formato YYYY-MM-DD
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
