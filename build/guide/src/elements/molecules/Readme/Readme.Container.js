export const GuideReadme = (el) => {
  const ui = {
    el,
    examplesReadmeTogglers: document.querySelectorAll('.guide__readme-toggler'),
    jsxTables: document.querySelector('.jsx-tags'),
    esTables: document.querySelector('.js-events').parentNode,
    esEventsTable: document.querySelector('.js-events .guide__table__body'),
    esMethodsTable: document.querySelector('.js-methods .guide__table__body'),
    esSelectorsTable: document.querySelector('.js-selectors .guide__table__body')
  };

  const getElementName = (data) => data.split('/')[data.split('/').length - 1];

  const data = {
    name: getElementName(window.location.href),
    jsxDocs: global.__jsxDocs__[getElementName(window.location.href)], // eslint-disable-line
    esDocs: global.__esDocs__[getElementName(window.location.href)] // eslint-disable-line
  };

  // Used to build props list on example pages
  const jsxPropsListing = () => {
    const collection = [];
    if (data.jsxDocs) {
      Object.keys(data.jsxDocs.Tags).map((i, index) => {
        const elementProps = data.jsxDocs.Tags[i].props;

        collection.push(`
        <h4 class="guide__heading guide__heading--medium guide__heading--h4">&lt;${i}&gt;</h4>
        <p>${data.jsxDocs.Tags[i].description}</p>
        <table class="guide__table guide__table--default">
          <thead class="guide__table__head">
            <tr class="guide__table__row">
              <th width="10%" class="guide__table__header">Name</th>
              <th width="10%" class="guide__table__header">Kind</th>
              <th width="15%" class="guide__table__header">Types</th>
              <th width="10%" class="guide__table__header">Required</th>
              <th width="45%" class="guide__table__header">Comment</th>
            </tr>
          </thead>
          <tbody>
      `);

        Object.keys(elementProps).map((j) => {
          const prop = elementProps[j];

          collection.push(`
            <tr class="guide__table__row" key=${index}>
              <td class="guide__table__data"><strong>${prop.name}</strong></td>
              <td class="guide__table__data">${prop.type}</td>
              <td class="guide__table__data">${(prop.value.indexOf('oneOf') !== -1) ? prop.value.replace(/(.*?)\(\[(.*?)\]\)/, '$2').replace(/PropTypes./g, '').replace(/,/g, '<br />') : '--'}</td>
              <td class="guide__table__data">${prop.required}</td>
              <td class="guide__table__data">${(prop.description) ? prop.description : '<div className="doc-error">Missing description</div>'}</td>
            </tr>
          `);

          return false;
        });

        collection.push('</tbody></table>');

        return false;
      });
    }

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
    if (data.jsxDocs) {
      ui.jsxTables.innerHTML = `${ui.jsxTables.innerHTML} ${jsxPropsListing()}`;
    } else {
      ui.jsxTables.innerHTML = '<strong>Currently there is no JSX tags associated with this element</strong>';
    }

    if (data.esDocs) {
      if (data.esDocs.events) {
        ui.esEventsTable.innerHTML = esEventsListing();
      }

      if (data.esDocs.methods) {
        ui.esMethodsTable.innerHTML = esMethodsListing();
      }

      if (data.esDocs.selectors) {
        ui.esSelectorsTable.innerHTML = esSelectorsListing();
      }
    } else {
      ui.esTables.innerHTML = '<strong>Currently there is no Javascript associated with this element</strong>';
    }

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
