[![Build Status](https://travis-ci.org/kaelzhang/node-module-normalize.svg?branch=master)](https://travis-ci.org/kaelzhang/node-module-normalize)
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/module-normalize.svg)](http://badge.fury.io/js/module-normalize)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/module-normalize.svg)](https://www.npmjs.org/package/module-normalize)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/node-module-normalize.svg)](https://david-dm.org/kaelzhang/node-module-normalize)
-->

# module-normalize

Normalize a module id or module url.

## Install

```sh
$ npm install module-normalize --save
```

## Usage

```js
var normalize = require('module-normalize');

normalize.id('jquery');             // 'jquery@*'
normalize.id('jquery/jquery.js');   // 'jquery@*/jquery.js'
normalize.id('jquery@1.9.0');       // 'jquery@1.9.0'

// scoped module id
normalize.id('@facebook/jquery/jquery.js');   // '@facebook/jquery/*/jquery.js'

normalize.url_from_id('jquery')               // '/jquery/*/jquery.js'
normalize.url_from_id('@facebook/jquery');    // '/facebook/jquery/*/jquery.js'

// specify scope
mormalize.url_from_id('jquery@2.0.0', {
  scope: 'facebook'
});
// '/facebook/jquery/2.0.0/jquery.js'
```

### normalize.parse_id(id)

Returns `Object`

- *scope* 

## License

MIT
