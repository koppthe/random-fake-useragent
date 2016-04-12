'use strict';

var fs = require('fs')
var request = require('request')
var xml2js = require('xml2js')

var xmlUrl = 'http://techpatterns.com/downloads/firefox/useragentswitcher.xml'
var file = __dirname + '/useragent-data.json'

var useragents = []
var xmlParser = new xml2js.Parser()

request(xmlUrl, function(err, res, body) {
	xmlParser.parseString(body, function(err, result) {
		parseFolder('', result.useragentswitcher.folder)
		fs.writeFile(file, JSON.stringify(useragents, null, '\t'), function() {
			console.log('Done Writing File.')
		})
	})
})

function parseFolder(folderName, folder) {
	folder.forEach(function(folderItem) {
		var subFolderName = folderName + '/' + folderItem.$.description

		if (folderItem.hasOwnProperty('folder')) {
			parseFolder(subFolderName, folderItem.folder)
		}

		parseUseragents(subFolderName, folderItem)
	})
}

function parseUseragents(folderName, folderItem) {
	if (folderItem.hasOwnProperty('useragent')) {
		folderItem.useragent.forEach(function(useragent) {
			useragent = useragent.$
			if (typeof useragent.useragent === 'string' && useragent.useragent.length > 0) {
				useragents.push(useragent.useragent)
			}
		})
	}
}