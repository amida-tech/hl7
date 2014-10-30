'use strict';

var fs=require('fs');
var parser=require('./index.js');
var serializer=require('./index.js');

var data = fs.readFileSync('./test/fixtures/sample2.txt').toString();

var hl7=parser.parseString(data);

console.log(JSON.stringify(hl7,null,4));

//repeat-component-subcomponent
//console.log(hl7[0]["MSH"]["MSH_3"][0][0]);
//console.log(hl7[2]["NK1"]["NK1_2"][0][0]);
//console.log(hl7[2]["NK1"]["NK1_3"][0][0]);

var text=serializer.serializeJSON(hl7);
console.log(data);
console.log();
console.log(text);