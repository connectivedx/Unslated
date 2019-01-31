const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const express = require('express');
const app = express();
/*const HeadlessChrome = require('simple-headless-chrome');

const browser = new HeadlessChrome({
  headless: false,
  launchChrome: true,
  chrome: {
    host: 'localhost',
    port: 8001, // Chrome Docker default port
    remote: false,
  },
  browserlog: true
});*/

/*async function navigateWebsite(callback) {
  let tab;
  try {
    await browser.init()

    // Open a new Tab
    tab = await browser.newTab({ privateTab: false })

    // Navigate to a URL
    await tab.goTo('http://localhost:8080/examples/atoms/Icon/Icon');

    callback(tab);
  } catch (err) {
    console.log('ERROR!', err)
  }

  return false;
}*/

/*async function screencapUrl(url, filename) {
  try {
    await browser.init()

    tab = await browser.newTab({ privateTab: false })

    // Navigate to a URL
    await tab.goTo(url);

    // Take a screenshot of the full page
    tab.saveScreenshot('./'+filename+'-full', {
      fullPage: true
    })

    browser.close();

  } catch (err) {
    console.log('ERROR!', err)
  }
}*/

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

  /* Pass Create Element XHR request to Scaffolding.build.js */
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
          'new',
          query.new, 
          query.name.replace(/(\w)(\w*)/g, (g0,g1,g2) => {return g1.toUpperCase() + g2.toLowerCase();}).trim()
        ]
      );
    }
  }

  /* Pass Rename Element XHR request to Scaffolding.build.js */
  if (query.rename) {
    runNodeScript(
      path.resolve(__dirname, '../scaffolding/scaffolding.build.js'),
      [
        'rename',
        query.path,
        query.name.replace(/(\w)(\w*)/g, (g0,g1,g2) => {return g1.toUpperCase() + g2.toLowerCase();}).trim()
      ]
    );    
  }

  /* Pass Remove Element XHR request to Scaffolding.build.js */
  if (query.remove) {
    runNodeScript(
      path.resolve(__dirname, '../scaffolding/scaffolding.build.js'),
      [
        'remove',
        query.path
      ]
    )
  }

  /* Takes screenshot of requested page */
  if (query.screencap) {
    screencapUrl('http://localhost:8080/tools/icons', 'icons');
  }
});


/*app.get('/speeds', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.send();
  next();
});*/

app.listen(8000, () => {
    console.log('Press Ctrl+C to quit.');
});
