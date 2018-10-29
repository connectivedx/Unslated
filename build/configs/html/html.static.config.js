const path = require('path');
import Guide from '@guide/guide.jsx';
import Nav from '@guide/partials/nav/guide__nav.jsx';
import Examples from '@guide/partials/examples/guide__examples.jsx';


const readDirectory = (context) => {
  const collection = [];
  context.keys().forEach(key => collection[key] = context(key));

  return collection;
};

export default class statics {
  constructor() {
    this.collection = [];
    this.elements = readDirectory(require.context('@elements/', true, /\.example.jsx$/));

    Object.keys(this.elements).map((key, index) => {
      
      const props = {
        url: ['examples', key.split('.').slice(0, -1).slice(0, -1).pop()].join(''),
        atomicLevel: key.replace('./', '').split('/')[0],
        name: key.split('/').slice(-1)[0].split('.')[0]
      };
      props['guide'] = '<div class="guide">' +
        ReactDOMServer.renderToString(Nav({
          elements: Utils.getExamples()
        }))
      +'<main class="guide__main">'+
        ReactDOMServer.renderToString(
          Examples({
            match: {
              params: {
                category: props.atomicLevel, 
                element: props.name
              }
            },
            examples: Utils.getExamples()
          })
        )
      +'</main></div>';


      this.collection.push(props);
    });
  }
};

global.statics = new statics();
