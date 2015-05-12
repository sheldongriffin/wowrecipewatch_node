var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var imageHandler = require('./routes/imageHandler').imageHandler;

var classes = { 1: "Warrior", 2:"Paladin", 3:"Hunter", 4:"Rogue", 5:"Priest", 6:"Death Knight", 7:"Shaman", 8:"Mage", 9:"Warlock", 10:"Monk", 11:"Druid" };
var races = { 1: 'Human', 2: 'Orc', 3: 'Dwarf', 4: 'Night Elf', 5: 'Undead', 6: 'Tauren', 7: 'Gnome', 8: 'Troll', 9: 'Goblin', 10: 'Blood Elf', 11: 'Draenei', 22: 'Worgen', 25: 'Alliance Pandaren', 26: 'Horde Pandaren' };
var slots = [
	{ id: 1, name: 'head', pos: [0, -1, -1, 0] },
	{ id: 2, name: 'neck', pos: [58, -1, -1, 0] },
	{ id: 3, name: 'shoulder', pos: [116, -1, -1, 0] },
	{ id: 4, name: 'back', pos: [174, -1, -1, 0] },
	{ id: 5, name: 'chest', pos: [232, -1, -1, 0] },
	{ id: 6, name: 'shirt', pos: [290, -1, -1, 0]},
	{ id: 7, name: 'tabard', pos: [348, -1, -1, 0] },
	{ id: 8, name: 'wrists', pos: [406, -1, -1, 0]},
	{ id: 9, name: 'hands', pos: [0, 0, -1, -1] },
	{ id: 10, name: 'waist', pos: [58, 0, -1, -1] },
	{ id: 11, name: 'legs', pos: [116, 0, -1, -1] },
	{ id: 12, name: 'feet', pos: [174, 0, -1, -1] },
	{ id: 13, name: 'finger1', pos: [232, 0, -1, -1] },
	{ id: 14, name: 'finger2', pos: [290, 0, -1, -1] },
	{ id: 15, name: 'trinket1', pos: [348, 0, -1, -1] },
	{ id: 16, name: 'trinket2', pos: [406, 0, -1, -1] },
	{ id: 17, name: 'mainHand', pos: [-1, -1, 0, 273.5] },
	{ id: 18, name: 'offHand', pos: [-1, -1, 0, 338.5] }
];

app.locals.positionHelper = function(pos){
	var returnstr = '';
	if (pos[0] != -1){
		returnstr += 'top: ' + pos[0] + 'px;';
	}
	if (pos[1] != -1){
		returnstr += 'right: ' + pos[1] + 'px;';
	}
	if (pos[2] != -1){
		returnstr += 'bottom: ' + pos[2] + 'px;';
	}
	if (pos[3] != -1){
		returnstr += 'left: ' + pos[3] + 'px;';
	}
	return returnstr;
}

app.set('view engine', 'ejs');

app.get(/images/, imageHandler);
app.get(/icons/, imageHandler);
app.get(/static-render/, imageHandler);

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
		var view = { character: character, classes: classes, races: races, slots: slots };
		res.render('pages/character/simple', view);
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});
