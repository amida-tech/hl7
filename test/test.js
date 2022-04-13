// var expect = require('chai').expect;
// var expect = require('chai').expect;

var fs = require("fs");

var hl7 = require("../index.js");

describe('parse.js test', function () {
  var data = "";
  var parsed;

  beforeAll(function () {
    data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");
    parsed = hl7.parseString(data);
  });

  it('should parse an HL7 string without error', function () {
    expect(parsed).not.toStrictEqual(undefined);
  });

  it('parses fields with the correct mapping', function () {
    expect(parsed[1][5][0][0]).toEqual('JONES'); // parsed[SEGMENT][FIELD][FIELDREPEAT][COMPONENT]
    expect(parsed[1][5][0][1]).toEqual('ISABELLA');
  });

  it('translates HL7 sequence number to element name', function () {
    var tr = hl7.translate(parsed);

    expect(tr[1]["Segment"]).toEqual('PID');
    expect(tr[1]['Patient Name'][0][0]).toEqual('JONES');
    expect(tr[1]['Patient Name'][0][1]).toEqual('ISABELLA');
  });

  it('serializes parsed HL7 to a string', function () {
    var serialized = hl7.serializeJSON(parsed);

    expect(data).toEqual(serialized);
  });

  it('correctly interprets the FIELDREPEAT character', function () {
    expect(parsed[3][3][0][0]).toEqual('185L29839X64489JLPF');
    expect(parsed[3][3][1][0]).toEqual('X64489');
  });
});
