'use strict'

var fs = require('fs')
var path = require('path')
var request = require('request')
var cheerio = require('cheerio')
var async = require('async')
var settings = require('./lib/settings')

var versionObj = {}

/**
 * Crawl useragents from useragentstring.com
 */
function createData() {
	async.map(settings.browsersType, function(ele, callback) {
		request('http://useragentstring.com/pages/' + ele + '/', function(err, res, body) {
			console.log('Parsing %s Useragents', ele)
			if (!err && res.statusCode == 200) {
				var $ = cheerio.load(body)
				var versions = $('li a')
				var	countNum = 0
				var tempArr = []
				for (var i = 0; i < versions.length; i++) {
					if (countNum >= settings.browserCountLimit) break
					tempArr.push(versions.eq(i).text())
					countNum++
				}
				versionObj[ele] = tempArr
				callback(null, tempArr)
			} else {
				callback(err)
			}
		})
	}, function(err, results) {
		if (!err) {
			writeFile(versionObj)
		}
	})
}

/**
 * Write useragents.json
 */
function writeFile(data) {
	var filePath = path.join(__dirname, 'data', 'useragents.json')
	fs.writeFile(filePath, JSON.stringify(data, null, '\t'), function() {
		console.log('Done Writing File.')
	})
}

// Use for Develop
// createData()

exports.createData = createData