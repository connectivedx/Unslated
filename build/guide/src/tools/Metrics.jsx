import Heading from '@guideAtoms/Heading/Heading';
import Metrics from '@guideOrganisms/metrics/Metrics';
import Rhythm from '@guideAtoms/Rhythm/Rhythm';

const page = () => (
  <Rhythm>
    <Heading>Project Performance Metrics:</Heading>
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
