/*
	This file holds helper methods used by Unslated's package.json script configurations.
  These methods help abstract common build tasks off of the package.json file and ultimatly the end user's terminal.

  Please note that this file is a node.js file, so no exporting happens here, but instead arguments are sent to this file via command line scripts setup in package.json
*/

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const Package = require('../../package.json');
const params = process.argv;
const cmd = params[2];

/*
  sync() is a helper methods used to see if our we have missing
  node module dependencies that need to be downloaded prior to running a build.
*/
const sync = () => {
  if (fs.existsSync(path.resolve(__dirname, `../../node_modules`))){
    console.log('Checking dependencies . . .');
    fs.stat(Package.directories.dest, function(err, dstats){
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
          console.log('Updating dependencies! This may effect cache, please hold . . .');
          exec('npm install');
        }
      });
    });
  } else {
    console.log('Welcome to Unslated!');
    console.log('Installing dependencies . . .');
    exec('npm install');
    console.log('Running build! Please allow time for cache to be built for first time. . . .');
  }
};

/*
  static() is a helper method used to check our package.json configuration
  and determin how to route static build requests based on if enabled, what type of static etc.
*/
const static = () => {
  if (Package.statics.enable === true) {
    exec('webpack --config ./build/configs/static.config.js --mode production');
  }
};


// Here we take our cmd variable and determin what method to run:
if (cmd === 'sync') {
  sync();
}

if (cmd === 'static') {
  static();
}


