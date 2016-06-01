# random-fake-useragent

[![npm version](https://badge.fury.io/js/random-fake-useragent.svg)](https://badge.fury.io/js/random-fake-useragent)
[![Dependency Status](https://david-dm.org/koppthe/random-fake-useragent.svg)](https://david-dm.org/koppthe/random-fake-useragent)
[![devDependency Status](https://david-dm.org/koppthe/random-fake-useragent/dev-status.svg)](https://david-dm.org/koppthe/random-fake-useragent#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/koppthe/random-fake-useragent/badge.svg?branch=master&service=github)](https://coveralls.io/github/koppthe/random-fake-useragent?branch=master)

[![NPM](https://nodei.co/npm/random-fake-useragent.png)](https://npmjs.org/package/random-fake-useragent)

Random Fake User-Agent. It picks up `User-Agent` strings based on `w3schools` Browser Statistics from a `real world database`.

## Features

* Grabs up to date `useragent` from [useragentstring.com](http://useragentstring.com/)
* Randomize with real world statistic via [w3schools.com](http://www.w3schools.com)

## Getting Started

Install the module with: `npm install random-fake-useragent`

```javascript
var randomUA = require('random-fake-useragent')
var ua = randomUA.getRandom()
```

## Documentation

#### .getRandom([browserType])

Get a random useragent string from local `useragents.json` file. You can call pass the additional option `browserType` for specifing Browser's User-agent.

> browserType: `Chrome`, `Internet Explorer`, `Firefox`, `Safari`, `Opera`

Examples:

```javascript
randomUA.getRandom()
// "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)"

randomUA.getRandom('Chrome')
// "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36"
```

#### .updateData()

Local file `useragents.json` had inited before. It crawl useragents from `useragentstring.com`. If you want to update the file, you can use this method.

## License

Copyright (c) 2016 koppt  
Licensed under the MIT license.