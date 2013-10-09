var fsPath = require('path'),
    urls = require('../urls'),
    handleOpts = require('../options'),
    filter = require('../prerelease_filter'),
    debug = require('debug')('mozilla-get-url:channel:prerelease'),
    FTPFilter = require('../ftp_filter');

var CHANNEL_MAPPING = {
  aurora: 'nightly/latest-mozilla-aurora',
  'mozilla-central': 'nightly/latest-mozilla-central',
  // alias for mozilla-central
  nightly: 'nightly/latest-mozilla-central'
};

/**
Channel handler for the firefox "release" channel this is not used
for b2g as we don't have a formal versioned release channel there

@param {Object} options for release (see lib/options)
@param {Function} [Error, String url].
*/
function locate(options, callback) {
  options = handleOpts(options);

  if (!CHANNEL_MAPPING[options.channel]) {
    throw new Error(
      'must pass valid channel: ' +
      Object.keys(CHANNEL_MAPPING).join(', ')
    );
  }

  // construct a base url
  var path = urls.ftpPath(
    options.product,
    CHANNEL_MAPPING[options.channel],
    '/'
  );

  debug('fetching channel', path);

  // verify it actually exists and return path
  var ftpFilter = new FTPFilter(options);

  ftpFilter.locate(path, filter, function(err, path) {
    ftpFilter.close();
    if (err) {
      return callback(err);
    }
    callback(null, urls.httpUrl(path));
  });
}

module.exports = locate;

