suite('tinderbox_build_filter', function() {
  var fixture = require('./fixtures/tinderbox_b2g.json'),
      subject = require('../lib/tinderbox_build_filter');

  test('mozilla-central mac', function() {
    var options = { tinderbox: 'mozilla-central', os: 'mac' };
    assert.equal(
      subject(options, fixture),
      'mozilla-central-macosx64_gecko'
    );
  });

  test('mozilla-central win32', function() {
    var options = { tinderbox: 'mozilla-central', os: 'win32' };
    assert.equal(
      subject(options, fixture),
      'mozilla-central-win32_gecko'
    );
  });

  test('mozilla-central linux-i686', function() {
    var options = { tinderbox: 'mozilla-central', os: 'linux-i686' };
    assert.equal(
      subject(options, fixture),
      'mozilla-central-linux32_gecko'
    );
  });

  test('mozilla-central linux-x86_64', function() {
    var options = { tinderbox: 'mozilla-central', os: 'linux-x86_64' };
    assert.equal(
      subject(options, fixture),
      'mozilla-central-linux64_gecko'
    );
  });

  // sanity check for inbound
  test('mozilla-inbound linux-i686', function() {
    var options = { tinderbox: 'mozilla-inbound', os: 'linux-i686' };
    assert.equal(
      subject(options, fixture),
      'mozilla-inbound-linux32_gecko'
    );
  });
});
