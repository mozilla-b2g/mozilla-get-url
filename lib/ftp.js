var FTP = require('jsftp'),
    urls = require('./urls');

/**
Internal wrapper around jsftp
*/
function create() {
  return new FTP({
    host: urls.FTP_HOST
  });
}

module.exports.create = create;
