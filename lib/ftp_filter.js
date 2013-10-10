var FTP = require('jsftp'),
    urls = require('./urls');

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
    this.ftp.ls(path, function(err, list) {
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
