var expect = require('chai').expect;
var assert = require('chai').assert;

var fs = require("fs");

var hl7 = require("../index.js");

describe('parse.js test', function () {
    var data = "";

    before(function () {
        data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString();

    });

    it('should work', function () {
        assert.notStrictEqual(undefined, hl7.parseString(data));
    });

});
