/**
<div class="rhythm rhythm--default">
<p>
  The Sly element helps AEM developers build complex HTL data models directly within JSX.
</p>

<p>
  This element has been built to spec based on the AEM HTL documentation found here:<br/>
  <a href="https://docs.adobe.com/content/help/en/experience-manager-htl/using/htl/block-statements.html" class="link link--default">https://docs.adobe.com/content/help/en/experience-manager-htl/using/htl/block-statements.html</a>
</p>

<h3 class="heading heading--h3">Why Sly in JSX?</h3>
<p>The core concept of this element is to bring both frontend component development and backend data modeling down<br />
to a single location to forever prevent out of sync frontend and backend markup and data relationships.</p>

<p>However, an added benefit of using Sly in JSX is environment is the context in which developers are authoring data relationships is abstracted HTML and easier to read/maintain vs. in the un-abstracted full component HTML views.</p>
<p>On top of developing data models in cleaner abstracted HTML views, the Sly element its self is an abstraction of the HTL functionality and thus, writing data relationships in JSX is faster and easier to read.</p>

<p>
  Although the Unslated Sly element is designed to emit the same native code documented above,
  there are 4 JSX required syntax differences that developers need to be aware of.
</p>

<h3 class="heading heading--h3">1) Passing server side variables ${var}</h3>
<p>Developers must remember that Javascript and HTL template variables share the same syntax ${var}.<br />
So when passing down a HTL variables to AEM, be-sure to escape them (if not not already) with curly braces & single quotes to bypass React parser.</p>

<h5 class="heading heading--h5">Incorrect:</h5>
<pre>
  &lt;Sly data-sly-unwrap&gt;${properties.jcl:value}&lt;/Sly&gt;
</pre>

<h5 class="heading heading--h5">Correct</h5>
<pre>
  &lt;Sly unwrap&gt;{'${properties.jcl:value}'}&lt;/Sly&gt;
</pre>

<p>This again, ensures that the intended server side variable is passed down to the HTL parser, and not parsed by JSX React.</p>

<h3 class="heading heading--h3">2) Attribute dot notation</h3>
<p>HTL offers dot notation when using their native attributes such as use, template, test etc.
However, JSX cannot allow dot notation attributes and instead must require object expression instead.</p>

<h5 class="heading heading--h5">Incorrect</h5>
<pre>
  &lt;Sly data-sly-use.this="${that}" /&gt;
</pre>

<h5 class="heading heading--h5">Correct</h5>
<pre>
  &lt;Sly use={{ this: '${that}' }} /&gt;
</pre>

<p>Although there is a little learning curve to remember to you must always express dot notations in object form, this does make things easier when sending multiple entries over HTL like so:</p>

<h5 class="heading heading--h5">Incorrect</h5>
<pre>
  &ltSly data-sly-attribute="${{
    title: 'myTitle',
    class: 'myClass',
    id: 'myId'
  }}" /&gt;
</pre>

<h5 class="heading heading--h5">Correct</h5>
<pre>
  &lt;Sly attribute={{
    title: 'myTitle',
    class: 'myClass',
    id: 'myId'
  }} /&gt;
</pre>

<h3 class="heading heading--h3">3) Using tagNames</h3>
<p>With the Sly element, you again are offered all the same flexibility and control you have when writing HTL directly in html files, with the exception you must NOT stray away from using the Sly tag.</p>
<p>This means you cannot use HTL attributes on a non-sly element, but instead use the tagName attribute to make the output be anything other than <sly />.</p>

<h5 class="heading heading--h5">Incorrect</h5>
<pre>
  &ltdiv data-sly-attribute="${{
    title: 'myTitle',
    class: 'myClass',
    id: 'myId'
  }}" /&gt;
</pre>

<h5 class="heading heading--h5">Correct</h5>
<pre>
  &lt;Sly tagName="div" attribute={{
    title: 'myTitle',
    class: 'myClass',
    id: 'myId'
  }} /&gt;
</pre>

<h3 class="heading heading--h3">4) Short hand attributes</h3>
<p>Although this really shouldn't be listed as a warning, but more less a huzzah; it is worth noting that all HTL attributes have been condensed down to their method names when using the Sly element and not their native `data-sly-attribute` long hand forms.</p>

<p>Below are examples of all methods HTL offers in JSX/abstracted Sly element form.</p>
</div>
*/

