const fs = require('fs');

var FileTools = {
  // 判断文件或文件夹是否存在
  isExist: function(path) {
    return fs.existsSync(path) ? true : false;
  },
  // 创建文件夹
  mkdirSync: function(path, mode) {
    var arr = path.split("/"), mode = mode || 0755;
    if(arr[0]==='.'){
        arr.shift();
    }
    if(arr[0]==='..'){
        arr.splice(0,2,arr[0]+'/'+arr[1]);
    }
    function mk(cur){
       if(!FileTools.isExist(cur)){//不存在就创建一个
           fs.mkdirSync(cur, mode)
       }
       if(arr.length){
           mk(cur + "/"+arr.shift());
       }
    }
    arr.length && mk(arr.shift());
  },
  //创建文件
  createFile : function(path,data){
      return fs.writeFileSync(path,data);
  },
  //读取文件
  readFile : function(path){
    if (FileTools.isExist(path)) {
      return fs.readFileSync(path);
    } else {
      return null;
    }
  },
  // 删除文件或文件夹
  rmFile: function(path) {
      var dirs = [];
       try{
           iterator(path,dirs);
           for(var i = 0, el ; el = dirs[i++];){
               fs.rmdirSync(el);//一次性删除所有收集到的目录
           }
       }catch(e){//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
           console.log(e);
       }
      function iterator(url,dirs){
          var stat = fs.statSync(url);
          if(stat.isDirectory()){
              dirs.unshift(url);//收集目录
              inner(url,dirs);
          }else if(stat.isFile()){
              fs.unlinkSync(url);//直接删除文件
          }
      }
      function inner(path,dirs){
          var arr = fs.readdirSync(path);
          for(var i = 0, el ; el = arr[i++];){
              iterator(path+"/"+el,dirs);
          }
      }
  },

};


module.exports = {
    FileTools : FileTools
}
