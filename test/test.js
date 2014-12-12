var expect = require('chai').expect;
var assert = require('chai').assert;

var fs = require("fs");

var hl7 = require("../index.js");

describe('parse.js test', function () {
    var data = "";

    before(function () {
        data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");

    });

    it('should work', function () {
        assert.notStrictEqual(undefined, hl7.parseString(data));
    });

    it('parse', function () {
        var parsed = hl7.parseString(data);

        assert.equal('JONES', parsed[1][5][0][0]);
        assert.equal('ISABELLA', parsed[1][5][0][1]);
    });

    it('translate', function () {
        var tr = hl7.translate(hl7.parseString(data));

        assert.equal('PID', tr[1]["Segment"]);
        assert.equal('JONES', tr[1]['Patient Name'][0][0]);
        assert.equal('ISABELLA', tr[1]['Patient Name'][0][1]);
    });

    it('serializer', function () {
        var serialized = hl7.serializeJSON(hl7.parseString(data));

        assert.equal(data, serialized);
    });
});
