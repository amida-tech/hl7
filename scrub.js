'use strict';
//scrubs line ends /r/n into /r

var fs=require('fs');

if (process.argv.length!==3){
	console.log("Usage: node scrub.js hl7_filename");
	process.exit();
}

var filename=process.argv[2];

var data = fs.readFileSync(filename).toString();

data = data.split('\n').join('\r');

fs.writeFileSync(filename, data);