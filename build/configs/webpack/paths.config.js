/*
  Shared build paths
  This is used to overload any pathing configuration set in package.json for dev builds.
  Note: global object is only available to the build system, not any guide or assets being rendered by browser.
*/

const Package = require('../../../package.json');

global.buildType = (process.argv.indexOf('development') !== -1) ? 'development' : 'production';

global.directories = {
  dest: (global.buildType === 'development') ? './dist' : Package.directories.dest,
  assetPath: (global.buildType === 'development') ? '/assets' : Package.directories.assetPath,
  publicPath: (global.buildType === 'development')? '/' : Package.directories.publicPath
};

global.statics = {
  dest: Package.statics.dest
}
