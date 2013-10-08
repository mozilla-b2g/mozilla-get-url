suite('channels/release', function() {
  var get = require('../../lib/channels/release'),
      verifyGet = require('../support/get_suite')(get);

  test('no os', function() {
    assert.throws(function() {
      get({}, function() {});
    }, /os/);
  });


  [
    'linux-i686',
    'linux-x86_64',
    'mac'
  ].forEach(function(os) {
    verifyGet({ os: os }, function() {
      assert.ok(
        this.url.indexOf(os) !== -1,
        'is for correct os: ' + this.url
      );
    });
  });

});
