'use strict'

var gulp = require('gulp')
var eslint = require('gulp-eslint')
var isparta = require('isparta')
var istanbul = require('gulp-istanbul')
var mocha = require('gulp-mocha')

var files = {
	lint: ['*.js', 'lib/*.js', 'test/*.js'],
	src: ['index.js'],
	test: ['./test/test.js']
}

gulp.task('lint', function() {
	return gulp.src(files.lint)
				.pipe(eslint())
				.pipe(eslint.format('stylish'))
				.pipe(eslint.failAfterError())
})

gulp.task('test', function() {
	return gulp.src(files.src)
		.pipe(istanbul({
			instrumenter: isparta.Instrumenter,
			includeUntested: true	
		}))
		.pipe(istanbul.hookRequire())
		.on('finish', function() {
			gulp.src(files.test, {read: false})
				.pipe(mocha({
					reporter: 'spec'
				}))
				.on('error', function(err) {
					console.error(err.toString())
					this.emit('end')
				})
				.pipe(istanbul.writeReports({
					dir: './coverage',
					reporters: ['lcov', 'json', 'text-summary']	
				}))
		})
})