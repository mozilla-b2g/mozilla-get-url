suite('channels/pre_release', function() {
  var get = require('../../lib/channels/prerelease'),
      verifyGet = require('../support/get_suite')(get),
      forEachOS = require('../support/for_each_os');

  var BRANCHES = ['aurora', 'mozilla-central', 'nightly'];

  // firefox operating systems
  BRANCHES.forEach(function(channel) {
    forEachOS(function(os) {
      verifyGet({ channel: channel, os: os }, function() {
        assert.ok(this.url.indexOf('firefox') !== -1, 'is firefox:' + this.url);
        assert.ok(this.url.indexOf(os) !== -1, 'has os: ' + this.url);
      });
    });
  });

  // b2g operating systems
  BRANCHES.forEach(function(channel) {
    ['mac', 'linux-i686', 'linux-x86_64'].forEach(function(os) {
      verifyGet({ channel: channel, os: os, product: 'b2g' }, function() {
        assert.ok(this.url.indexOf('b2g') !== -1, 'is firefox:' + this.url);
        assert.ok(this.url.indexOf(os) !== -1, 'has os: ' + this.url);
      });
    });
  });
});
