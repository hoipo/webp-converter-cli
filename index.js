#!/usr/bin/env node

const fs = require('fs');
const readChunk = require('read-chunk');
const imageType = require('image-type');
const execFile = require('child_process').execFile;
const cwebp = require('cwebp-bin');
const program = require('commander');
const chalk = require('chalk');
var fileList = [];

function list(val) {
    return val.split(',');
}

function queryExtName(fileName){ 
    var d=/\.[^\.]+$/.exec(fileName); 
    return d; 
} 

function walk(path) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isFile()) {
            var imageTypeData = imageType(readChunk.sync(path + '/' + item, 0, 12));
            if (imageTypeData) {
                if (imageTypeData.ext === 'jpg' || imageTypeData.ext === 'png') {
                    fileList.push(path + '/' + item);
                }
            }
        }
    });

    if (program.recursive) {
        dirList.forEach(function(item) {
            if (fs.statSync(path + '/' + item).isDirectory()) {
                walk(path + '/' + item);
            }
        });
    }
}

program
    .version('0.0.1')
    .option('-r, --recursive', 'Walk given directory recursively')
    .option('-f, --files <items>', 'the files you want to convert,split by \',\'', list)
    .parse(process.argv);

if (program.files) {
    fileList = program.files;
} else {
    walk(process.cwd());
}

console.log(chalk.yellow("Found " + fileList.length + " image file(s) !"));
fileList.forEach(function (file) {
    execFile(cwebp, [file, '-o', file.replace(queryExtName(file),".webp")], function (err) {
        if (err) {
            throw err;
        }
        console.log(chalk.green(file + ' is converted!'));
    });
})
