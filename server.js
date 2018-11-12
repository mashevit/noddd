var express = require('express')
, app = express()
, server = require('http').createServer(app);
var path = require('path');
//, io = require("socket.io").listen(server)
//, npid = require("npid")
//, uuid = require('node-uuid')
//, Room = require('./room.js')
//, _ = require('underscore')._;
var rootPath = path.normalize(__dirname);
app.use(express.static(rootPath));
//console.log(rootPath);
app.use('/node_modules', express.static(rootPath + '/node_modules'))
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(express.static(__dirname + '/public'));
// app.use('/components', express.static(__dirname + '/components'));
// app.use('/js', express.static(__dirname + '/js'));
// app.use('/icons', express.static(__dirname + '/icons'));
// app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0');


app.get('/', function(req, res){
    res.sendFile(rootPath + '/index.html');
});
app.listen(app.get('port'), app.get('ip'), function(){
    console.log("Express server listening on " + app.get('ip') + ":" + app.get('port'));
  });
/* Store process-id (as priviledged user) */
try {
    npid.create('/var/run/advanced-chat.pid', true);
} catch (err) {
    console.log(err);
    //process.exit(1);
}