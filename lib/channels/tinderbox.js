var fsPath = require('path'),
    urls = require('../urls'),
    debug = require('debug')('mozilla-get-url:release:tinderbox'),
    handleOpts = require('../options'),
    buildFilter = require('../tinderbox_build_filter'),
    timeFilter = require('../tinderbox_release_filter'),
    prereleaseFilter = require('../prerelease_filter'),
    FTPFilter = require('../ftp_filter');

/**
Channel for any product that has a tinderbox channel.

@param {Object} options see lib/options.js.
@param {Function} [Error, String url].
*/
function locate(options, callback) {
  options = handleOpts(options);

  // construct a base url
  var buildsPath = urls.ftpPath(
    options.product,
    'tinderbox-builds',
    '/'
  );

  var ftpHelper = new FTPFilter(options);

  // list of builds for a set of times
  var buildList;

  function fireCallback() {
    ftpHelper.close();
    callback.apply(this, arguments);
  }

  /**
  @param {String} path ftp path to build like:
    b2g/tinderbox-builds/mozilla-central-macosx64_gecko/
  */
  function locateRecentBuild(err, path) {
    if (err) return fireCallback(new Error('could not find a recent release'));
    debug('locating recent build', path);
    ftpHelper.locate(path, timeFilter, locateBuildBinary);
  }

  function locateBuildBinary(err, path) {
    if (err) return fireCallback(err);

    debug('locating binary', path);
    ftpHelper.locate(path, prereleaseFilter, function(err, path) {
      if (err) return fireCallback(new Error('could not find a binary'));
      fireCallback(null, urls.httpUrl(path));
    });
  }

  debug('locating tinderbox builds', buildsPath);
  ftpHelper.locate(buildsPath, buildFilter, locateRecentBuild);
}

module.exports = locate;
