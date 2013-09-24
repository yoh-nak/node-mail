//設定ファイル
var config = require('../config.json');

//メールフォームトップ
exports.mailform = function(req, res){
	res.render('mailform', {
 		title: config.title,
 		copyright: config.copyright
	});
};

//メールフォーム確認
exports.confirm = function(req, res){
	//postデータ取得
	var name = req.body.name ? req.body.name : '';
	var subject = req.body.subject ? req.body.subject : '';
	var email = req.body.email ? req.body.email : '';
	var content = req.body.content ? req.body.content : '';

	//テンプレートアサイン
	res.render('confirm', {
 		title: config.title,
 		copyright: config.copyright,
 		name: name,
 		subject: subject,
 		email: email,
 		content: content
	});
};

//メールフォーム送信
exports.complete = function(req, res){
	//postデータ取得
	var name = req.body.name ? req.body.name : '';
	var subject = req.body.subject ? req.body.subject : '';
	var email = req.body.email ? req.body.email : '';
	var content = req.body.content ? req.body.content : '';

	//モジュール読み込み
	var sendmail = require('../model/sendmail');
	//メール送信
	sendmail.send(name, subject, email, content);
	
	//テンプレートアサイン
 	res.render('complete', {
 		title: config.title,
 		copyright: config.copyright
 	});
};
