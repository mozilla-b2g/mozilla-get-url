suite('channels/release', function() {
  var get = require('../../lib/channels/release'),
      verifyGet = require('../support/get_suite')(get);

  test('no os', function() {
    assert.throws(function() {
      get({}, function() {});
    }, /os/);
  });

  // operating systems
  [
    'linux-i686',
    'linux-x86_64',
    'mac',
    'win32'
  ].forEach(function(os) {
    verifyGet({ os: os }, function() {
      assert(
        this.url.indexOf(os) !== -1,
        'is for correct os: ' + this.url
      );
    });
  });

  // verify some versions
  [
    '3.0',
    '11.0',
    '18.0b2',
    '22.0'
  ].forEach(function(version) {
    verifyGet({ os: 'mac', version: version }, function() {
      assert(
        this.url.indexOf(version) !== -1,
        'can request version:' + this.url
      );
    });
  });

  // verify some languages
  [
    'fr',
    'es-ES',
    'en-US'
  ].forEach(function(lang) {
    verifyGet({ os: 'mac', language: lang }, function() {
      assert(
        this.url.indexOf(lang) !== -1,
        'can request lang:' + this.url
      );
    });
  });

});
