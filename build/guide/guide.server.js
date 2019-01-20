const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const express = require('express');
const app = express();

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

app.use(express.json());

app.use(path.resolve(__dirname, '../../src'), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const query = res.req.query;
  let input = res.req.query.input;
  res.send();
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

      runNodeScript(
        path.resolve(__dirname, '../scaffolding/scaffolding.build.js'),
        [
          query.new, 
          query.name.replace(/(\w)(\w*)/g, (g0,g1,g2) => {return g1.toUpperCase() + g2.toLowerCase();}).trim()
        ]
      );
    }
  }
});

app.listen(8000, () => {
    console.log('Press Ctrl+C to quit.');
});
