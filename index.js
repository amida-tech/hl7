'use strict';
//main module that exports all other sub modules

exports.parseString = require('./lib/parser.js').parseString;
exports.serializeJSON = require('./lib/serializer.js').serializeJSON;
exports.translate = require('./lib/translate.js').translate;
