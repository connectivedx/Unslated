/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      export default [{
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

import {
  Table,
  Table__head,
  Table__foot,
  Table__body,
  Table__row,
  Table__header,
  Table__data
} from './Table';

export default [{
  examples: [
    {
      name: 'Table with caption',
      component: (
        <Table>
          <caption>
            Table caption can be a headline describing table content or a plain text.
          </caption>
          <Table__head>
            <Table__row>
              <Table__header>Rating</Table__header>
              <Table__header>Description</Table__header>
            </Table__row>
          </Table__head>
          <Table__body>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 2)}</p>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </Table__data>
            </Table__row>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 2)}</p>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </Table__data>
            </Table__row>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 2)}</p>
              </Table__data>
            </Table__row>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </Table__data>
            </Table__row>
          </Table__body>
        </Table>
      )
    }, {
      name: 'Auto sizing table',
      component: (
        <Table variant="auto">
          <Table__head>
            <Table__row>
              <Table__header>Rating</Table__header>
              <Table__header>Description</Table__header>
            </Table__row>
          </Table__head>
          <Table__body>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 2)}</p>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </Table__data>
            </Table__row>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 2)}</p>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </Table__data>
            </Table__row>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 2)}</p>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </Table__data>
            </Table__row>
            <Table__row>
              <Table__header>Lorem Ipsum</Table__header>
              <Table__data>
                <p>{Utils.ipsum('sentence', 2)}</p>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </Table__data>
            </Table__row>
          </Table__body>
        </Table>
      )
    }, {
      name: 'Responsive Table',
      component: (
        <Table variant="responsive">
          <Table__head>
            <Table__row>
              <Table__header>Name</Table__header>
              <Table__header>Value</Table__header>
              <Table__header>Amount</Table__header>
              <Table__header>Count</Table__header>
            </Table__row>
          </Table__head>
          <Table__body>
            <Table__row>
              <Table__data data-heading="Name">First item</Table__data>
              <Table__data data-heading="Value">$10</Table__data>
              <Table__data data-heading="Amount">41</Table__data>
              <Table__data data-heading="Count">3</Table__data>
            </Table__row>
            <Table__row>
              <Table__data data-heading="Name">Second item</Table__data>
              <Table__data data-heading="Value">$20</Table__data>
              <Table__data data-heading="Amount">82</Table__data>
              <Table__data data-heading="Count">58</Table__data>
            </Table__row>
            <Table__row>
              <Table__data data-heading="Name">Third item</Table__data>
              <Table__data data-heading="Value">$30</Table__data>
              <Table__data data-heading="Amount">34</Table__data>
              <Table__data data-heading="Count">9</Table__data>
            </Table__row>
            <Table__row>
              <Table__data data-heading="Name">Fourth item</Table__data>
              <Table__data data-heading="Value">$40</Table__data>
              <Table__data data-heading="Amount">58</Table__data>
              <Table__data data-heading="Count">21</Table__data>
            </Table__row>
          </Table__body>
          <Table__foot>
            <Table__row>
              <Table__data data-heading="Name">Total summary</Table__data>
              <Table__data data-heading="Value">$150</Table__data>
              <Table__data data-heading="Amount">265</Table__data>
              <Table__data data-heading="Count">97</Table__data>
            </Table__row>
          </Table__foot>
        </Table>
      )
    }, {
      name: 'Responsive Table with Inline Data',
      component: (
        <Table variant="inline-data">
          <Table__head>
            <Table__row>
              <Table__header>Name</Table__header>
              <Table__header>Value</Table__header>
              <Table__header>Amount</Table__header>
              <Table__header>Count</Table__header>
            </Table__row>
          </Table__head>
          <Table__body>
            <Table__row>
              <Table__data data-heading="Name">First item</Table__data>
              <Table__data data-heading="Value">$10</Table__data>
              <Table__data data-heading="Amount">41</Table__data>
              <Table__data data-heading="Count">3</Table__data>
            </Table__row>
            <Table__row>
              <Table__data data-heading="Name">Second item</Table__data>
              <Table__data data-heading="Value">$20</Table__data>
              <Table__data data-heading="Amount">82</Table__data>
              <Table__data data-heading="Count">58</Table__data>
            </Table__row>
            <Table__row>
              <Table__data data-heading="Name">Third item</Table__data>
              <Table__data data-heading="Value">$30</Table__data>
              <Table__data data-heading="Amount">34</Table__data>
              <Table__data data-heading="Count">9</Table__data>
            </Table__row>
            <Table__row>
              <Table__data data-heading="Name">Fourth item</Table__data>
              <Table__data data-heading="Value">$40</Table__data>
              <Table__data data-heading="Amount">58</Table__data>
              <Table__data data-heading="Count">21</Table__data>
            </Table__row>
          </Table__body>
          <Table__foot>
            <Table__row>
              <Table__data data-heading="Name">Total summary</Table__data>
              <Table__data data-heading="Value">$150</Table__data>
              <Table__data data-heading="Amount">265</Table__data>
              <Table__data data-heading="Count">97</Table__data>
            </Table__row>
          </Table__foot>
        </Table>
      )
    }
  ]
}];
