import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';

export const Guide__welcome = () => {
  const classStack = Utils.createClassStack([
    'guide__welcome'
  ]);

  return (
    <Rhythm tagName="section" className={classStack}>
      <Heading>Welcome to Unslated!</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Getting Started</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Elements and Examples</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Pages</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Templates</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Build configs</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Guide</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Scaffolding</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Documentation</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Adding a JS plugins</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Adding a CSS plugin</Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <Heading level="h3">Adding routes </Heading>
      <p>{Utils.ipsum('paragraph', 1)}</p>
      <p>{Utils.ipsum('paragraph', 1)}</p>
    </Rhythm>
  );
};


export default Guide__welcome;
