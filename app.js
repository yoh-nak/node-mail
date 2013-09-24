//モジュール読み込み
var express = require('express')
  , routes = require('./routes')
  , mailform = require('./routes/mailform')
  , http = require('http')
  , path = require('path');

var app = express();

//ミドルウェア
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//ルーティング

//トップページ
app.get('/', routes.index);
//メールフォーム
app.get('/mailform', mailform.mailform);
app.post('/confirm', mailform.confirm);
app.post('/complete', mailform.complete);

//サーバー起動
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
