suite('channels/release', function() {
  var get = require('../../lib/channels/tinderbox'),
      verifyGet = require('../support/get_suite')(get);

  suite('firefox', function() {
    function opts(os) {
      return {
        product: 'firefox',
        os: os,
        branch: 'mozilla-central'
      };
    }

    verifyGet(opts('mac'), function() {
      assert(this.url.indexOf('macosx64') !== -1);
    });

    verifyGet(opts('win32'), function() {
      assert(this.url.indexOf('win32') !== -1);
    });

    verifyGet(opts('linux-x86_64'), function() {
      assert(this.url.indexOf('linux64') !== -1);
    });
  });

  suite('b2g', function() {
    function opts(os) {
      return {
        os: os,
        branch: 'mozilla-central',
        product: 'b2g'
      };
    }

    verifyGet(opts('mac'), function() {
      assert(this.url.indexOf('macosx64') !== -1);
    });

    verifyGet(opts('linux-x86_64'), function() {
      assert(this.url.indexOf('linux64') !== -1);
    });
  });
});
