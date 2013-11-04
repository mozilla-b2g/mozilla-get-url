suite('channels/pre_release', function() {
  var get = require('../../lib/channels/prerelease'),
      verifyGet = require('../support/get_suite')(get),
      forEachOS = require('../support/for_each_os');

  var BRANCHES = ['aurora', 'mozilla-central', 'nightly', ''];

  // firefox operating systems
  BRANCHES.forEach(function(branch) {
    forEachOS(function(os) {
      var options = {
        branch: branch,
        os: os,
        channel: 'prerelease',
        product: 'firefox'
      };

      verifyGet(options, function() {
        assert.ok(this.url.indexOf('firefox') !== -1, 'is firefox:' + this.url);
        assert.ok(this.url.indexOf(os) !== -1, 'has os: ' + this.url);
      });
    });
  });

  var B2G_BRANCHES = BRANCHES.concat([
    'nightly/latest-mozilla-b2g26_v1_2/'
  ]);

  // b2g operating systems
  B2G_BRANCHES.forEach(function(branch) {
    ['mac', 'linux-i686', 'linux-x86_64'].forEach(function(os) {
      var options = {
         branch: branch,
         os: os,
         product: 'b2g',
         channel: 'prerelease'
      };

      verifyGet(options, function() {
        assert.ok(this.url.indexOf('b2g') !== -1, 'is firefox:' + this.url);
        assert.ok(this.url.indexOf(os) !== -1, 'has os: ' + this.url);
      });
    });
  });
});
