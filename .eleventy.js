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