export class Sly extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Children nodes being passed through */
    children: PropTypes.node,
    /**  Initializes a helper object (defined in JavaScript or Java) and exposes it through a variable. */
    use: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /** Removes the host element from the generated markup while retaining its content. This allows the exclusion of elements that are required as part of HTL presentation logic but are not desired in the actual output. */
    unwrap: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /** Replaces the content of its host element with the specified text. */
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /** Adds attributes to the host element. */
    attribute: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /** Replaces the element name of the host element. */
    element: PropTypes.string,
    /** Conditionally removes the host element and it's content. A value of false removes the element; a value of true retains the element. */
    test: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /** With data-sly-repeat you can repeat an element multiple times based on the list that is specified. */
    repeat: PropTypes.string,
    /** Repeats the content of the host element for each enumerable property in the provided object. */
    list: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /** Includes the result of rendering the indicated resource through the sling resolution and rendering process. */
    resource: PropTypes.string,
    /** Replaces the content of the host element with the markup generated by the indicated HTML template file (HTL, JSP, ESP etc.) when it is processed by its corresponding template engine. */
    include: PropTypes.string,
    /** Defines a template. The host element and its content are not output by HTL */
    template: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /** Calls a template defined with data-sly-template. The content of the called template (optionally parameterized) replaces the content of the host element of the call. */
    call: PropTypes.string
  };

  static defaultProps = {
    tagName: 'sly'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      tagName,
      className,
      children,
      use,
      unwrap,
      text,
      attribute,
      element,
      test,
      repeat,
      list,
      resource,
      include,
      template,
      call,
      ...attrs
    } = this.props;

    const Tag = tagName;

    const classStack = Utils.createClassStack([
      className
    ]);

    if (className) {
      attrs.className = classStack;
    }

    if (use) {
      attrs[`data-sly-use.${Object.keys(use)[0]}`] = Object.keys(use).map((i) => use[i]);
    }

    if (unwrap) {
      attrs['data-sly-unwrap'] = (typeof unwrap === 'string') ? unwrap : '';
    }

    if (text) {
      attrs['data-sly-text'] = text;
    }

    if (attribute) {
      Object.keys(attribute).map((i) => {
        attrs[`data-sly-attribute.${i}`] = attribute[i];
        return false;
      });
    }

    if (element) {
      attrs['data-sly-element'] = element;
    }

    if (test) {
      if (typeof test === 'object') {
        Object.keys(test).map((i) => {
          attrs[`data-sly-test.${i}`] = test[i];
          return false;
        });
      } else {
        attrs['data-sly-test'] = test;
      }
    }

    if (repeat) {
      attrs['data-sly-repeat'] = repeat;
    }

    if (list) {
      if (typeof list === 'object') {
        Object.keys(list).map((i) => {
          attrs[`data-sly-list.${i}`] = list[i];
          return false;
        });
      } else {
        attrs['data-sly-list'] = list;
      }
    }

    if (resource) {
      attrs['data-sly-resource'] = resource;
    }

    if (include) {
      attrs['data-sly-include'] = include;
    }

    if (template) {
      if (typeof template === 'object') {
        Object.keys(template).map((i) => {
          attrs[`data-sly-template.${i}`] = template[i];
          return false;
        });
      } else {
        attrs['data-sly-template'] = template;
      }
    }

    if (call) {
      attrs['data-sly-call'] = call;
    }

    return (
      <Tag
        is="sly"
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default Sly;
