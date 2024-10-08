const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/css");
	eleventyConfig.addPassthroughCopy({"./src/includes/Repositorio Académico DIC - Departamento de Ingeniería Civil - FCFM - Universidad de Chile_files": "Repositorio Académico DIC - Departamento de Ingeniería Civil - FCFM - Universidad de Chile_files"});
	

	eleventyConfig.addTransform("htmlmin", function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}
		return content;
	});

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	return {
		dir: {
			input: "src",
			data: "data",
			includes: "includes",
			output: "docs",
		},
	};
};
