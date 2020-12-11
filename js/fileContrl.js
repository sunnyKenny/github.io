'use strict';
var fs = require(['fs'], function ( ){});
function FsgetFileDir(src) {
    let components = [];
const files = fs.readdirSync(src)
    files.forEach(function (item, index) {
        let stat = fs.lstatSync(src + item)
        if (stat.isDirectory() === true) {
            components.push(item)
        }
    });
    return components;

}
