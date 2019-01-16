/*
  Example:
    ```
      examples: [{
        name: 'Default styling',
        component: (
          <div className=Tracking></div>
        ),
        options: {
          padding: '1rem',
          background: 'path/or/url/to/image(.jpg|.gif|.png|.svg)',
          brightness: 0.5,
        }        
      },
    ```
*/

import List from '@atoms/List/List';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Button from '@atoms/Button/Button';
import Textarea from '@molecules/Textarea/Textarea';

export default [{
  examples: [
    {
      name: 'Simple click',
      description: 'Event specifies what client-side event will perform a tracking. Label allows you to customize our tracking entry identity. Data allows you to pass custom data along with our tracking entry.',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'click',
              'label': 'Simple Example',
              'data': '@helloWorld'
            }]"
          >
            click me
          </Button>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Inner from another element',
      description: 'Instead of setting data as a explicit string, you can set data as a element selector. This will pass an element&apos;s innerHTML as a string to our tracking entry.',
      component: (
        <Rhythm>
          <p className="hidden-text-area" style={{ display: 'none' }}>I&apos;m hidden text, but still used in tracking</p>
          <Button
            data-tracking="[{
              'event': 'click',
              'label': 'Hidden Value Example',
              'data': '.hidden-text-area'
            }]"
          >
            Click me
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Attribute value from another element',
      description: 'Furthermore, you can use the :attr() flag to grab the value of a specific element attribute instead of innerHTML.',
      component: (
        <Rhythm>
          <Button className="input-attribute" title="I'm a link title attribute value!" style={{ display: 'none' }}>A simple string of content for example purposes only.</Button>
          <Button
            data-tracking="[{
              'event': 'click',
              'label': 'Hidden Value Example',
              'data': '.input-attribute:attr(title)'
            }]"
          >
            Click me
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Data spreading',
      description: 'Instead of passing a string or a selector, you can pass an object that gets <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax">spreads out</a> in place of data.',
      component: (
        <Rhythm>
          <Button
            href="#/"
            data-tracking="[{
              'event': 'click',
              'label': 'Data Spread Example',
              'data': {'hello': 'world', 'howdy': 'user'}
            }]"
          >
            Click me
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Muti-event tracking (on single element)',
      description: 'Sometimes you might have the need to send out two different tracking entries based on different user events.',
      component: (
        <Rhythm>
          <Button
            href="#/"
            data-tracking="[{
              'event':'click',
              'label': 'Multi Example',
              'data': 'First Data Value'
            },{
              'event':'mousemove',
              'label': 'Multi Example',
              'data': 'Second Data Value'
            }]"
          >
            Click or mouse over me
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Muti-element tracking (from single element)',
      description: 'Instead of putting tracking attributes on each list item, you can instead track the items from a single parent element.',
      component: (
        <Rhythm>
          <List
            variant="blank"
            data-tracking="[{
              'event':'click',
              'label': 'Data Points Example',
              'data': 'A multi-element was clicked',
              'elements': '.link'
            }]"
            className="mult-element-list"
          >
            <li><Button>Click me</Button></li>
            <li><Button>Click me</Button></li>
            <li><Button>Click me</Button></li>
          </List>
        </Rhythm>
      )
    }, {
      name: 'Keydown example (input)',
      component: (
        <Rhythm tagName="ol" className="list list--blank">
          <Textarea label={false}
            data-tracking="[{
              'event': 'input',
              'label': 'Keyboard Events',
              'data': 'Element Keydown'
            }]"
            placeholder="Keydown tracking"
            name="example"
          />
        </Rhythm>
      )
    }, {
      name: 'Keyup example',
      component: (
        <Rhythm tagName="ol" className="list list--blank">
          <Textarea label={false}
            data-tracking="[{
              'event': 'keyup',
              'label': 'Keyboard Events',
              'data': 'Element Keyup'
            }]"
            placeholder="Keyup tracking"
            name="example"
          />
        </Rhythm>
      )
    }, {
      name: 'Keypress example',
      component: (
        <Rhythm tagName="ol" className="list list--blank">
          <Textarea label={false}
            data-tracking="[{
              'event': 'keypress',
              'label': 'Keyboard Events',
              'data': 'Element Keypress'
            }]"
            placeholder="Keypress tracking"
            name="example"
          />
        </Rhythm>
      )
    }, {
      name: 'Mouse enter example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mouseenter',
              'label': 'Mouse Events',
              'data': 'Mouse enter link'
            }]"
          >
            Mouse enter
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse enter example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mouseenter',
              'label': 'Mouse Events',
              'data': 'Mouse enter link'
            }]"
          >
            Mouse enter
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse over example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mouseover',
              'label': 'Mouse Events',
              'data': 'Mouse over link'
            }]"
          >
            Mouse over
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse move example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mousemove',
              'label': 'Mouse Events',
              'data': 'Mouse move link'
            }]"
          >
            Mouse move
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse down example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mousedown',
              'label': 'Mouse Events',
              'data': 'Mouse down link'
            }]"
          >
            Mouse down
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse up example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mouseup',
              'label': 'Mouse Events',
              'data': 'Mouse up link'
            }]"
          >
            Mouse up
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse out example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mouseout',
              'label': 'Mouse Events',
              'data': 'Mouse out link'
            }]"
          >
            Mouse out
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse leave example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'mouseleave',
              'label': 'Mouse Events',
              'data': 'Mouse leave link'
            }]"
          >
            Mouse leave
          </Button>
        </Rhythm>
      )
    }, {
      name: 'AUX Click example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'auxclick',
              'label': 'Mouse Events',
              'data': 'Aux click link'
            }]"
          >
            Aux click
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Mouse double click example',
      component: (
        <Rhythm>
          <Button
            data-tracking="[{
              'event': 'dblclick',
              'label': 'Mouse Events',
              'data': 'Mouse double click link'
            }]"
          >
            Mouse double click
          </Button>
        </Rhythm>
      )
    }, {
      name: 'Scroll example',
      component: (
        <Rhythm tagName="ol" className="list list--blank">
          <Textarea label={false} data-tracking="[{'event': 'scroll', 'label': 'Scroll Event', 'data': 'Element Scrolled'}]" name="example">
            Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll TextareaScroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll Textarea Scroll TextareaScroll Textarea Scroll Textarea
          </Textarea>          
        </Rhythm>
      )
    }, {
      name: 'Cut example',
      component: (
        <Rhythm tagName="ol" className="list list--blank">
          <Textarea label={false} data-tracking="[{'event': 'cut', 'label': 'Clipboard Events', 'data': 'Cut to clipboard'}]" name="example">
            Highlight and cut text from this textarea
          </Textarea>
        </Rhythm>
      )
    }, {
      name: 'Copy example',
      component: (
        <Rhythm tagName="ol" className="list list--blank">
          <Textarea label={false} data-tracking="[{'event': 'copy', 'label': 'Clipboard Events', 'data': 'Copy to clipboard'}]" name="example">
            Highlight and copy text from this textarea
          </Textarea>
        </Rhythm>
      )
    }, {
      name: 'Paste example',
      component: (
        <Rhythm tagName="ol" className="list list--blank">
          <Textarea label={false} data-tracking="[{'event': 'paste', 'label': 'Clipboard Events', 'data': 'Paste to clipboard'}]" name="example">
            Paste text here
          </Textarea>
        </Rhythm>
      )
    }, {
      name: 'Drag example',
      component: (
        <Rhythm>
          <div data-tracking="[{'event': 'drag', 'label': 'Drag Drop Events', 'data': 'Drag Element'}]" style={{ padding: '2rem', backgroundColor: 'red' }} draggable="true" title="drag element">Drag</div>
        </Rhythm>
      )
    }, {
      name: 'Drag end example',
      component: (
        <Rhythm>
          <div data-tracking="[{'event': 'dragend', 'label': 'Drag Drop Events', 'data': 'Drag End Element'}]" style={{ padding: '2rem', backgroundColor: 'blue', color: 'white' }} draggable="true" title="Drag element, then press esc">Drag End</div>
        </Rhythm>
      )
    }, {
      name: 'Drag over example',
      component: (
        <Rhythm>
          <div data-tracking="[{'event': 'dragover', 'label': 'Drag Drop Events', 'data': 'Drag Over Element'}]" style={{ padding: '2rem', backgroundColor: 'green' }} draggable="true" title="Drag element over another draggable element">Drag Over</div>
        </Rhythm>
      )
    }, {
      name: 'Drag leave example',
      component: (
        <Rhythm>
          <div data-tracking="[{'event': 'dragleave', 'label': 'Drag Drop Events', 'data': 'Drag Leave Element'}]" style={{ padding: '2rem', backgroundColor: 'yellow' }} draggable="true" title="Drag element out of valid drop zone">Drag Leave</div>
        </Rhythm>
      )
    }, {
      name: 'Video example',
      component: (
        <Rhythm>
          <video
            width="640"
            height="360"
            controls
            data-tracking="[{
              'event': 'play', 'label': 'Video Play', 'data': 'Played Video'
            },{
              'event': 'pause', 'label': 'Video Pause', 'data': 'Paused Video'
            },{
              'event': 'seeking', 'label': 'Video Seek', 'data': 'Video Seeking'
            },{
              'event': 'change', 'label': 'Video Volume', 'data': 'Changed Video Volume'
            }]"
          >
            <track kind="captions" />
            <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
          </video>
        </Rhythm>
      )
    }
  ]
}];
