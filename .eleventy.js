const tinysvg = require('@sardine/eleventy-plugin-tinysvg');
const path = require('path');
const utils = require('./src/utils');

module.exports = function (config) {
  config.addPassthroughCopy('./src/assets');
  config.addPassthroughCopy({
    './src/favicon': '.',
  });

  config.addWatchTarget('./dist/styles.css');
  config.addWatchTarget('./src/styles');

  config.addPlugin(tinysvg, {
    baseUrl: path.join(require.resolve('@fortawesome/fontawesome-free'), '../../svgs'),
  });

  Object.entries(utils.filters.sync).forEach(([name, filter]) => {
    config.addFilter(name, filter);
  });

  config.setDataDeepMerge(true);

  config.addCollection('resumeEducation', (collection) => {
    return collection
      .getFilteredByGlob('./src/pages/resume/content/education/*.md')
      .sort((a, b) => new Date(b.data.start) - new Date(a.data.start));
  });

  config.addCollection('resumeExperience', (collection) => {
    return collection
      .getFilteredByGlob('./src/pages/resume/content/experience/*.md')
      .sort((a, b) => new Date(b.data.start) - new Date(a.data.start));
  });

  config.addCollection('resumeSkills', (collection) => {
    return collection
      .getFilteredByGlob('./src/pages/resume/content/skills/*.md')
      .sort((a, b) => a.fileSlug.localeCompare(b.fileSlug));
  });

  return {
    dir: {
      input: './src',
      output: './dist',

      data: 'data',
      includes: 'includes',
      layouts: 'layouts',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
