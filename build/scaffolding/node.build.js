/*
	This file holds helper methods used by Unslated's package.json script configurations.
  These methods help abstract common build tasks off of the package.json file and ultimatly the end user's terminal.

  Please note that this file is a node.js file, so no exporting happens here, but instead arguments are sent to this file via command line scripts setup in package.json
*/

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const Package = require('../../package.json');
const params = process.argv;
const cmd = params[2];

/*
  sync() is a helper methods used to see if our we have missing
  node module dependencies that need to be downloaded prior to running a build.
*/
const sync = () => {
  // First lets check to make sure end user has correct version of NODEJS installed on machine!
  const systemNode = process.version.replace('v', '');
  const neededNode = Package.engines.node.replace('>', '').replace('=', '');

  console.log('\x1b[33mChecking system node version . . .\x1b[37m');

  if (systemNode < neededNode) {
    console.log(`\x1b[31mError: System NodeJS version is \x1b[33m${systemNode}\x1b[31m, while this project requires \x1b[33m${neededNode}\x1b[31m!\nPlease use the recommended version and try again.\x1b[37m`);
    process.exit(1);
    return false;
  }

  if (fs.existsSync(path.resolve(__dirname, `../../node_modules`))){
    console.log('\x1b[33mChecking dependencies . . .\x1b[37m');

    let needsSyncing = false;
    let dependencies = {
      ...Package.devDependencies,
      ...Package.dependencies
    };

    // loop over dependencies and compair expressed version vs node_module package.json versions
    Object.keys(dependencies).map((i) => {
      const dependency = dependencies[i];

      if (!fs.existsSync(path.resolve(__dirname, `../../node_modules/${i}`))) {
        needsSyncing = true;
      } else {
        const data = fs.readFileSync(path.resolve(__dirname, `../../node_modules/${i}/package.json`));
        const isFlagged = (dependency.indexOf('^') !== -1);
        const pkgVersion = parseInt(dependency.replace('^', '').replace('~', '').replace(/\./g, ''));
        const modVersion = parseInt(JSON.parse(data).version.replace(/\./g, ''));

        if (isFlagged) {
          if (pkgVersion > modVersion) {
            needsSyncing = true;
          }
        } else {
          if (pkgVersion < modVersion) {
            needsSyncing = true;
          }
        }
      }
    });

    if (needsSyncing === true) {
      console.log('\x1b[33mUpdating dependencies! This may effect cache, please hold . . .\x1b[37m');
      execSync('npm install', {stdio:[0,1,2]});
    } else {
      console.log('\x1b[32mBuild is now starting . . .\x1b[37m')
    }
  } else {
    console.log('Welcome to Unslated!');
    console.log('Installing dependencies . . .');
    execSync('npm install', {stdio:[0,1,2]});
    console.log('\x1b[32mBuild is now starting . . .\x1b[37m');
  }
};

/*
  static() is a helper method used to check our package.json configuration
  and determin how to route static build requests based on if enabled, what type of static etc.
*/
const static = () => {
  if (Package.statics.enable === true) {
    exec('webpack --config ./build/configs/statics.config.js --mode production');
  }
};


// Here we take our cmd variable and determin what method to run:
if (cmd === 'sync') {
  sync();
}

if (cmd === 'static') {
  static();
}


