//設定ファイル
var config = require('../config.json');

exports.index = function(req, res){
  res.render('index', {
 		title: config.title,
 		copyright: config.copyright
  });
};