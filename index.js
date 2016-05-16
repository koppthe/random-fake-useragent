/*
 * random-fake-useragent
 * https://github.com/koppthe/random-fake-useragent
 *
 * Copyright (c) 2016 koppthe
 * Licensed under the MIT license.
 */

'use strict'

var settings = require('./lib/settings')
var create = require('./create-data')
var useragents = require('./data/useragents.json')

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

function flattenArr(obj) {
	if (typeof obj !== 'object') return []

	var arr = []
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			arr.push(obj[key])
		}
	}
	return [].concat.apply([], arr)
}

/**
 * Update useragents.json
 */
exports.updateData = function() {
	create.createData()
}

/**
 * Get Random useragent
 * @param  {[String]} browserType [browser name]
 * values: 'Chrome', 'Internet Explorer', 'Firefox', 'Safari', 'Opera'
 * @return {[String]}             [useragent]
 */
exports.getRandom = function(browserType) {
	var data = useragents
	if (browserType) {
		data = data[browserType]
	}
	data = flattenArr(data)
	return data.length ? data[randomBetween(0, data.length - 1)] : null
}