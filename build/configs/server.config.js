// Dev server configuration
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const package = require('../../package.json');
 
// Helper method to pass requests to scaffolding.build.js node scripts
const runNodeScript = (scriptPath, arguments, callback) => {
  let invoked = false;
  const process = childProcess.fork(scriptPath, arguments);

  process.on('error', (err) => {
      if (invoked) return;
      invoked = true;
      if (typeof callback === 'function') {
        callback(err);
      }
  });

  process.on('exit', (code) => {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      if (typeof callback === 'function') {
        callback(err);
      }
  });
}

module.exports = {
  config: {
    devServer: {
      port: package.server.port,                 // package.json is this config entry point (see: https://webpack.js.org/configuration/dev-server/#devserver-port)
      host: package.server.host,                 // package.json is this config entry point (see: https://webpack.js.org/configuration/dev-server/#devserver-host)
      allowedHosts: package.server.allowedHosts, // package.json is this config entry point (see: https://webpack.js.org/configuration/dev-server/#devserver-allowedhosts)
      before: (app, server) => {                 // Webpack-dev-server routes (see: https://webpack.js.org/configuration/dev-server/#devserver-before)
        // All unslated GUI /api calls funneled here
        app.get('/api', (req, res) => {
          const query = res.req.query;
          const input = res.req.query.input;
          
          // Create new element
          if (query.new) {
            if ([
                'atoms',
                'molecules',
                'modifiers',
                'organisms',
                'templates',
                'pages',
                'variables'
              ].indexOf(query.new) !== -1) {
              if (!query.name) { return; }
              // Passes XHR to Scaffolding.build.js
              runNodeScript(
                path.resolve(__dirname, '../scaffolding/scaffolding.build.js'),
                [
                  'new',
                  query.new, 
                  query.name.replace(/(\w)(\w*)/g, (g0,g1,g2) => {return g1.toUpperCase() + g2.toLowerCase();}).trim()
                ]
              );
            }
          }

          // Rename element
          if (query.rename) {
            // Passes XHR to Scaffolding.build.js
            runNodeScript(
              path.resolve(__dirname, '../scaffolding/scaffolding.build.js'),
              [
                'rename',
                query.path,
                query.name.replace(/(\w)(\w*)/g, (g0,g1,g2) => {return g1.toUpperCase() + g2.toLowerCase();}).trim()
              ]
            );   
          }

          // Add new element
          if (query.remove) {
            // Passes XHR to Scaffolding.build.js
            runNodeScript(
              path.resolve(__dirname, '../scaffolding/scaffolding.build.js'),
              [
                'remove',
                query.path
              ]
            )
          }

          res.send();
        });
      }
    }
  },
  plugins: []
};
