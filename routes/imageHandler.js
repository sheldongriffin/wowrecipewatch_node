'use strict';
var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');

exports.imageHandler = function (req, res) {

	var localPath = req.originalUrl;
	var workingPath = path.dirname(require.main.filename);

	if (localPath.indexOf('/') == 0) {
		localPath = localPath.substr(1);
	}

	if (!localPath.substr(0, localPath.indexOf('/')).match(/\./)) { // needs to match [something.with.a.dot]/images/foo/bar.jpg
		localPath = 'us.battle.net/' + localPath;
	}

	var remotePath = 'http://' + localPath;

	localPath = workingPath + '/public/images/' + localPath;
	
	if (localPath.indexOf('?') > -1) { // c:\NodePractice2\public\images\us.battle.net\images\logos\blizzard.png?v=58-77
		localPath = localPath.substr(0, localPath.indexOf('?'));
	}

	var localDirectory = path.dirname(localPath);

	res.sendFile(localPath, {}, function (err) {
		if (err) {
			mkdirp(localDirectory, function (err) {
				if (err) { 
					res.status(404).send('Sorry cant find that!');
				} else {
					request({ method: 'GET', url: remotePath, encoding: null }, function (reqerror, reqresponse, reqbody) {
						if (reqresponse.statusCode == 200) {
							fs.writeFile(localPath, reqbody, 'binary', function (e) {
								if (e) { console.log(e); }
							});
							res.send(reqbody);
						} else {
							console.log("Error getting file " + remotePath + " code: " + reqresponse.statusCode);
							res.status(404).send('Sorry cant find that!');
						}
					});
				}
			});
		}
	});
};
