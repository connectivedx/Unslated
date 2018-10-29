const churn = require('../../../dist/assets/js/static.js');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const statics = global.statics.collection;
const guideMarkup = global.statics.guide;

console.log(global.statics);

if (!fs.existsSync('./dist/tmp')) {
	fs.mkdirSync('./dist/tmp');
}

// First we build our folders up
Object.keys(statics).map(index => {
	const elementName = statics[index].name;
	const atomicLevel = statics[index].atomicLevel;
	
	if (!fs.existsSync('./dist/tmp/' + atomicLevel)) {
		fs.mkdirSync('./dist/tmp/' + atomicLevel);
	}

	if (!fs.existsSync('./dist/tmp/' + atomicLevel + '/' + elementName)) {
		fs.mkdirSync('./dist/tmp/' + atomicLevel + '/' + elementName);
	}

  fs.writeFile(
  	'./dist/tmp/' + atomicLevel + '/' + elementName + '/' + elementName + '.html', 
  	statics[index].guide, 
  	'utf8', err => {
	     if (err) return console.log(err);
	  }
	);
});
// Next we parse each example into a guide example partial and dump into new element folders

// console.log(ReactDOMServer.renderToStaticMarkup(getExamples()[0].examples[0].examples[0].component));