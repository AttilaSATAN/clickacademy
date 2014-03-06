/* jshint node:true */

var express = require('express');
var http = require('http');
var path = require('path');
var service = require('cekirdekemlak').service;
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({keepExtensions: false}));
app.use(express.cookieParser('çidirik'));
app.use(express.session({sercret:"kedicik"}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req,res){
	res.send({noop:null});
});


app.put('/service/ilan', service.ilan.put);
app.get('/service/ilan', service.ilan.get);
app.post('/service/ilan', service.ilan.update);
app.delete('/service/ilan', service.ilan.delete);

app.post('/service/upload', service.upload.gorsel);


app.get('/service/gayrimekul', service.gayrimenkulTurleri.get);

//app.get('/service/user/populate', service.user.populate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
