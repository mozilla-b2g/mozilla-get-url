var debug = require('debug')('mozilla-get-url:locate');

var RELEASE_CHANNELS = ['beta', 'release'];

function detectChannel(options) {
  options = options || {};

  // pre-release
  if (options.channel) {
    // we special case beta... its actually in the release channel but I think
    // of it as part of aurora and nightly
    if (RELEASE_CHANNELS.indexOf(options.channel) !== -1) {
      debug('using release channel');
      return require('./channels/release');
    }
    debug('using prerelease channel');
    return require('./channels/prerelease');
  }

  // tinderbox
  if (options.tinderbox) {
    debug('using tinderbox channel');
    return require('./channels/tinderbox');
  }

  // release channel
  debug('using release channel');
  return require('./channels/release');
}

/**
Top level channel manager can detect which
channel should be used based on the given options.
*/
function locate(options, callback) {
  var channel = detectChannel(options);
  channel(options, callback);
}

module.exports = locate;
