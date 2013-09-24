//設定ファイル
var config = require('../config.json');

//モジュール読み込み
var mailer = require('nodemailer');

//モジュールエキスポート
var sendmail = exports;

//メソッド定義
sendmail.send = function(name, subject, email, content){

	//smtp設定
	var setting = {
		//host:"smtp.sample.com", //smptサーバーで送信する場合
		service:"Gmail", //Gmailサーバーで送信する場合
		auth:{
			user: config.user,
			pass: config.pass,
			port: config.port
		}
	}

	//Gmailで送信する場合
	if(setting.service == 'Gmail'){
		//改行置換
		content = content.replace(/\n/g, "<br>"); 
		//送信内容に送信元追記
		content = 'from: &lt;' + email + '&gt;<br><br>' + content;
	}

	//オプション
	var mailOptions = {
		from: email, //送信元アドレス
		to: config.user, //送信先アドレス
		subject: subject, //タイトル
		html: content //送信内容
	}

	//smtp送信
	var smtp = mailer.createTransport("SMTP",setting);
	smtp.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
		}
		else{
			console.log("Message sent: " + response.message);
		}
		//smtp切断
		smtp.close();
	});
}
