import '@atoms/Icon/IconSet'; // see ./src/elements/atoms/Icon/IconSet.js
import '@elements/examples'; // see ./src/elements/examples.jsx
import '@elements/styles'; // see ./src/elements/styles.jsx
import ReactDOM from "react-dom";
import Guide from '@guide/guide';
import GuideJS from '@guide/guide.container.js';

// Development
if (Utils.getBuildType() === 'development') { 
  ReactDOM.render(<Guide />, document.getElementById("index"));
  new GuideJS();
}

//Production
if (Utils.getBuildType() === 'production') { }