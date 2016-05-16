var expect = require('chai').expect
var lib = require('../index.js')

var iterations = 200
var browsersType = ['Chrome', 'Internet Explorer', 'Firefox', 'Safari', 'Opera', 'valid', '']

describe('random-fake-useragent', function() {
	it('Can return value', function() {
		expect(lib.getRandom()).to.be.a.string
	})
	it('Randomization specify browser', function() {
		for (var i = 0; i < browsersType.length; i++) {
			expect(lib.getRandom(browsersType[i])).to.be.a.string
		}
	})
	it('Randomization works', function(done) {
		for (var i = 0; i < iterations; i++) {
			expect(lib.getRandom()).to.be.a.string
		}
		done()
	})
})
