var fsPath = require('path'),
    urls = require('../urls'),
    handleOpts = require('../options');

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
  options = handleOpts(options);

  // construct a base url
  var path = urls.ftpPath(
    options.product,
    'releases',
    options.version,
    options.os,
    options.language,
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

    // close the ftp connection
    ftp.raw.quit();
  });
}

module.exports = locate;
