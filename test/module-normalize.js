'use strict';

var expect = require('chai').expect;
var module_normalize = require('../');
var run = require('run-mocha-cases');

run('normalize.parse_id(id), normalize.normalize_id(id)', function (id) {
  return module_normalize.parse_id(id);
}).start([
  {
    d: 'null name',
    a: '',
    e: null
  },

  {
    d: 'only name',
    a: 'zepto',
    e: {
      scope: '',
      name: 'zepto',
      path: '',
      version: '*',
      id: 'zepto@*',
      package: 'zepto@*'
    }
  },

  {
    d: 'name, path',
    a: 'zepto/zepto.js',
    e: {
      scope: '',
      name: 'zepto',
      path: '/zepto.js',
      version: '*',
      id: 'zepto@*/zepto.js',
      package: 'zepto@*'
    }
  },

  {
    d: 'name, version, path',
    a: 'zepto@1.1.0/a.js',
    e: {
      scope: '',
      name: 'zepto',
      path: '/a.js',
      version: '1.1.0',
      id: 'zepto@1.1.0/a.js',
      package: 'zepto@1.1.0'
    }
  },

  {
    d: 'scope, name',
    a: '@facebook/zepto',
    e: {
      scope: 'facebook',
      name: 'zepto',
      path: '',
      version: '*',
      id: '@facebook/zepto@*',
      package: '@facebook/zepto@*'
    }
  },

  {
    d: 'scope, name, version',
    a: '@facebook/zepto@1.0.0',
    e: {
      scope: 'facebook',
      name: 'zepto',
      path: '',
      version: '1.0.0',
      id: '@facebook/zepto@1.0.0',
      package: '@facebook/zepto@1.0.0'
    }
  },

  {
    d: 'scope, name, version, path',
    a: '@facebook/zepto@1.0.0/a.js',
    e: {
      scope: 'facebook',
      name: 'zepto',
      path: '/a.js',
      version: '1.0.0',
      id: '@facebook/zepto@1.0.0/a.js',
      package: '@facebook/zepto@1.0.0'
    }
  },

  {
    d: 'scope, no name, version, path',
    a: '@facebook/zepto/a.js',
    e: {
      scope: 'facebook',
      name: 'zepto',
      path: '/a.js',
      version: '*',
      id: '@facebook/zepto@*/a.js',
      package: '@facebook/zepto@*'
    }
  }
]);


run('normalize.parse_url(url)', function (url, options) {
  var parsed = module_normalize.parse_url(url, options);
  return parsed;
}).start([
  {
    d: 'no options, a bad case actually',
    a: ['/mod/facebook/jquery/1.1.0/jquery.js'],
    e: {
      base: '/',
      scope: '',
      name: 'mod',
      version: 'facebook',
      path: '/jquery/1.1.0/jquery.js',
      url: '/mod/facebook/jquery/1.1.0/jquery.js'
    }
  },

  {
    d: 'null url',
    a: ['/mod'],
    e: null
  },

  {
    d: 'null url 2',
    a: ['/mod/facebook'],
    e: null
  },

  {
    d: 'null url 3',
    a: ['/mod/facebook/'],
    e: null
  },

  {
    d: 'base',
    a: ['/mod/facebook/jquery/1.1.0/jquery.js', {base: '/mod'}],
    e: {
      base: '/mod',
      scope: '',
      name: 'facebook',
      version: 'jquery',
      path: '/1.1.0/jquery.js',
      url: '/mod/facebook/jquery/1.1.0/jquery.js'
    }
  },

  {
    d: 'base, scope',
    a: [
      '/mod/facebook/jquery/1.1.0/jquery.js', {
        base: '/mod',
        scope: 'facebook'
      }
    ],
    e: {
      base: '/mod',
      scope: 'facebook',
      name: 'jquery',
      version: '1.1.0',
      path: '/jquery.js',
      url: '/mod/facebook/jquery/1.1.0/jquery.js'
    }
  }
]);
