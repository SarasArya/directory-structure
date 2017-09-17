const fs = require('fs');
const Promise = require('bluebird');
const path = require('path');
const util = require('util');

const printTree = (folderName) => {
  if(!fs.existsSync(folderName)){
    console.error("No path given as argument. Check API signature");
    process.exit(0);
  }
  folderName = path.normalize(folderName);
  var stats = fs.lstatSync(folderName); // sync methods used to remove unneccessary clutter of dealing with async can be changed to async await
  var info = {
    path: folderName,
    name: path.basename(folderName)
  };
  if (stats.isDirectory()) {
    info.type = "directory";
    info.children = fs.readdirSync(folderName).map(function(child) {
      return printTree(path.join(folderName, child));
    });
  } else{
    info.type = "file";
  }
  return info;
}

console.log(util.inspect(printTree(process.argv[2]),{depth: 4}));

module.exports = printTree;
