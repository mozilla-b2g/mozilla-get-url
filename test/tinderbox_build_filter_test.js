suite('tinderbox_build_filter', function() {
  var subject = require('../lib/tinderbox_build_filter');

  suite('product: b2g', function() {
    var fixture = require('./fixtures/tinderbox_b2g.json');
    function opts(os) {
      return {
        product: 'b2g',
        branch: 'mozilla-central',
        os: os
      };
    }

    test('mozilla-central mac', function() {
      assert.equal(
        subject(opts('mac'), fixture),
        'mozilla-central-macosx64_gecko'
      );
    });

    test('mozilla-central win32', function() {
      assert.equal(
        subject(opts('win32'), fixture),
        'mozilla-central-win32_gecko'
      );
    });

    test('mozilla-central linux-i686', function() {
      assert.equal(
        subject(opts('linux-i686'), fixture),
        'mozilla-central-linux32_gecko'
      );
    });

    test('mozilla-central linux-x86_64', function() {
      assert.equal(
        subject(opts('linux-x86_64'), fixture),
        'mozilla-central-linux64_gecko'
      );
    });
  });

  suite('product: firefox', function() {
    var fixture = require('./fixtures/tinderbox_firefox.json');
    function opts(os) {
      return {
        branch: 'mozilla-central',
        os: os
      };
    }

    test('mozilla-central mac', function() {
      assert.equal(
        subject(opts('mac'), fixture),
        'mozilla-central-macosx64'
      );
    });

    test('mozilla-central win32', function() {
      assert.equal(
        subject(opts('win32'), fixture),
        'mozilla-central-win32'
      );
    });

    test('mozilla-central linux-x86_64', function() {
      assert.equal(
        subject(opts('linux-x86_64'), fixture),
        'mozilla-central-linux64'
      );
    });
  });
});
