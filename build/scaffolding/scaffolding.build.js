const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");

// The arguments come in as a object without keys so we loop over it into a new object with indexes.
let params = process.argv;
params.shift(); // cleans ref url from argv
params.shift(); // cleans script url from argv

const cmd = params[0];
const type = params[1];
const name = params[2];

const replaceTokens = (targetFile, name) => {
  // our new filename in path form.
  let fileName = targetFile.replace('[name]', name);
  let cssName = name.replace(/[^A-Z](?=[A-Z])/g, '$&-').toLowerCase();

  if (type === 'pages' || type === 'variables') {
    fileName = fileName.toLowerCase();
  }

  // searches the contents of the file for {{name}} tokens to replace with requested element name
  fs.readFile(targetFile, 'utf8', (err, data) => {
    if (err) { return console.log(err); }

    // replace tokens with name or cssName accordinly.
    const result = data.replace(/\{\{name\}\}/g, name).replace(/\{\{cssName\}\}/g, cssName);

    // write our results back to file
    fs.writeFile(fileName, result, 'utf8', err => {
       if (err) return console.log(err);
    });
  });

  // next we rename the file to our new name
  fs.rename(targetFile, fileName, (err) => {
    if ( err ) console.log('ERROR: ' + err);
  });
};

// manaul re-trigger of webpack-dev-server after having deleted an element
const triggerRebuild = () => {
  fs.readFile(path.resolve(__dirname, '../../src/elements/atoms/Root/Root.css'), 'utf8', (err, data) => {
    if (err) throw err;
    fs.writeFile (path.resolve(__dirname, '../../src/elements/atoms/Root/Root.css'), data, (err) => {
      if (err) throw err;
    });
  });
};

// Builds a new atomic element from scaffolding templates
class CreateAtomicElement {
  constructor(args) {
    // schema of different scaffolding types. atoms, molecules, modifiers, organisms and templates use elements schema.
    this.files = {
      pages: {
        src: path.resolve(__dirname, './pages'),
        target: path.resolve(__dirname, '../../src/pages/')
      },
      variables: {
        src: path.resolve(__dirname, './variables'),
        target: path.resolve(__dirname, '../../src/variables/')
      },
      modifiers: {
        src: path.resolve(__dirname, './modifiers'),
        target: path.resolve(__dirname, '../../src/elements/modifiers/'+name)
      },      
      elements: {
        src: path.resolve(__dirname, './elements'),
        target: path.resolve(__dirname, '../../src/elements/'+type+'/'+name)
      }
    };
    
    // finally we use the BuildElement method.
    this.buildElement(
      (this.files[type]) ? this.files[type] : this.files['elements']
    );
  }

  // Method to copy one directory to another directory
  copyFolderRecursiveSync(source, target) {
      let files = [];

      // Supporting Method to copy a file from one directory to another directory
      const copyFileSync = (source, target) => {
        let targetFile = target;
        // check to make sure our target folder indeed exists
        if ( fs.existsSync( target ) ) {
            if ( fs.lstatSync( target ).isDirectory() ) {
                targetFile = path.join( 
                  target,
                  path.basename( source )
                );
            }
        }

        // write our collected files from source to target location
        fs.writeFileSync(targetFile, fs.readFileSync(source));

        // string replace file name and file contents with new name
        replaceTokens(
          targetFile,
          name
        );
      }

      //check if folder needs to be created or integrated
      const targetFolder = target;
      if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
      }

      //copy
      if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach(file => {
          const curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
            this.copyFolderRecursiveSync(
              curSource,
              targetFolder
            );
          } else {
            copyFileSync(
              curSource,
              targetFolder,
              name
            );
          }
        });
      }
  }

  buildElement(config) {
    if (!this.files[type]) { // check for existing element folders
      if (fs.existsSync(config.target)){
        console.log(
          '\n\r',
          `ERROR: ${type} / ${name} element already exists.
          \n\rPlease choose a new name and try again.`, 
          '\n\r'
        );
        return;
      }
    } else {  // check for existing files
      if (fs.existsSync(config.target+'/'+name)){
        console.log(
          '\n\r', 
          `ERROR: ${type}/${name} element already exists.
          \n\rPlease choose a new name and try again.`,
          '\n\r'
        );
        return;
      }
    }

    // If this element name is not in pascel format, we bail and perform a pretty console log
    if (!new RegExp(/^[A-Z]/g).test(name)) {
      console.log('\n\r', 'ERROR: "' + name + '" is not in pascal format.\n\r\n\r');
      console.log('Good Example: NewElement\x1b[41m');
      console.log('Bad Examples: newElement, new-element, newelement\n\r');
      console.log('Please choose a new name and try again.');
      return;
    }

    this.copyFolderRecursiveSync(
      config.src,
      config.target
    );

    console.log(
      '\n\r',
      `Success: ${name} can now be found under ${type}/${name}`,
      '\n\r'
    );
  }
}

