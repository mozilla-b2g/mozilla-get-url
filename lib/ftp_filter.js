var FTP = require('jsftp'),
    urls = require('./urls'),
    debug = require('debug')('mozilla-get-url:ftp_filter');

/**
Internal wrapper around jsftp
*/
function ftpClient() {
  return new FTP({
    host: urls.FTP_HOST
  });
}

function FTPFilter(options) {
  this.ftp = ftpClient();
  this.options = options;
}

FTPFilter.prototype = {
  locate: function(path, filter, callback) {
    debug('ftp', 'ls', path);
    this.ftp.ls(path, function(err, list) {
      if (process.env.DEBUG) {
        debug('ftp', 'files', list.map(function(item) { item.name }));
      }

      if (err) {
        return callback(err);
      }

      // apply the filter
      var pick = filter(this.options, list);
      if (!pick) {
        return callback(
          new Error('no suitable build found in path: ' + path)
        );
      }

      callback(null, require('path').join(path, String(pick)));
    }.bind(this));
  },

  close: function() {
    this.ftp.raw.quit();
  }
};

module.exports = FTPFilter;
