const fs = require('fs-extra');
// 判断文件夹是否存在
if (fs.pathExistsSync('./fe')) {
  fs.removeSync('./fe', { recursive: true });
}
fs.copySync('../web/dist', './fe');
