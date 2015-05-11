var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var classes = { 1: "Warrior", 2:"Paladin", 3:"Hunter", 4:"Rogue", 5:"Priest", 6:"Death Knight", 7:"Shaman", 8:"Mage", 9:"Warlock", 10:"Monk", 11:"Druid" };
var races = { 1: 'Human', 2: 'Orc', 3: 'Dwarf', 4: 'Night Elf', 5: 'Undead', 6: 'Tauren', 7: 'Gnome', 8: 'Troll', 9: 'Goblin', 10: 'Blood Elf', 11: 'Draenei', 22: 'Worgen', 25: 'Alliance Pandaren', 26: 'Horde Pandaren' };

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
	//var servername = req.params.server;
	//var charactername = req.params.charactername;
	//var character = { servername: servername, charactername: charactername };

	fs.readFile(path.dirname(require.main.filename) + '/baseload/Doraie.json', { encoding: 'utf8' }, function (err, data) {
		if (err) throw err;
		var character = JSON.parse(data);
		var view = { character: character, classes: classes, races: races };
		res.render('pages/character/simple', view);
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});
