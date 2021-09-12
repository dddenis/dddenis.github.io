const dateFns = require('date-fns');

module.exports = {
  absoluteUrl: (url = '', base) => {
    return new URL(url, base).toString();
  },

  formatDate: (date, format = 'iso') => {
    if (format === 'iso') {
      return date.toISOString();
    }

    return dateFns.format(date, format);
  },

  obfuscate: (str = '') => {
    return [...str].map((char) => `&#${char.charCodeAt()};`).join('');
  },

  parseDate: (date) => {
    return new Date(date);
  },

  stripProtocol: (str = '') => {
    return str.replace(/(^\w+:|^)\/\//, '');
  },
};
