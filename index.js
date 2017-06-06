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
        if(tool.FileTools.isExist(branch) && tool.FileTools.isExist('static') ){
            var config = {
                'branch' : branch,
                'name' : name,
                'path' : filePath.CURRENT_PATH,
                'sass' : options.sass,
                'vue' : options.vue
            }
            createStatic(config);
            createPhpTpl(config);
        }else{
            console.log(`${branch}分支不存在 或 static 分支不存在`);
        }
    });


program.on('--help',function(){
    console.log('Example: ');
    console.log('');
    console.log('  $ flstart create huodong lilibao -v -s');
    console.log('');
});



program.parse(process.argv);

if(!program.args.length){
    program.help();
}

function createPhpTpl(conf){
    tool.FileTools.mkdirSync(conf.branch+'/Tpl/default/'+conf.name);
    var htmlContent = '';
    if(conf.vue){
        htmlContent = tool.FileTools.readFile(filePath.TPL_PATH+'/tpl-vue.html').toString();
    }else{
        htmlContent = tool.FileTools.readFile(filePath.TPL_PATH+'/tpl.html').toString();
    }

    tool.FileTools.createFile(conf.branch+'/Tpl/default/'+conf.name+'/index.html',htmlContent);
}


function createStatic(conf){

    var jsContent = tool.FileTools.readFile(filePath.TPL_PATH+'/index.js').toString();
    var vuejsContent = tool.FileTools.readFile(filePath.TPL_PATH+'/index-vue.js').toString();
    var cssContent = tool.FileTools.readFile(filePath.TPL_PATH+'/style.css').toString();
    var scssContent = tool.FileTools.readFile(filePath.TPL_PATH+'/style.scss').toString();

    if(conf.branch == 'huodong'){
        var staticPath = 'static/'+conf.branch+'/'+conf.name;
        tool.FileTools.mkdirSync(staticPath+'/css');
        tool.FileTools.mkdirSync(staticPath+'/js');
        tool.FileTools.mkdirSync(staticPath+'/images');

        if(conf.sass){
            tool.FileTools.createFile(staticPath+'/css/'+conf.name+'.scss',scssContent);
        }else{
            tool.FileTools.createFile(staticPath+'/css/'+conf.name+'.css',cssContent);
        }

        if(conf.vue){
            tool.FileTools.createFile(staticPath+'/js/'+conf.name+'.js',vuejsContent);
        }else{
            tool.FileTools.createFile(staticPath+'/js/'+conf.name+'.js',jsContent);
        }

    }else{
        var file = conf.branch == 'mobile' ? 'webapp' : conf.branch;
        var staticPath = 'static/'+file;
        tool.FileTools.mkdirSync(staticPath+'/css/'+conf.name);
        tool.FileTools.mkdirSync(staticPath+'/js/'+conf.name);
        tool.FileTools.mkdirSync(staticPath+'/images/'+conf.name);

        if(conf.sass){
            tool.FileTools.createFile(staticPath+'/css/'+conf.name+'/'+conf.name+'.scss',scssContent);
        }else{
            tool.FileTools.createFile(staticPath+'/css/'+conf.name+'/'+conf.name+'.css',cssContent);
        }

        if(conf.vue){
            tool.FileTools.createFile(staticPath+'/js/'+conf.name+'/'+conf.name+'.js',vuejsContent);
        }else{
            tool.FileTools.createFile(staticPath+'/js/'+conf.name+'/'+conf.name+'.js',jsContent);
        }
    }
}
