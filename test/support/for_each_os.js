var OS_LIST = [
  'linux-i686',
  'linux-x86_64',
  'mac',
  'win32'
];

module.exports = function() {
  OS_LIST.forEach.apply(OS_LIST, arguments);
};
