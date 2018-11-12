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

//app.use(cors({ origin: http://localhost:4200, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-access-token', 'XSRF-TOKEN'], preflightContinue: false }));
// function myCors(req, res, nxt) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
//   if(req.method === 'OPTIONS') {
//       res.sendStatus(204);
//   }
//   else {
//       nxt();
//   }
// }
// app.use(myCors);


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.get('/', (res, req, nxt) => {
//     // only for adding cors on all requests
//     nxt();
// });
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


app.get('/', function(req, res, nxt){
    res.sendFile(rootPath + '/index.html');
    nxt();
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