import Link from '@atoms/Link/Link';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import { List, List__item } from '@atoms/List/List';
import Modal from '@molecules/Modal/Modal';
import Form from '@molecules/Form/Form';
import Select from '@molecules/Select/Select';
import Input from '@molecules/Input/Input';
import Button from '@atoms/Button/Button';
import Icon from '@atoms/Icon/Icon';
import {
  Card,
  Card__header,
  Card__body
} from '@molecules/Card/Card';

// Navigation element levels
const getElementListing = (examples, level) => Object.keys(examples).map((i) => (
  <List__item key={i} data-search={examples[i].name}>
    <Link href={['../../../', examples[i].url].join('')}>{ examples[i].name }</Link>
    {
      (process.env.NODE_ENV === 'development')
        ? (
          <span className="guide__nav-icons">
            <span data-modal="rename" data-path={`src/elements/${level}/${examples[i].name}`} data-name={examples[i].name}><Icon name="pencil" /></span>
            <span data-modal="remove" data-path={`src/elements/${level}/${examples[i].name}`}><Icon name="trash" /></span>
          </span>
        )
        : ''
    }
  </List__item>
));

// Navigation atomic levels
const getAtomicListing = () => {
  const elements = GuideUtils.getExamples()[0];
  const collection = [];

  // Create new atomic level collection of elements
  Object.keys(elements).map((index) => {
    const examples = elements[index];
    if (!collection[examples.atomic]) {
      collection[examples.atomic] = [];
    }

    collection[examples.atomic].push(examples);
    return true;
  });

  // Create sections based on atomic collection from above
  return Object.keys(collection).map((index) => {
    const examples = collection[index];

    return (
      <List__item key={index}>
        <Heading level="h3" className={index}>
          {index.charAt(0).toUpperCase() + index.slice(1)}
        </Heading>
        <List className="hide">{getElementListing(examples, (index.charAt(0).toUpperCase() + index.slice(1)))}</List>
      </List__item>
    );
  });
};

// Navigation atomic levels
const getPageListing = () => {
  const pages = GuideUtils.getPages();
  return (
    <List__item>
      <Heading level="h3" className="pages">Pages</Heading>
      <List className="hide">
        {
          Object.keys(pages).map((key, index) => {
            const pageName = key.split('./')[1].split('.')[0];
            return (
              <List__item data-search={pageName} key={index}>
                <Link href={['../../../pages/', pageName].join('')}>{pageName}</Link>
                {
                  (process.env.NODE_ENV === 'development')
                    ? (
                      <span className="guide__nav-icons">
                        <span data-modal="rename" data-path={`pages/${pageName}.jsx`} data-name={pageName}><Icon name="pencil" /></span>
                        <span data-modal="remove" data-path={`pages/${pageName}.jsx`}><Icon name="trash" /></span>
                      </span>
                    )
                    : ''
                }
              </List__item>
            );
          })
        }
      </List>
    </List__item>
  );
};

export const Guide__nav = (props) => {
  const {
    children,
    ...attrs
  } = props;

  const classStack = Utils.createClassStack([
    'guide__nav',
    'guide__menu',
    'guide__menu--top-left'
  ]);

  return (
    <nav className={classStack} {...attrs}>
      <Rhythm className="guide__nav-inner">
        <Form action="get" method="post" submit={false} legend="Use the form below to search for atomic elements" autoComplete="off">
          <Input type="search" label={false} name="query" className="guide__nav--search" />
        </Form>
        <span className="guide-nav__close" />
        <Rhythm tagName="ul" deep size="small" className="list">
          <Heading level="h3" className="home"><Link href="/">Home</Link></Heading>
          { getAtomicListing() }
          { getPageListing() }
        </Rhythm>
        {
          (process.env.NODE_ENV === 'development')
            ? <Button data-modal="add" width="full"><Icon name="plus" />&nbsp; Create New</Button>
            : ''
        }
      </Rhythm>
      {
      (process.env.NODE_ENV === 'development')
        ? (
          <React.Fragment>
            <Modal data-modal="add" size="small" padding="none">
              <Card>
                <Card__header>
                  <Heading level="h3">Add</Heading>
                </Card__header>
                <Card__body>
                  <Rhythm>
                    <p>Use this dialog to add new atomic parts to the project.<br /> First choose a type, then give it a name.</p>
                    <Form method="get" data-action="/api" className="new-element" legend="Use the form below to add a new project element">
                      <Select name="new" required label="New:">
                        <option value="">Choose one</option>
                        <option value="atoms">Atom</option>
                        <option value="molecules">Molecule</option>
                        <option value="organisms">Organism</option>
                        <option value="templates">Template</option>
                        <option value="modifiers">Modifier</option>
                        <option value="pages">Page</option>
                        <option value="variables">Variable</option>
                      </Select>
                      <Input type="text" label="Named:" name="name" required />
                    </Form>
                  </Rhythm>
                </Card__body>
              </Card>
            </Modal>

            <Modal data-modal="rename" size="small" padding="none">
              <Card>
                <Card__header>
                  <Heading level="h3">Rename</Heading>
                </Card__header>
                <Card__body>
                  <Rhythm>
                    <p>Use this dialog to rename an atomic parts of the project. This will find all use cases of old name and replace it with new name. Case sensitivity is taken into account.</p>
                    <Form method="get" data-action="/api" submit="Rename" className="rename-element" legend="Use the form below to rename a project element">
                      <Input type="text" label="New name:" name="name" required />
                      <Input type="hidden" label={false} name="path" />
                      <Input type="hidden" label={false} name="rename" value="true" />
                    </Form>
                  </Rhythm>
                </Card__body>
              </Card>
            </Modal>

            <Modal data-modal="remove" size="small" padding="none">
              <Card>
                <Card__header>
                  <Heading level="h3">Remove</Heading>
                </Card__header>
                <Card__body>
                  <Rhythm>
                    <p>You are about to delete an element that may or may not be used in other areas of the project. This action cannot be undone.<br /><br /> Would you like to proceed?</p>
                    <Form method="get" data-action="/api" submit={<React.Fragment><Button type="submit">Yes</Button><Button href="#/" data-modal-close="true">No</Button></React.Fragment>} className="remove-element" legend="Use the form below to delete an element">
                      <Input type="hidden" label={false} name="name" required />
                      <Input type="hidden" label={false} name="path" />
                      <Input type="hidden" label={false} name="remove" value="true" />
                    </Form>
                  </Rhythm>
                </Card__body>
              </Card>
            </Modal>
          </React.Fragment>
        )
        : ''
      }
      <span className="guide-nav__open" />
    </nav>
  );
};

export default Guide__nav;
