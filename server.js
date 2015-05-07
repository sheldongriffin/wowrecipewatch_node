var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function (req, res){
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

	res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});

app.get('/about', function (req, res) {
	res.render('pages/about');
});

//http://us.battle.net/wow/en/character/aerie-peak/Doraie/simple
app.get('/character/:server/:charactername/simple', function (req, res, next){
	var servername = req.params.server;
	var charactername = req.params.charactername;
	var character = { servername: servername, charactername: charactername };
	res.render('pages/character/simple', character);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});