'use strict';

var expect = require('chai').expect;
var module_normalize = require('../');
var run = require('run-mocha-cases');

run('normalize.parse_id()', function (id) {
  return module_normalize.parse_id(id);
}).start([
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