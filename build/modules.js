/*
	This script is used to determin if a npm install of required dependecies is needed during a production build.
	Both ensure never any missing dependencies, while also speeding builds up when a npm install is not needed.
*/
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const _package = require('../package.json');

// Using package.json's dest config location to capture our last builds timestamp
console.log('Checking dependencies . . .');
fs.stat(_package.directories.dest, function(err, dstats){
  if (err) {
    return false;
  }
  const destLastModifiedTime = new Date(dstats.mtime).getTime();
  fs.stat(path.resolve(__dirname, '../package.json'), function(err, pstats){
    if (err) {
      return false;
    }
    const packageLastModifiedTime = new Date(pstats.mtime).getTime();
    if (packageLastModifiedTime >= destLastModifiedTime) {
			exec('npm install');
		}
	});
});
