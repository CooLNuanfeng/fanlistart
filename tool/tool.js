const fs = require('fs');


var FileTools = {
  // 判断文件是否存在
  isExist: function(path) {
    return fs.existsSync(path);
  },
  // 删除文件
  rmFile: function(path) {
    if (FileTools.isExist(path)) {
      return fs.unlinkSync(path);
    } else {
      console.log('该文件不存在');
      return null;
    }
  },
  // 新建／覆盖／修改 原文件内容
  createFile: function(path, data) {
    var res = fs.writeFileSync(path, data);
    return res;
  },
  // 读文件
  readFile: function(path) {
    if (FileTools.isExist(path)) {
      var data = fs.readFileSync(path);
      return data;
    } else {
      return null;
    }
  },
  // 关闭文件
  closeFile: function() {
    fs.closeSync();
  }
};

var DirTools = {
  // 判断文件夹是否存在
  isExist: function(path) {
     return fs.existsSync(path);
  },
  // 创建文件夹
  mkDir: function(path) {
    if (!DirTools.isExist(path)){
      return fs.mkdirSync(path);
    } else {
      return false;
    }
  },
  //删除文件夹
  rmDir: function(path) {
    if (DirTools.isExist(path)) {
      return fs.rmdirSync(path);
    } else {
      console.log('该文件夹不存在');
    }
  },
  // 读取文件夹下所有文件
  readDir: function(path) {
    var data = fs.readdirSync(path);
    return data;
  }
};


module.exports = {
    DirTools :  DirTools,
    FileTools : FileTools
}
