suite('channels/release', function() {
  var get = require('../../lib/channels/tinderbox'),
      verifyGet = require('../support/get_suite')(get);

  suite('firefox', function() {
    function opts(os) {
      return {
        os: os,
        tinderbox: 'mozilla-central'
      };
    }

    verifyGet({ os: 'mac', tinderbox: 'mozilla-central' }, function() {
      assert(this.url.indexOf('macosx64') !== -1);
    });

    verifyGet({ os: 'win32', tinderbox: 'mozilla-central' }, function() {
      assert(this.url.indexOf('win32') !== -1);
    });

    verifyGet({ os: 'linux-x86_64', tinderbox: 'mozilla-central' }, function() {
      assert(this.url.indexOf('linux64') !== -1);
    });
  });

  suite('b2g', function() {
    function opts(os) {
      return {
        os: os,
        tinderbox: 'mozilla-central',
        product: 'b2g'
      };
    }

    verifyGet({ os: 'mac', tinderbox: 'mozilla-central' }, function() {
      assert(this.url.indexOf('macosx64') !== -1);
    });

    verifyGet({ os: 'win32', tinderbox: 'mozilla-central' }, function() {
      assert(this.url.indexOf('win32') !== -1);
    });

    verifyGet({ os: 'linux-x86_64', tinderbox: 'mozilla-central' }, function() {
      assert(this.url.indexOf('linux64') !== -1);
    });
  });
});
