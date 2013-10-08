var urls = require('../../lib/urls'),
    url = require('url'),
    request = require('request');

module.exports = function suiteHelper(subject) {
  return function(options, testFn) {
    var name = JSON.stringify(options);
    suite(name, function() {
      setup(function(done) {
        subject(options, function(err, url) {
          if (err) return done(err);
          this.rawURL = url;
          this.url = url.
            replace(urls.HTTP_URL, '').
            replace(urls.PUB_PREFIX, '').
            replace('//', '');

          done();
        }.bind(this));
      });

      // user provided fn
      test('url', testFn);

      // verify the url actually exists
      test('exists on http site', function(done) {
        request.head(this.rawURL, function(err, res) {
          assert(
            res.statusCode > 199 && res.statusCode < 300,
            'file exists on server http status: ' + res.statusCode
          );
          done(err);
        });
      });
    });
  };
};
