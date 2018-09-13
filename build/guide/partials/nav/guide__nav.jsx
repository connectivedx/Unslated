import Link from '@atoms/Link/Link';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import { List, List__item } from '@atoms/List/List';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

// Navigation atomic levels
const getAtomicListing = () => {
  const elements = Utils.getExamples();
  const collection = [];

  // Create new atomic level collection of elements
  Object.keys(elements).map(index => {
    const examples = elements[index];

    // prevents duplicates
    if (!collection[examples.atomicLevel]) {
      // each atomic level is a new object
      collection[examples.atomicLevel] = []; 
    }

    // push examples element's atomic level
    collection[examples.atomicLevel].push(examples); 
  });

  // Create sections based on atomic collection from above
  return Object.keys(collection).map(index => {
    const examples = collection[index];

    return (
    <List__item key={index}>
      <Heading level="h3" className={index}>
        {index.charAt(0).toUpperCase() + index.slice(1)}
      </Heading>
      <List className="hide">{ getElementListing(examples) }</List>
    </List__item>
    );
  });
};

// Navigation atomic levels
const getPageListing = () => {
  const pages = Utils.getPages();

  return (
    <List__item key={index}>
      <Heading level="h3" className="pages">Pages</Heading>
      <List className="hide">
        { Object.keys(pages).map((key, index) => {
          const pageName = key.split('./')[1].split('.')[0];
          return <Link key={index} href={['../../../pages/', pageName].join('')}>{pageName}</Link>;
        }) }
      </List>
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
          { getAtomicListing() }
          { getPageListing() }
        </Rhythm>
      </Rhythm>
    </nav>
  );
};

export default Guide__nav;
