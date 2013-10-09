# mozilla-get-url

Find the url where a given mozilla product lives for all kinds of branches / releases / pre-releases.

Inspired by (firefox-get)[https://github.com/jsantell/node-firefox-get] which I initially contributed to for the
b2g-support... The primary difference is mozilla-get-url is designed to handle most mozilla products up front and
uses ftp rather then html scraping.


## Usage

```js
var locate = require('mozilla-get-url').locate;

var options = {
  /*
    - required
    - examples: 'win32', 'mac', 'linux-i686', 'linux-x86_64'
  */
  os: 'mac',
  /*
    - optional
    - default: 'latest'
    - examples: '17.0', '3.6'

  this only is used with releases (not channel opts, not tinderbox opts)
  */
  version: '17.0',
  /*
    - optional
    - default: 'en-US'

  this only is used with releases (not channel opts, not tinderbox opts)
  */
  language: 'en-US',

  /*
    - optional
    - default: 'firefox'
    - examples: 'firefox', 'b2g'
  
  Gecko product... Only tested with firefox and b2g-desktop (b2g)
  */
  product: 'firefox',

  /**
    - optional
    - default: none
    - examples: ['beta', 'aurora', 'nightly', 'mozilla-central']
  
  "nightly" (as in built every 24 hours) builds on various channels. 
  */
  channel: null,

  /**
    - optional
    - default: none
    - examples: ['mozilla-central', 'mozilla-inbound', 'mozilla-inbound-b2g']

  Latest and greatest (current) builds... These are the same builds used in TBPL test runs.
  */
  tinderbox: null
};

locate(options, function(err, url) {
  url; // => http url to the build
});
```
