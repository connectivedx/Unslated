import Heading from '@atoms/Heading/Heading';
import Typography from '@guide/partials/typography/guide__typography';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Form from '@atoms/Form/Form';
import Fieldset from '@atoms/Fieldset/Fieldset';
import Select from '@atoms/Select/Select';

const page = () => (
  <Rhythm>
    <Heading>Project Typography:</Heading>
    <p>A comprehensive overview of common typograhpy patterns ran over project fonts.<br /> Use the form below to switch between not only project fonts, but also other fonts found online.</p>
    <Form>
      <Fieldset legend="Choose between project fonts">
        <Select defaultValue="Karma" id="fonts" name="fonts" />
      </Fieldset>
    </Form>
    <section className="flex">
      <Typography />
    </section>
  </Rhythm>
);

page.options = {
  navless: false,
  headless: false
};

export default page;
