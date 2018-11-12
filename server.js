'use strict';

var express = require('express');
var app = express();
var path = require('path');
var rootPath = path.normalize(__dirname);
var nodePort = '2009';

app.use(express.static(rootPath));
//console.log(rootPath);
app.use('/node_modules', express.static(rootPath + '/node_modules'))
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "localhost";
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000;

app.get('/', function(req, res){
    res.sendFile(rootPath + '/index.html');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
console.log(new Date() + ' Listening bla on port: ' + nodePort);