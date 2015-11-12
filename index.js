'use strict';

var normalize = exports;
var node_path = require('path');

//                    0    1           2                3         4
//                        @facebook    jquery           1.1.0     /jquery.js
var REGEX_PARSE_ID = /^(?:@([^\/]+)\/)?((?:[^\/])+?)(?:@([^\/]+))?(\/.*)?$/;

// On android 2.2,
// `[^\/]+?` will fail to do the lazy match, but `(?:[^\/])+?` works.
// Shit, go to hell!

// Parses a module id into an object

// @param {string} id path-resolved module identifier
// 'a@1.0.0'    -> 'a@1.0.0'
// 'a'          -> 'a@*'
// 'a/inner'    -> 'a@*/inner'
normalize.parse_id = function (id) {
  var match = id.match(REGEX_PARSE_ID);
  if (!match) {
    return null;
  }

  var scope = match[1] || '';
  var name = match[2];

  if (!name) {
    return null;
  }

  // 'a/inner' -> 'a@latest/inner'
  var version = match[3] || '*';
  var path = match[4] || '';

  // There always be matches
  return format_parsed({
    scope: scope,
    name: name,
    version: version,
    path: path
  });
};


// Format package id and pkg
// `parsed` -> 'a@1.1.0'
function format_parsed (parsed) {
  var scope = parsed.scope
    ? '@' + parsed.scope + '/'

    // parsed.scope might be undefined
    : '';

  var pkg = scope + parsed.name + '@' + parsed.version;
  parsed.id = pkg + parsed.path;
  parsed.package = pkg;

  return parsed;
}


function default_options (options) {
  options = options || {};

  // convert `base` to absolute path
  options.base = node_path.resolve('/', options.base || '/');
  options.scope = options.scope || '';
  return options;
}


// <base>/<scope>/<name>/<version><path>

// @param {String} url absolute url 
// @param {Object} options
// - base
// - scope
normalize.parse_url = function (url, options) {
  options = default_options(options);
  var base = options.base;
  var scope = options.scope;

  // turns url into a relative one
  url = node_path.relative(base, url);

  var paths = url.split('/').filter(Boolean);

  if (scope && scope !== paths.shift()) {
    return null;
  }

  var name = paths.shift();
  var version = paths.shift();
  var path = paths.join('/');

  if (!name || !version || !path) {
    return null;
  }

  if (path) {
    path = '/' + path;
  }

  return format_parsed_url({
    scope: scope,
    name: name,
    version: version,
    path: path,
    base: base,
    scope: scope
  });
};


function format_parsed_url (parsed) {
  var url = [
    parsed.base,
    parsed.scope,
    parsed.name,
    parsed.version,
    parsed.path
  ]
  .filter(Boolean)
  .join('/')
  .replace(/\/+/g, '/');

  parsed.url = url;
  return parsed;
}


normalize.normalize_id = function (id) {
  return normalize.parse_id(id).id;
};


normalize.normalize_url = function (url, options) {
  return normalize.normalize_url(url, options).url;
};


normalize.url_from_id = function (id, options) {
  options = default_options(options);
  var parsed = normalize.parse_id(id);
  parsed.path = parsed.path || parsed.name + '.js';
  parsed.base = options.base;
  parsed.scope = options.scope;
  return format_parsed_url(parsed).url;
};
