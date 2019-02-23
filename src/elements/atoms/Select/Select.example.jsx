/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (noPadding: true)
    - Dark Background variant (darkBackground: true)

  Example:
    ```
      examples: [{
        name: 'Default styling',
        component: (
          <Component>Lorem ipsum</Component>
        ),
        options: {
          noPadding: true,
          darkBackground: true
        }
      },
    ```
*/

import Select from './Select';

export default [{
  examples: [{
    name: 'Default Select Inputs (Stacked bottom)',
    component: (
      <Select id="select-01" label="Inline select label text" name="select" required={true} error="This field is required" defaultValue="1">
        <option value="" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Select Inputs (Without label)',
    component: (
      <Select id="select-05" label={false} required={true} name="select" error="This field is required" defaultValue="1">
        <option value="" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Public DOM methods',
    component: (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Select className="dom-methods" id="select-05" label={false} required={true} name="select" error="This field is required" defaultValue="1">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <button
              className="button button--default button--full"
              type="button"
              onClick={
                function () { document.querySelector('.dom-methods').open(); } // eslint-disable-line
              }
            >
              DOMElm.open&#x00028;&#x00029;
            </button>
          </span>
          <span>
            <button
              className="button button--default button--full"
              type="button"
              onClick={
                function () { document.querySelector('.dom-methods').close(); } // eslint-disable-line
              }
            >
              DOMElm.close&#x00028;&#x00029;
            </button>
          </span>
          <span>
            <button
              className="button button--default button--full"
              type="button"
              onClick={
                function () { document.querySelector('.dom-methods').choose(Math.floor(Math.random() * document.querySelectorAll('.dom-methods option').length)); } // eslint-disable-line
              }
            >
              DOMElm.choose&#x00028;&#x00029;
            </button>
          </span>
        </div>
      </div>
    ),
    notes: ''
  }, {
    name: 'Mutation Observer',
    component: (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Select className="dom-mutations" id="select-06" label={false} required={true} name="select" error="This field is required" defaultValue="1">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <button
              className="button button--default button--full"
              type="button"
              onClick={
                function () { document.querySelector('.dom-mutations select').innerHTML += '<option value="">'+Math.floor(Math.random() * 100)+'</option>'; } // eslint-disable-line
              }
            >
              Add &#x0003C;option&#x0003E;
            </button>
          </span>
          <span>
            <button
              className="button button--default button--full"
              type="button"
              onClick={
                function () { var option = document.querySelectorAll('.dom-mutations option')[0]; if (option) { option.parentNode.remove(option); }  } // eslint-disable-line
              }
            >
              Remove &#x0003C;option&#x0003E;
            </button>
          </span>
        </div>
      </div>
    ),
    notes: ''
  }]
}];
