#!/usr/bin/env node
const program = require('commander');
const filePath = require('./tool/path');
const tool = require('./tool/tool');
const package = require('./package');

program.version(package.version)
    .usage('create');


program.command('create <branch> <name>')
    .option('-s, --sass','是否使用sass')
    .option('-v, --vue','是否使用vue')
    .description('在对应分支生成项目的初始文件')
    .action(function(branch,name,options){
        if(tool.DirTools.isExist(`${filePath.CURRENT_PATH}/${branch}`) && tool.DirTools.isExist(`${filePath.CURRENT_PATH}/static`)  ){
            var config = {
                'branch' : branch,
                'name' : name,
                'path' : filePath.CURRENT_PATH+'/static',
                'sass' : options.sass,
                'vue' : options.vue
            }
            createStatic(config);
        }else{
            console.log(`${branch}分支不存在 或 static 分支不存在`);
        }
    });


program.on('--help',function(){
    console.log('Example: ');
    console.log('');
    console.log('  $ flstart huodong lilibao -v -s');
    console.log('');
});



program.parse(process.argv);

if(!program.args.length){
    program.help();
}



function createStatic(conf){

    var jsContent = tool.FileTools.readFile(`${filePath.TPL_PATH}/index.js`).toString();
    var vuejsContent = tool.FileTools.readFile(`${filePath.TPL_PATH}/index-vue.js`).toString();
    var cssContent = tool.FileTools.readFile(`${filePath.TPL_PATH}/style.css`).toString();
    var scssContent = tool.FileTools.readFile(`${filePath.TPL_PATH}/style.scss`).toString();

    if(conf.branch == 'mobile'){
        tool.DirTools.isExist(conf.path+'/css/webapp') &&
        tool.DirTools.mkDir(conf.path+'/css/webapp/'+conf.name);
        tool.DirTools.isExist(conf.path+'/js/webapp') && tool.DirTools.mkDir(conf.path+'/js/webapp/'+conf.name);
        tool.DirTools.isExist(conf.path+'/images/webapp') && tool.DirTools.mkDir(conf.path+'/images/webapp/'+conf.name);


        if(conf.sass){
            tool.FileTools.createFile(conf.path+'/js/webapp/'+conf.name+'/'+conf.name+'.scss',scssContent);
        }else{
            tool.FileTools.createFile(conf.path+'/js/webapp/'+conf.name+'/'+conf.name+'.css',cssContent);
        }

        if(conf.vue){
            tool.FileTools.createFile(conf.path+'/css/webapp/'+conf.name+'/'+conf.name+'.js',vuejsContent);
        }else{
            tool.FileTools.createFile(conf.path+'/css/webapp/'+conf.name+'/'+conf.name+'.js',jsContent);
        }

    }else{
        tool.DirTools.isExist(conf.path+'/css/'+conf.branch) && tool.DirTools.mkDir(conf.path+'/css/'+conf.branch+'/'+conf.name);
        tool.DirTools.isExist(conf.path+'/js/'+conf.branch) && tool.DirTools.mkDir(conf.path+'/js/'+conf.branch+'/'+conf.name);
        tool.DirTools.isExist(conf.path+'/images/'+conf.branch) && tool.DirTools.mkDir(conf.path+'/images/'+conf.branch+'/'+conf.name);

        if(conf.sass){
            tool.FileTools.createFile(conf.path+'/js/'+conf.branch+'/'+conf.name+'/'+conf.name+'.scss',scssContent);
        }else{
            tool.FileTools.createFile(conf.path+'/js/'+conf.branch+'/'+conf.name+'/'+conf.name+'.css',cssContent);
        }

        if(conf.vue){
            tool.FileTools.createFile(conf.path+'/css/'+conf.branch+'/'+conf.name+'/'+conf.name+'.js',vuejsContent);
        }else{
            tool.FileTools.createFile(conf.path+'/css/'+conf.branch+'/'+conf.name+'/'+conf.name+'.js',jsContent);
        }

    }
}
