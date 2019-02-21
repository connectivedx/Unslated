import Metrics from '@guide/partials/metrics/guide__metrics';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';

const page = () => (
  <Rhythm>
    <Heading>Project Performance:</Heading>
    <p>
      Use the tools below to gather a comprehensive view of bundled assets
      broken down by and size and loading times.<br />
      This tool is helpfull at identifying opportunities for optimization and better performance.
    </p>
    <Metrics />
  </Rhythm>
);

page.options = {
  navless: false,
  headless: false
};

export default page;
