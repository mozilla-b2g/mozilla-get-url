function detectChannel(options) {
  options = options || {};

  // pre-release
  if (options.channel) {
    // we special case beta... its actually in the release channel but I think
    // of it as part of aurora and nightly
    if (options.channel === 'beta') {
      return require('./channels/release');
    }
    return require('./channels/prerelease');
  }

  // tinderbox
  if (options.tinderbox) {
    return require('./channels/tinderbox');
  }

  // release channel
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
