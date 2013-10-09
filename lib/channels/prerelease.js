var fsPath = require('path'),
    urls = require('../urls'),
    handleOpts = require('../options'),
    filter = require('../prerelease_filter'),
    debug = require('debug')('mozilla-get-url:channel:prerelease');

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
  var ftp = require('../ftp').create();

  ftp.ls(path, function(err, list) {
    if (err) return callback(err);

    if (!list || !list.length) {
      callback(new Error('could not locate build in path: ' + path));
      return;
    }

    var choice = filter(options, list);

    if (!choice) {
      callback(new Error('found path to builds but no suitable match found'));
      return;
    }

    callback(null, urls.httpUrl(path + choice));

    // close the ftp connection
    ftp.raw.quit();
  });
}

module.exports = locate;

