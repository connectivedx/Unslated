import Fieldset from '@guideAtoms/Fieldset/Fieldset';
import Form from '@guideAtoms/Form/Form';
import Heading from '@guideAtoms/Heading/Heading';
import Rhythm from '@guideAtoms/Rhythm/Rhythm';
import Select from '@guideAtoms/Select/Select';
import Typography from '@guideOrganisms/Typography/Typography';

const page = () => (
  <Rhythm>
    <Heading>Project Typography:</Heading>
    <p>
      A comprehensive view of common typograhpy patterns ran over project fonts. <br />
      Use the form below to switch between project fonts. <br />
      <i>
        <strong>
          (Note: this select list is not dynamically generated,
          and can be found/mantained in guide/tools/typography.jsx)
        </strong>
      </i>
    </p>
    <Form>
      <Fieldset legend="Choose between project fonts">
        <Select defaultValue="Karma" id="fonts" name="fonts">
          <option value="Merriweather">Merriweather</option>
          <option value="Open Sans">Open Sans</option>
          <option value="sans-serif">sans-serif</option>
        </Select>
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
