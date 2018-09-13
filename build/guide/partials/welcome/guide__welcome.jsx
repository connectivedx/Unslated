import Heading from '@atoms/Heading/Heading';

export const Guide__welcome = (props) => {
  const classStack = Utils.createClassStack([
    'guide__welcome'
  ]);

  return (
    <section>
      <Heading>Welcome to Unslate!</Heading>
      <p>You can checkout any time you like, but you can never leave!</p>
    </section>
  );
};


export default Guide__welcome;
