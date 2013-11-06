suite('channels/release', function() {
  var get = require('../../lib/channels/release'),
      opts = require('../../lib/options'),
      verifyGet = require('../support/get_suite')(get);

  test('will report invalid operating system', function(done) {
    get(opts({ os: 'xfoo' }), function(err) {
      assert.ok(err, 'has error');
      done();
    });
  });

  test('will report invalid lang', function(done) {
    get(opts({ os: 'win32', language: 'xfoo' }), function(err, url) {
      assert.ok(err, 'has error');
      done();
    });
  });

  // operating systems
  [
    'linux-i686',
    'linux-x86_64',
    'mac',
    'win32'
  ].forEach(function(os) {
    verifyGet(opts({ os: os }), function() {
      assert(
        this.url.indexOf(os) !== -1,
        'is for correct os: ' + this.url
      );
    });

    // latest beta
    verifyGet(opts({ os: os, branch: 'beta' }), function() {
      assert(
        this.url.indexOf(os) !== -1,
        'is for correct os: ' + this.url
      );
    });
  });

  // verify some branches
  [
    '3.0',
    '11.0',
    '18.0b2',
    '22.0'
  ].forEach(function(branch) {
    verifyGet(opts({ os: 'mac', branch: branch }), function() {
      assert(
        this.url.indexOf(branch) !== -1,
        'can request branch:' + this.url
      );
    });
  });

  // verify some languages
  [
    'fr',
    'es-ES',
    'en-US'
  ].forEach(function(lang) {
    verifyGet(opts({ os: 'mac', language: lang }), function() {
      assert(
        this.url.indexOf(lang) !== -1,
        'can request lang:' + this.url
      );
    });
  });

});
