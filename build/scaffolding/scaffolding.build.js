const fs = require('fs');
const path = require('path');

// Builds a new atomic element from scaffolding templates
class CreateAtomicElement {
  constructor(args) {
  	// The arguments come in as a object without keys so we loop over it into a new object with indexes.
  	const params = Object.keys(args).map(index => {
  		return args[index];
  	});

  	// create a new class variable that defines the atomic type (atom, molecule, organism etc.)
  	this.type = params[params.length - 2];

  	// create a new class variable that defines the new atomic element's name. (pascel format)
  	this.name = params[params.length -1];

  	// creates a new class variable that defines the new atomic element's class name (css format)
  	this.cssName = this.name.replace(/[^A-Z](?=[A-Z])/g, '$&-').toLowerCase();

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
  		elements: {
  			src: path.resolve(__dirname, './elements'),
  			target: path.resolve(__dirname, '../../src/elements/'+this.type+'/'+this.name)
  		}
  	};
  	
  	// finally we use the BuildElement method.
  	this.buildElement(
  		(this.files[this.type]) ? this.files[this.type] : this.files['elements']
  	);
  }

  // Method to rename both file and file contents
  tokenReplace(targetFile) {
  	// our new filename in path form.
  	let fileName = targetFile.replace('[name]', this.name);

  	if (this.type === 'pages' || this.type === 'variables') {
  		fileName = fileName.toLowerCase();
  	}

		// searches the contents of the file for {{name}} tokens to replace with requested element name
		fs.readFile(targetFile, 'utf8', (err, data) => {
		  if (err) { return console.log(err); }

		  // replace tokens with name or cssName accordinly.
		  const result = data.replace(/\{\{name\}\}/g, this.name).replace(/\{\{cssName\}\}/g, this.cssName);

		  // write our results back to file
		  fs.writeFile(fileName, result, 'utf8', err => {
		     if (err) return console.log(err);
		  });
		});

  	// next we rename the file to our new name
		fs.rename(targetFile, fileName, (err) => {
		    if ( err ) console.log('ERROR: ' + err);
		});
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
		    this.tokenReplace(
		    	targetFile,
		    	this.name
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
            	this.name
            );
          }
        });
	    }
	}

  buildElement(config) {
  	if (!this.files[this.type]) { // check for existing element folders
			if (fs.existsSync(config.target)){
				console.log(
					'\n\r',
					`ERROR: ${this.type} / ${this.name} element already exists.
					\n\rPlease choose a new name and try again.`, 
					'\n\r'
				);
				return;
			}
		} else {  // check for existing files
			if (fs.existsSync(config.target+'/'+this.name)){
				console.log(
					'\n\r', 
					`ERROR: ${this.type}/${this.name} element already exists.
					\n\rPlease choose a new name and try again.`,
					'\n\r'
				);
				return;
			}
		}

		// If this element name is not in pascel format, we bail and perform a pretty console log
  	if (!new RegExp(/^[A-Z]/g).test(this.name)) {
  		console.log('\n\r', 'ERROR: "' + this.name + '" is not in pascal format.\n\r\n\r');
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
			`Success: ${this.name} can now be found under ${this.type}/${this.name}`,
			'\n\r'
		);
  }
}

// process.argv is a Webpack global object that contains webpack.config.js -> script arguments 
// (build/configs/webpack.config.js -> [scripts object] to see arguments passed here)
new CreateAtomicElement(process.argv);
