var expect = require('chai').expect;
var assert = require('chai').assert;

var fs = require("fs");

var hl7 = require("../index.js");

describe('parse.js test', function () {
    var data = "";

    before(function () {
        data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");

    });

    it('should parse an HL7 string without error', function () {
        assert.notStrictEqual(undefined, hl7.parseString(data));
    });

    it('parses fields with the correct mapping', function () {
        var parsed = hl7.parseString(data);

        assert.equal('JONES', parsed[1][5][0][0]); // parsed[SEGMENT][FIELD][FIELDREPEAT][COMPONENT]
        assert.equal('ISABELLA', parsed[1][5][0][1]);
    });

    it('translates HL7 sequence number to element name', function () {
        var tr = hl7.translate(hl7.parseString(data));

        assert.equal('PID', tr[1]["Segment"]);
        assert.equal('JONES', tr[1]['Patient Name'][0][0]);
        assert.equal('ISABELLA', tr[1]['Patient Name'][0][1]);
    });

    it('serializes parsed HL7 to a string', function () {
        var serialized = hl7.serializeJSON(hl7.parseString(data));

        assert.equal(data, serialized);
    });

    it('correctly interprets the FIELDREPEAT character', function () {
        var parsed = hl7.parseString(data);

        assert.equal('185L29839X64489JLPF', parsed[3][3][0][0]);
        assert.equal('X64489', parsed[3][3][1][0]);
    });
});
