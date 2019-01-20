import Link from '@atoms/Link/Link';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import { List, List__item } from '@atoms/List/List';
import Modal from '@molecules/Modal/Modal';
import { Form, Legend } from '@molecules/Form/Form';
import Input from '@molecules/Input/Input';
import Button from '@atoms/Button/Button';
import Icon from '@atoms/Icon/Icon';

// Navigation atomic levels
const getAtomicListing = () => {
  const elements = GuideUtils.getExamples()[0];
  const collection = [];

  // Create new atomic level collection of elements
  Object.keys(elements).map(index => {
    const examples = elements[index];
    // prevents duplicates
    if (!collection[examples.atomic]) {
      // each atomic level is a new object
      collection[examples.atomic] = []; 
    }

    // push examples element's atomic level
    collection[examples.atomic].push(examples); 
  });

  // Create sections based on atomic collection from above
  return Object.keys(collection).map(index => {
    const examples = collection[index];

    return (
    <List__item key={index}>
      <Heading level="h3" className={index}>
        {index.charAt(0).toUpperCase() + index.slice(1)}
        <Link data-modal={`new-${index}`}>
          <Icon name="plus" />
        </Link>
      </Heading>
      <List className="hide">{ getElementListing(examples) }</List>
      <Modal data-modal={`new-${index}`} size="small">
        <Rhythm>
          <Heading level="h3">Adding new {index}</Heading>
          <p>Use this dialog to name and create a new project {index}.</p>
          <Form method="get" data-action="/api" className="new-element" legend={`Use the form below to add a new ${index}`}>
            <Input type="text" label={`New ${index} name`} name="name" required />
            <Input type="hidden" label={false} name="new" defaultValue={index} required />
          </Form>
        </Rhythm> 
      </Modal>      
    </List__item>
    );
  });
};

// Navigation atomic levels
const getPageListing = () => {
  const pages = GuideUtils.getPages();

  return (
    <List__item key={index}>
      <Heading level="h3" className="pages">
        Pages
        <Link data-modal={`new-pages`}>
          <Icon name="plus" />
        </Link>        
      </Heading>
      <List className="hide">
        { Object.keys(pages).map((key, index) => {
          const pageName = key.split('./')[1].split('.')[0];
          return <Link key={index} href={['../../../pages/', pageName].join('')}>{pageName}</Link>;
        }) }
      </List>
      <Modal data-modal={`new-pages`} size="small">
        <Rhythm>
          <Heading level="h3">Adding new page</Heading>
          <p>Use this dialog to name and create a new project page.</p>
          <Form method="get" data-action="/api" className="new-element" legend={`Use the form below to add a new page`}>
            <Input type="text" label="New page name" name="name" required />
            <Input type="hidden" label={false} name="new" defaultValue="pages" required />
          </Form>
        </Rhythm>
      </Modal>       
    </List__item>
  );
};

// Navigation element levels
const getElementListing = (examples) => {
  return Object.keys(examples).map(index => {
    return (
      <List__item key={index}>
        <Link href={'../../../' + examples[index].url}>{ examples[index].name }</Link>
      </List__item>
    );
  });
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
        <input type="search" name="guide__nav--search-input" />
        <Rhythm tagName="ul" deep size="small" className="list">
          <Heading level="h3" className="home"><Link href="/">Home</Link></Heading>
          { getAtomicListing() }
          { getPageListing() }
        </Rhythm>
      </Rhythm>
    </nav>
  );
};

export default Guide__nav;
