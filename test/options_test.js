suite('options', function() {
  var subject = require('../lib/options');

  test('throws on no options', function() {
    assert.throws(function() {
      subject();
    }, /option/);
  });

  test('no os', function() {
    assert.throws(function() {
      subject({});
    }, /os/);
  });

  test('defaults', function() {
    var result = subject({ os: 'mac' });

    assert.deepEqual(
      result,
      {
        os: 'mac',
        product: 'firefox',
        channel: 'release',
        branch: 'latest',
        language: 'en-US'
      }
    );
  });
});
