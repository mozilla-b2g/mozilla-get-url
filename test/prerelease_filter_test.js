suite('filter', function() {
  function fixture(path) {
    return require('./fixtures/' + path + '.json');
  }

  var subject = require('../lib/prerelease_filter');

  suite('multi version', function() {
    var input = fixture('multi_version_b2g');

    test('os: linux-x86_64', function() {
      // in pre-release we have multiple mac types
      var result = subject({ product: 'b2g', os: 'linux-x86_64' }, input);
      assert.equal(
        result,
        'b2g-27.0a1.multi.linux-x86_64.tar.bz2'
      );
    });

    test('os: linux-i686', function() {
      // in pre-release we have multiple mac types
      var result = subject({ product: 'b2g', os: 'linux-i686' }, input);
      assert.equal(
        result,
        'b2g-27.0a1.multi.linux-i686.tar.bz2'
      );
    });

    test('os: mac', function() {
      var input = fixture('mozilla_central_b2g');
      // in pre-release we have multiple mac types
      var result = subject({ product: 'b2g', os: 'mac' }, input);
      assert.equal(
        result,
        'b2g-27.0a1.multi.mac64.dmg'
      );
    });
  });

  suite('b2g mozilla-central', function() {
    var input = fixture('mozilla_central_b2g');

    test('os: linux-x86_64', function() {
      // in pre-release we have multiple mac types
      var result = subject({ product: 'b2g', os: 'linux-x86_64' }, input);
      assert.equal(
        result,
        'b2g-27.0a1.multi.linux-x86_64.tar.bz2'
      );
    });

    test('os: linux-i686', function() {
      // in pre-release we have multiple mac types
      var result = subject({ product: 'b2g', os: 'linux-i686' }, input);
      assert.equal(
        result,
        'b2g-27.0a1.multi.linux-i686.tar.bz2'
      );
    });

    test('os: mac', function() {
      var input = fixture('mozilla_central_b2g');
      // in pre-release we have multiple mac types
      var result = subject({ product: 'b2g', os: 'mac' }, input);
      assert.equal(
        result,
        'b2g-27.0a1.multi.mac64.dmg'
      );
    });
  });

});
