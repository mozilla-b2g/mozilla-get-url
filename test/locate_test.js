suite('channels/release', function() {
  var get = require('../'),
      verifyGet = require('./support/get_suite')(get);

  suite('release channel', function() {
    // latest
    verifyGet({ os: 'mac' }, function() {
      assert(this.url.indexOf('latest') !== -1, 'latest');
    });

    // specific release
    verifyGet({ os: 'mac', branch: '17.0' }, function() {
      assert(this.url.indexOf('17') !== -1);
    });

    // explicit release channel
    verifyGet({ os: 'mac', channel: 'release' }, function() {
      assert(this.url.indexOf('releases') !== -1, 'uses release channel');
    });
  });

  suite('try', function() {
    var options = {
      os: 'linux-x86_64',
      channel: 'try',
      branch: 'fdesre@mozilla.com-edae0a5285ac'
    };

    verifyGet(options, function() {
      assert.ok(this.url.indexOf('try') !== -1);
    });
  });

  suite('pre-release channel', function() {
    var options =
      { os: 'mac', product: 'b2g', channel: 'prerelease', branch: 'aurora' };

    verifyGet(options, function() {
      assert(this.url.indexOf('aurora'));
    });
  });

  suite('tinderbox', function() {
    function opts(product) {
      return {
        os: 'mac',
        product: product,
        branch: 'mozilla-central',
        channel: 'tinderbox'
      };
    }

    verifyGet(opts('firefox'), function() {
      assert(this.url.indexOf('firefox/tinderbox') !== -1);
    });

    verifyGet(opts('b2g'), function() {
      assert(this.url.indexOf('b2g/tinderbox') !== -1);
    });
  });
});

