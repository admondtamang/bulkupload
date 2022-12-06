var fs = require("fs");
var array = fs.readFileSync("error.txt").toString().split("\r\n");

console.log(array);
