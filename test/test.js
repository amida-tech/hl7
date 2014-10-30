var expect = require('chai').expect;
var assert = require('chai').assert;

var fs = require("fs");

var parseString = require("../index.js").parseString;

describe('parse.js test', function () {
    var hl7 = "";

    before(function () {
        text = fs.readFileSync('./test/fixtures/example.txt').toString();

    });

    it('should work', function () {
        assert.notStrictEqual(undefined, hl7.parseString(hl7));
    });



});
