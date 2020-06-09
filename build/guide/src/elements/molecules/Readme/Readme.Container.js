export const GuideReadme = (el) => {
  const ui = {
    el,
    examplesReadmeTogglers: document.querySelectorAll('.guide__readme-toggler'),
    jsxDocsTable: document.querySelector('.jsx .guide__table__body'),
    esEventsTable: document.querySelector('.js-events .guide__table__body'),
    esMethodsTable: document.querySelector('.js-methods .guide__table__body'),
    esSelectorsTable: document.querySelector('.js-selectors .guide__table__body')
  };

  const getElementName = (data) => data.split('/')[data.split('/').length - 1];

  const data = {
    name: getElementName(window.location.href),
    jsxDocs: global.__jsxDocs__[getElementName(window.location.href)][getElementName(window.location.href)], // eslint-disable-line
    esDocs: global.__esDocs__[getElementName(window.location.href)] // eslint-disable-line
  };

  // Used to build props list on example pages
  const jsxPropsListing = () => {
    const collection = [];
    Object.keys(data.jsxDocs.props).map((i, index) => {
      const prop = data.jsxDocs.props[i];
      collection.push(`
        <tr class="guide__table__row" key=${index}>
          <td class="guide__table__data"><strong>${i}</strong></td>
          <td class="guide__table__data">${prop.type.raw.replace(/PropTypes\./g, '')}</td>
          <td class="guide__table__data">${(prop.description) ? prop.description : '<div className="doc-error">Missing description</div>'}</td>
        </tr>
      `);

      return false;
    });

    return collection.join('');
  };

  const esMethodsListing = () => {
    const collection = [];

    Object.keys(data.esDocs.methods).map((i, index) => {
      const method = data.esDocs.methods[i];
      collection.push(`
        <tr class="guide__table__row" key=${index}>
          <td class="guide__table__data"><strong>${method.name}(${(method.params.length) ? 'Params' : ''})</strong></td>
          <td class="guide__table__data">${method.type}</td>
          <td class="guide__table__data">${(method.params.length) ? `(${method.params.join(', ')})` : '--'}</td>
          <td class="guide__table__data">${(method.comment) ? method.comment : '--'}</td>
        </tr>
      `);

      return false;
    });

    return collection.join('');
  };

  const esEventsListing = () => {
    const collection = [];

    Object.keys(data.esDocs.events).map((i, index) => {
      const event = data.esDocs.events[i];
      collection.push(`
        <tr class="guide__table__row" key=${index}>
          <td class="guide__table__data"><strong>${event.element}.addEventListener(<br/>&nbsp;&nbsp;'${event.eventType}',<br/>&nbsp;&nbsp;${(event.callbackType === 'ArrowFunctionExpression') ? `(${event.callbackParams.join(', ')}) => {}<br/>` : `function(${event.callbackParams.join(', ')}) {}<br/>`})</strong></td>
          <td class="guide__table__data">${event.callbackType}</td>
          <td class="guide__table__data">${event.callbackParams.join(', ')}</td>
          <td class="guide__table__data">
            <a class="guide__link guide__link--default open-local" href="/api?lineNumber=${event.line}&openLocal=${event.file}">${getElementName(event.file.replace(/\\/g, '/'))}:${event.line}</a>
          </td>
        </tr>
      `);

      return false;
    });

    return collection.join('');
  };

  const esSelectorsListing = () => {
    const collection = [];

    Object.keys(data.esDocs.selectors).map((i, index) => {
      const selector = data.esDocs.selectors[i];
      collection.push(`
        <tr class="guide__table__row" key=${index}>
          <td class="guide__table__data">
            <strong>
              ${selector.element}.${selector.selectorType}(${(selector.selector.indexOf('${') !== -1) ? `\`${selector.selector}\`` : `'${selector.selector}'`})
            </strong>
          </td>
          <td class="guide__table__data">
            <a class="guide__link guide__link--default open-local" href="/api?lineNumber=${selector.line}&openLocal=${selector.file}">${getElementName(selector.file.replace(/\\/g, '/'))}:${selector.line}</a>
          </td>
        </tr>
      `);

      return false;
    });

    return collection.join('');
  };

  // Toggle open and close example page's "Read me" section
  const toggleExamplesReadmeTable = (target) => {
    const table = target.parentNode.querySelector('.guide__readme-togglee');
    // we don't use the classList.toggle() method due to IE11.
    if (table.classList.contains('hidden')) {
      table.classList.remove('hidden');
      target.classList.add('open');
    } else {
      table.classList.add('hidden');
      target.classList.remove('open');
    }
  };

  const init = () => {
    ui.jsxDocsTable.innerHTML = jsxPropsListing();
    ui.esEventsTable.innerHTML = esEventsListing();
    ui.esMethodsTable.innerHTML = esMethodsListing();
    ui.esSelectorsTable.innerHTML = esSelectorsListing();

    ui.el.addEventListener('click', (event) => {
      const { target } = event;
      if (target.classList.contains('open-local')) {
        Utils.XHR(target.href, {
          type: 'get'
        });
        event.preventDefault();
      }

      return false;
    });

    // Sets up open/close toggle event for both props and methods readme headers
    if (ui.examplesReadmeTogglers) {
      Object.keys(ui.examplesReadmeTogglers).map((index) => {
        const trigger = ui.examplesReadmeTogglers[index];
        trigger.addEventListener('click', () => {
          toggleExamplesReadmeTable(trigger);
        });

        return true;
      });
    }
  };

  init();
};

export default GuideReadme;
