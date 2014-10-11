var SUFFIX_MAP = {
  win32: /\.exe$/,
  mac: /\.dmg$/,
  'linux-i686': /\.tar.bz2$/,
  'linux-x86_64': /\.tar.bz2$/
};

var LOCALIZER = 'localizer';

/**
Not all results may be for the OS in the pre-release case.

@param {String} os string see SUFFIX_MAP keys.
@param {Object} item from ftp.ls.
*/
function filterByOS(os, item) {
  if (!SUFFIX_MAP[os]) {
    throw new Error('invalid operating system type: "' + os + '"');
  }

  var suffix = SUFFIX_MAP[os];
  var name = item.name;

  return (
    // operating system is in the name
    name.indexOf(os) !== -1 &&
    // exclude localizer builds
    name.indexOf(LOCALIZER) === -1 &&
    // ends in correct suffix
    suffix.test(name)
  );
}

/**
Require the binary name to begin with the product name.  This is to deal with
situations where a directory may contain both "b2g" and "firefox" builds.

@param {String} product The product name plus any delimiter you also, ex: "b2g-"
@param {Object} item from ftp.ls.
*/
function filterByProduct(product, item) {
  return (item.name.indexOf(product) === 0);
}

function sortByTime(a, b) {
  var dateA = new Date(a.time);
  var dateB = new Date(b.time);

  // this may seem backwards but remember we want the newest (highest)
  // value.
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
}

/**
Filters a list of ftp.ls results by operating system.

@param {Object} options for filtering.
@param {Object} options.os like "mac" or win32
@param {Array} list of options to filter.
@return {Null|String} null or name of file.
*/
function filterItems(options, list) {
  var choices = list.
    filter(filterByOS.bind(null, options.os)).
    filter(filterByProduct.bind(null, options.product)).
    sort(sortByTime);

  if (!choices.length)
    return null;

  return choices[0].name;
}

module.exports = filterItems;
