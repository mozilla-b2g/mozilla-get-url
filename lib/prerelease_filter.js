var SUFFIX_MAP = {
  win32: /\.exe$/,
  mac: /\.dmg$/,
  'linux-i686': /\.tar.bz2$/,
  'linux-x86_64': /\.tar.bz2$/
};

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
  return (
    // operating system is in the name
    item.name.indexOf(os) !== -1 &&
    // ends in correct suffix
    suffix.test(item.name)
  );
}

/**
Sort by length of name. Shorter names are usually the one we want
since they have less complications.
*/
function sortByLength(a, b) {
  return a.name.length - b.name.length;
}

/**
 * Filters a list of ftp.ls results by operating system.
 *
 * @param {Object} options for filtering.
 * @param {Object} options.os like "mac" or win32
 * @param {Array} list of options to filter.
 * @return {Null|String} null or name of file.
 */
function filterItems(options, list) {
  var choices =
    list.filter(filterByOS.bind(null, options.os)).sort(sortByLength);

  if (!choices.length)
    return null;

  return choices[0].name;
}

module.exports = filterItems;
