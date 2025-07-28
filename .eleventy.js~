module.exports = function(eleventyConfig) {
  // Filtro personalizado para formatear fechas
  eleventyConfig.addFilter("formatDate", function(date) {
    return new Date(date).toISOString().split('T')[0]; // Formato YYYY-MM-DD
  });
  // Copia la carpeta de imágenes al directorio de salida
  eleventyConfig.addPassthroughCopy("_includes/assets/images");

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
