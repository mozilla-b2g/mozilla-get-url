/**
Simplistic filter which finds the highest value in the list.
The .name is treated numerically.
*/
function releaseFilter(options, list) {
  var highest = 0;

  list.forEach(function(item) {
    var value = parseInt(item.name, 10);
    if (value > highest) highest = value;
  });

  // in the case of zero return null.
  return highest || null;
}

module.exports = releaseFilter;
