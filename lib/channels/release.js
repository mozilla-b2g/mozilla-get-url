var fsPath = require('path'),
    urls = require('../urls');

/**
Channel handler for the firefox "release" channel this is not used
for b2g as we don't have a formal versioned release channel there

@param {Object} options for release
@param {String} options.os for firefox release.
@param {String} [options.product='firefox']
@param {String} [options.version="latest"] for release
@param {String} [options.language="en-US"] for firefox release.
@param {Function} [Error, String url].
*/
function locate(options, callback) {
  if (typeof options !== 'object')
    throw new Error('must pass options');

  if (!options.os)
    throw new Error('must provide options.os');

  var product = options.product || 'firefox';
  var version = options.version || 'latest';
  var language = options.language || 'en-US';

  // construct a base url
  var path = urls.ftpPath(
    product,
    'releases',
    version,
    options.os,
    language,
    '/'
  );

  // verify it actually exists and return path
  var ftp = require('../ftp').create();

  ftp.ls(path, function(err, list) {
    if (err) return callback(err);

    if (!list || !list.length) {
      callback(new Error('could not locate build in path: ' + path));
      return;
    }

    callback(null, urls.httpUrl(path + list[0].name));
  });
}

module.exports = locate;
