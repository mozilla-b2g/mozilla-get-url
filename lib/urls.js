var fsPath = require('path'),
    url = require('url');

var PREFIX = 'pub/mozilla.org';

/**
where we serve ftp content (used instead of scraping html)
*/
var FTP_HOST = 'ftp.mozilla.org';

function httpUrl(host, uri) {
  return ["http:/", (host || FTP_HOST), uri ].join('/');
}

function ftpPath() {
  var parts = [PREFIX].concat(Array.prototype.slice.call(arguments));
  return fsPath.join.apply(fsPath, parts);
}

module.exports = {
  FTP_HOST: FTP_HOST,
  PUB_PREFIX: PREFIX,
  httpUrl: httpUrl,
  ftpPath: ftpPath
};
