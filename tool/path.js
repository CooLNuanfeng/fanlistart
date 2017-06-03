const path = require('path');
const os = require('os');

var cliRootPath = path.join(__dirname, '..')

exports.CURRENT_PATH = cliRootPath;
exports.TPL_PATH = path.join(cliRootPath,'tpl');
