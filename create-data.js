'use strict';

var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')

var settings = require('./lib/settings')

var versionArr = []

settings.browsersType.forEach(function(ele, idx, arr) {
	request('http://useragentstring.com/pages/' + ele + '/', function(err, res, body) {
		if (!err && res.statusCode == 200) {
			var $ = cheerio.load(body)
			var versions = $('li a')
			var	countNum = 0
			for (var i = 0; i < versions.length; i++) {
				if (countNum > settings.browserCountLimit) break
				versionArr.push(versions.eq(i).text())
				countNum++
			}
		}
		if ((idx + 1) == settings.browsersType.length) {
			writeFile(versionArr)
		}
	})
})

function writeFile(data) {
	var filePath = __dirname + '/useragent-data.json'
	fs.writeFile(filePath, JSON.stringify(data, null, '\t'), function() {
		console.log('Done Writing File.')
	})
}