'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var url = require("url");
var fs = require('fs');
const mine = require('./mine').types;

http.createServer(function (req, res) {
    //解析请求文件
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
   // console.log(pathname);
    //如果地址为空跳转到index.html
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
            res.end();
        });
    }
    else {
    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function (err, data) {
        console.log(pathname.substr(1));

        var flag = pathname.split('.').slice(-1)[0];
        /*console.log(flag);*/
        if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/html
            res.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            // HTTP 状态码: 200 : OK
            // Content Type: text/html
            var contentType = mine[flag] || "text/plain";

            res.writeHead(200, { 'Content-Type': contentType });

            // 响应文件内容
            res.write(data);
        }
        //  发送响应数据
        res.end();
        /*res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('<h1>Hello World</h1>');*/
    });
    }
}).listen(port);