// Remove atomic element from src
class RemoveAtomicElement {
  constructor() {
    this.removeElement();
  }

  removeElement() {
    rimraf(path.resolve(__dirname, ['../../', type].join('')), () => {
      triggerRebuild();
    });
  }
}

// Renames atomic element files, folder and use case of old name to new
class RenameAtomicElement {
  constructor() {

    if (type.indexOf('.') === -1) { // multi-file rename
      this.renameElement(fs.readdirSync(
        path.resolve(
          __dirname,
          ['../../', type].join('')
        )
      ), type);
    } else { // single file rename
      this.renameElement(path.resolve(__dirname, ['../../', type].join('')));
    }
  }

  renameContents(targetFile, oldName, newName) {
    const oldCSSName = oldName.replace(/[^A-Z](?=[A-Z])/g, '$&-').toLowerCase();
    const newCSSName = name.replace(/[^A-Z](?=[A-Z])/g, '$&-').toLowerCase();

    const oldNameRegEx = new RegExp(oldName, 'g');
    const oldCssNameRegEx = new RegExp(oldCSSName, 'g');

    fs.readFile(targetFile, 'utf8', (err, data) => {
      if (err) { return console.log(err); }

      // replace tokens with name or cssName accordinly.
      const result = data.replace(oldNameRegEx, newName).replace(oldCssNameRegEx, newCSSName);

      // write our results back to file
      fs.writeFile(targetFile, result, 'utf8', err => {
         if (err) return console.log(err);
      });
    });
  }

  renameElement(files, path) {
    if (typeof files === 'object') {
      const elementName = files[0].split('.')[0];
      const hasJsx = (files.indexOf([elementName, '.jsx'].join('')) !== -1);
      const hasCss = (files.indexOf([elementName, '.css'].join('')) !== -1);
      const hasExample = (files.indexOf([elementName, '.example.jsx'].join('')) !== -1);
      const hasTest = (files.indexOf([elementName, '.test.jsx'].join('')) !== -1);

      const setTmpState = (type) => {
        const oldPath = [path, '/', elementName, type].join('');
        const newTmpPath = [path, '/', elementName, type, '.tmp'].join('');
        fs.rename(oldPath, newTmpPath, (err) => {
          if ( err ) console.log('ERROR: ' + err);
          this.renameContents(newTmpPath, elementName, name);
        });
      };

      const restoreState = (type) => {
        const tmpPath = [path, '/', elementName, type, '.tmp'].join('');
        const newPath = [path, '/', name, type].join('');
        fs.rename(tmpPath, newPath, (err) => {
          if ( err ) console.log('ERROR: ' + err);
        });
      };

      // ORDER OF OPERATION HERE MATTERS!!!
      // Take files into tmp state
      if (hasExample) { setTmpState('.example.jsx'); }
      if (hasTest) { setTmpState('.test.jsx'); }
      if (hasCss) { setTmpState('.css'); }
      if (hasJsx) { setTmpState('.jsx'); }

      // ORDER OF OPERATION HERE MATTERS!!!
      // Take files out of tmp state
      setTimeout(() => {
        if (hasJsx) { restoreState('.jsx'); }
        if (hasCss) { restoreState('.css'); }
        if (hasExample) { restoreState('.example.jsx'); }
        if (hasTest) { restoreState('.test.jsx'); }

        // Rename parent folder
        setTimeout(() => {
          const oldFolder = path;
          const newFolder = path.replace(elementName, name);
          fs.rename(oldFolder, newFolder, (err) => {
            if ( err ) console.log('ERROR: ' + err);

            // Flush webpack by triggering a rebuild
            setTimeout(() => {
              triggerRebuild();
            }, 250);
          });
        }, 25);
      }, 250);
    }
  }
}

// process.argv is a Webpack global object that contains webpack.config.js -> script arguments 
// (build/configs/webpack.config.js -> [scripts object] to see arguments passed here)
if (cmd === 'new') {
  new CreateAtomicElement();
}

if (cmd === 'rename') {
  new RenameAtomicElement();
}

if (cmd === 'remove') {
  new RemoveAtomicElement();
}
