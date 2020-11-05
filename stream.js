var fs = require("fs")

var rs = fs.createReadStream("abc.txt");
var ws = fs.createWriteStream("123.txt");
rs.pipe(ws);