suite('channels/release', function() {
  var get = require('../../lib/channels/try'),
      opts = require('../../lib/options'),
      verifyGet = require('../support/get_suite')(get);

  suite.skip('fabrice try', function() {
    function opts(os) {
      return {
        product: 'b2g',
        branch: 'fdesre@mozilla.com-edae0a5285ac',
        os: os
      };
    }

    verifyGet(opts('linux-x86_64'));
  });
});
