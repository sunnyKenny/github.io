'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var url = require("url");
var fs = require('fs');
const mine = require('./mine').types;

http.createServer(function (req, res) {
    //���������ļ�
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
   // console.log(pathname);
    //�����ַΪ����ת��index.html
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
    // ���ļ�ϵͳ�ж�ȡ������ļ�����
    fs.readFile(pathname.substr(1), function (err, data) {
        console.log(pathname.substr(1));

        var flag = pathname.split('.').slice(-1)[0];
        /*console.log(flag);*/
        if (err) {
            console.log(err);
            // HTTP ״̬��: 404 : NOT FOUND
            // Content Type: text/html
            res.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            // HTTP ״̬��: 200 : OK
            // Content Type: text/html
            var contentType = mine[flag] || "text/plain";

            res.writeHead(200, { 'Content-Type': contentType });

            // ��Ӧ�ļ�����
            res.write(data);
        }
        //  ������Ӧ����
        res.end();
        /*res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('<h1>Hello World</h1>');*/
    });
    }
}).listen(port);
