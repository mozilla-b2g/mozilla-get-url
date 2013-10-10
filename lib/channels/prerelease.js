var fsPath = require('path'),
    urls = require('../urls'),
    handleOpts = require('../options'),
    filter = require('../prerelease_filter'),
    debug = require('debug')('mozilla-get-url:channel:prerelease'),
    FTPFilter = require('../ftp_filter');

var BRANCH_MAPPING = {
  aurora: 'nightly/latest-mozilla-aurora',
  'mozilla-central': 'nightly/latest-mozilla-central',
  // alias for mozilla-central
  nightly: 'nightly/latest-mozilla-central'
};

/**
Channel handler for the firefox "release" branch this is not used
for b2g as we don't have a formal versioned release channel there

@param {Object} options for release (see lib/options)
@param {Function} [Error, String url].
*/
function locate(options, callback) {
  if (!BRANCH_MAPPING[options.branch]) {
    throw new Error(
      'must pass valid branch: ' +
      Object.keys(BRANCH_MAPPING).join(', ')
    );
  }

  // construct a base url
  var path = urls.ftpPath(
    options.product,
    BRANCH_MAPPING[options.branch],
    '/'
  );

  debug('fetching branch', path);

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

