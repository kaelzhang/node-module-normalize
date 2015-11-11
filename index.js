'use strict';

var normalize = exports;

//                    0    1           2                3         4
//                        @facebook    jquery           1.1.0     /
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
  var scope = match[1] || '';
  var name = match[2];

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
