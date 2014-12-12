'use strict';

var fs=require('fs');
var parser=require('./index.js');
var serializer=require('./index.js');
var translate=require('./lib/translate.js');

var data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");

console.log(data);

var hl7=parser.parseString(data);

//console.log(JSON.stringify(hl7,null,4));

//repeat-component-subcomponent
//console.log(hl7[0]["MSH"]["MSH_3"][0][0]);
//console.log(hl7[2]["NK1"]["NK1_2"][0][0]);
//console.log(hl7[2]["NK1"]["NK1_3"][0][0]);


console.log(hl7[1]);


var text=serializer.serializeJSON(hl7);
console.log(data.split("\r").join("\n"));
console.log();
console.log(text.split("\r").join("\n"));
console.log();
console.log(text==data);

//console.log(JSON.stringify(hl7,null,4));


console.log(JSON.stringify(translate.translate(hl7),null,4));
