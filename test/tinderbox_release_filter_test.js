suite('tinderbox_release_filter', function() {
  var subject = require('../lib/tinderbox_release_filter');
  var fixture = require('./fixtures/tinderbox_releases.json');
  var mostRecent = '1381323389';

  test('filters to highest number (most recent build)', function() {
    assert.ok(
      subject({}, fixture).indexOf(mostRecent) !== -1,
      'contains most recent build'
    );
  });
});
