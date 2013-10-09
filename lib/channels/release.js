var fsPath = require('path'),
    urls = require('../urls'),
    handleOpts = require('../options'),
    FTPFilter = require('../ftp_filter');

function filter(options, list) {
  if (!list.length) return null;
  return list[0].name;
}

/**
Channel handler for the firefox "release" channel this is not used
for b2g as we don't have a formal versioned release channel there

@param {Object} options see lib/options.js.
@param {Function} [Error, String url].
*/
function locate(options, callback) {
  options = handleOpts(options);

  // special case beta (sorry world!)
  if (options.version === 'beta') {
    // we copy in handleOpts so its safe to do this.
    options.version = 'latest-beta';
  }

  // construct a base url
  var path = urls.ftpPath(
    options.product,
    'releases',
    options.version,
    options.os,
    options.language,
    '/'
  );

  var ftpFilter = new FTPFilter(options);

  ftpFilter.locate(path, filter, function(err, path) {
    ftpFilter.close();
    if (err) return callback(err);
    callback(null, urls.httpUrl(path));
  });
}

module.exports = locate;
