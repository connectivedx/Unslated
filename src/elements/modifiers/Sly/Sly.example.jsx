/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      examples: [{
        name: 'Default styling',
        component: (
          <Component>Lorem ipsum</Component>
        ),
        options: {
          padding: '1rem',
          background: 'path/or/url/to/image(.jpg|.gif|.png|.svg)',
          brightness: 0.5,
        }
      },
    ```
*/
import Sly from '@sly';

export default [{
  examples: [
    {
      name: 'Default',
      description: '',
      component: (
        <Sly>Lorem ipsum</Sly>
      ),
      notes: ''
    }, {
      name: 'Use',
      description: '',
      component: (
        <React.Fragment>
          <Sly use={{ nav: 'navigation.js' }}>{'${nav.foo}'}</Sly>
          <Sly use={{ nav: 'Navigation' }}>{'${nav.foo}'}</Sly>
          <Sly use={{ nav: 'org.example.Navigation' }}>{'${nav.foo}'}</Sly>
          <Sly use={{ nav: '${\'navigation.js\' @parentPage=currentPage}' }}>{'${nav.foo}'}</Sly>
          <Sly use={{ nav: 'navTemplate.html' }}>{'${nav.foo}'}</Sly>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Unwrap',
      description: '',
      component: (
        <React.Fragment>
          <Sly unwrap use={{ nav: 'navigation.js' }}>
            <nav>
              Lorem ipsum
            </nav>
          </Sly>
          <Sly unwrap="${isPopup}">{'${nav.foo}'}</Sly>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Text',
      description: '',
      component: (
        <Sly tagName="p" text="${properties.jcr:description}">Lorem ipsum</Sly>
      ),
      notes: ''
    }, {
      name: 'Attribute',
      description: '',
      component: (
        <React.Fragment>
          <Sly tagName="p" title="Lorem Ipsum" attribute={{ title: '${properties.jcr:title}' }}>Lorem ipsum</Sly>
          <Sly
            tagName="p"
            title="Lorem Ipsum"
            attribute={{
              title: '${properties.jcr:title}',
              class: 'custom-class--here',
              id: 'custom-id'
            }}
          >
            Lorem ipsum
          </Sly>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Element',
      description: '',
      component: (
        <Sly tagName="h1" element="${titleLevel}">Lorem ipsum</Sly>
      ),
      notes: ''
    }, {
      name: 'Test',
      description: '',
      component: (
        <React.Fragment>
          <Sly tagName="p" test="${isShown}">
            Lorem ipsum
          </Sly>

          <Sly tagName="p" test={{ abc: '${a || b || c}' }}>
            is true
          </Sly>

          <Sly tagName="p" test="${!abc}">
            or not
          </Sly>

          <Sly tagName="div" test="${properties.jcr:title == 'test'}">
            TEST
          </Sly>

          <Sly tagName="div" test="${properties.jcr:title != 'test'}">
            NOT TEST
          </Sly>

          <Sly tagName="div" test="${properties['jcr:title'].length > 3}">
            Title is longer than 3
          </Sly>

          <Sly tagName="div" test="${properties['jcr:title'].length >= 0}">
            Title is longer or equal to zero
          </Sly>

          <Sly tagName="div" test="${properties['jcr:title'].length > aemComponent.MAX_LENGTH}">
            Title is longer than the limit of {'${aemComponent.MAX_LENGTH}'}
          </Sly>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'List',
      description: '',
      component: (
        <React.Fragment>
          <Sly tagName="dl" list="${currentPage.listChildren}">
            <dt>{'index: ${itemList.index}'}</dt>
            <dd>{'value: ${item.title}'}</dd>
          </Sly>

          <Sly tagName="dl" list={{ child: '${currentPage.listChildren}' }}>
            <dt>{'index: ${childList.index}'}</dt>
            <dd>{'value: ${child.title}'}</dd>
          </Sly>

          <Sly tagName="dl" list={{ child: '${myObj}' }}>
            <dt>{'key: ${child}'}</dt>
            <dd>{'value: ${myObj[child]}'}</dd>
          </Sly>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Resource',
      description: '',
      component: (
        <React.Fragment>
          {/* A simple resource include: */}
          <Sly tagName="article" resource="path/to/resource" />

          {/* Manipulating the path of the resource: */}
          <Sly tagName="article" resource="${ @ path='path/to/resource'}" />
          <Sly tagName="article" resource="${'resource' @ prependPath='my/path'}" />
          <Sly tagName="article" resource="${'my/path' @ appendPath='resource'}" />

          {/* Add (or replace) a selector: */}
          <Sly tagName="article" resource="${'path/to/resource' @ selectors='selector'}" />

          {/* Add, replace or remove multiple selectors: */}
          <Sly tagName="article" resource="${'path/to/resource' @ selectors=['s1', 's2']}" />

          {/* Add a selector to the existing ones: */}
          <Sly tagName="article" resource="${'path/to/resource' @ addSelectors='selector'}" />

          {/* Remove some selectors from the existing ones: */}
          <Sly tagName="article" resource="${'path/to/resource' @ removeSelectors='selector1'}" />

          {/* Remove all selectors: */}
          <Sly tagName="article" resource="${'path/to/resource' @ removeSelectors}" />

          {/* Overrides the resource type of the resource: */}
          <Sly tagName="article" resource="${'path/to/resource' @ resourceType='my/resource/type'}" />

          {/* Changes the WCM mode: */}
          <Sly tagName="article" resource="${'path/to/resource' @ wcmmode='disabled'}" />

          {/* By default, the AEM decoration tags are disabled, the decorationTagName option allows to bring them back, and the cssClassName to add classes to that element. */}
          <Sly tagName="article" resource="${'path/to/resource' @ decorationTagName='span', cssClassName='className'}" />
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Include',
      description: '',
      component: (
        <React.Fragment>
          {/* A simple include: */}
          <Sly include="path/to/template.html" />

          {/* JSPs can be included the same way: */}
          <Sly include="path/to/template.jsp" />

          {/* Options let you manipulate the path of the file: */}
          <Sly include="${ @ file='path/to/template.html'}" />
          <Sly include="${'template.html' @ prependPath='my/path'}" />
          <Sly include="${'my/path' @ appendPath='template.html'}" />

          {/* You can also change the WCM mode: */}
          <Sly include="${'template.html' @ wcmmode='disabled'}" />
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Template & Call',
      description: '',
      component: (
        <React.Fragment>
          {/* Define a static template and then call it: */}
          <Sly tagName="template" template={{ one: '' }}>blah</Sly>
          <Sly tagName="div" call="${one}" />

          {/* Define a dynamic template and then call it with parameters: */}
          <Sly tagName="template" template={{ two: '${ @ title}' }}><h1>{'${title}'}</h1></Sly>
          <Sly tagName="div" call="${two @ title=properties.jcr:title}" />

          {/* Templates located in a different file, can be initialised with data-sly-use. Note that in this case data-sly-use and data-sly-call could also be placed on the same element: */}
          <Sly tagName="div" use={{ lib: 'templateLib.html' }}>
            <Sly tagName="div" call="${lib.one}" />
            <Sly tagName="div" call="${lib.two @ title=properties.jcr:title}" />
          </Sly>

          {/* Template recursion is supported: */}
          <Sly tagName="div" template={{ nav: '${ @ page}' }}>
            <Sly tagName="ul" list="${page.listChildren}">
              <li>
                <Sly tagName="div" class="title">{'${item.title}'}</Sly>
                <Sly tagName="div" call="${nav @ page=item}" unwrap />
              </li>
            </Sly>
          </Sly>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'CMP & Custom attributes',
      description: '',
      component: (
        <React.Fragment>
          {/* Showing off you can pass custom string selectors like CMP selectors but must use their full name. */}
          <Sly
            tagName="img"
            data-cmp-is="image"
            data-cmp-lazy="${image.lazyEnabled}"
            data-cmp-src="${image.srcUriTemplate ? image.srcUriTemplate : image.src}"
            data-cmp-widths="${image.widths}"
            data-asset="${image.fileReference}"
            data-title="${image.title || image.alt}"
          />
        </React.Fragment>
      ),
      notes: ''
    }
  ]
}];
