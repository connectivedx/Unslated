import Tabs from '@molecules/Tabs/Tabs.container';
import Form from '@atoms/Form/Form.container';
import Input from '@atoms/Input/Input.container';
import Modal from '@molecules/Modal/Modal.container';
import Select from '@atoms/Select/Select.container';
import Expand from '@molecules/Expand/Expand.container';
import Textarea from '@atoms/Textarea/Textarea.container';
import Accordion from '@molecules/Accordion/Accordion.container';

document.addEventListener('DOMContentLoaded', () => {
  Utils.initComponent('Expand', '.expand', Expand);
  Utils.initComponent('Accordion', '.accordion', Accordion);
  Utils.initComponent('Tabs', '.tabs', Tabs);
  Utils.initComponent('Modal', '.modal', Modal, () => {
    Utils.initComponent('Form', '.form', Form);
    Utils.initComponent('Input', '.input', Input);
    Utils.initComponent('Select', '.select', Select);
    Utils.initComponent('Textarea', '.Textarea', Textarea);
  });
}, false);
