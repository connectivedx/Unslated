import Tabs from '@molecules/Tabs/Tabs.container';
import Form from '@atoms/Form/Form.container';
import Alert from '@molecules/Alert/Alert.container';
import Input from '@atoms/Input/Input.container';
import Modal from '@molecules/Modal/Modal.container';
import Image from '@atoms/Image/Image.container';
import Select from '@atoms/Select/Select.container';
import Expand from '@molecules/Expand/Expand.container';
import Textarea from '@atoms/Textarea/Textarea.container';
import Accordion from '@molecules/Accordion/Accordion.container';
import Accessibility from '@modifiers/Accessibility/Accessibility.container';

document.addEventListener('DOMContentLoaded', () => {
  Utils.initComponent('Expand', '.expand', Expand);
  Utils.initComponent('Accordion', '.accordion', Accordion);
  Utils.initComponent('Tabs', '.tabs', Tabs);
  Utils.initComponent('Modal', '.modal', Modal, () => {
    Utils.initComponent('Alert', '.alert', Alert);
    Utils.initComponent('Form', '.form', Form);
    Utils.initComponent('Input', '.input', Input);
    Utils.initComponent('Select', '.select', Select);
    Utils.initComponent('Textarea', '.Textarea', Textarea);
  });
  Utils.initComponent('Accessibility', 'body', Accessibility);
  Utils.initComponent('Image', '.image', Image);
}, false);
