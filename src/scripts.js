import Icon from '@atoms/Icon/Icon.Container';
import Form from '@atoms/Form/Form.Container';
import Input from '@atoms/Input/Input.Container';
import Tabs from '@molecules/Tabs/Tabs.Container';
import Select from '@atoms/Select/Select.Container';
import Modal from '@molecules/Modal/Modal.Container';
import Expand from '@molecules/Expand/Expand.Container';
import Textarea from '@atoms/Textarea/Textarea.Container';
import Tracking from '@modifiers/Tracking/Tracking.Container';
import Accordion from '@molecules/Accordion/Accordion.Container';

setTimeout(() => {
  Utils.initComponent('Expand', '.expand', Expand);
  Utils.initComponent('Accordion', '.accordion', Accordion);
  Utils.initComponent('Tabs', '.tabs', Tabs);
  Utils.initComponent('Modal', '.modal', Modal, () => {
    Utils.initComponent('Form', '.form', Form);
    Utils.initComponent('Input', '.input', Input);
    Utils.initComponent('Select', '.select', Select);
    Utils.initComponent('Textarea', '.Textarea', Textarea);
  });
  Utils.initComponent('Icon', 'body', Icon);
  new Tracking({
    vendors: [
      {
        type: 'Google',
        id: ''
      }
    ]
  });
}, 1000);
