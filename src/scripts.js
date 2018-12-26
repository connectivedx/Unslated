import '@atoms/Icon/IconSet'; // see ./src/elements/atoms/Icon/IconSet.js
import Form from '@molecules/Form/Form.Container';
import Tabs from '@molecules/Tabs/Tabs.Container';
import Expand from '@molecules/Expand/Expand.Container';
import Accordion from '@molecules/Accordion/Accordion.Container';

setTimeout(() => {
	Utils.initComponent('Form', '.form', Form);
	Utils.initComponent('Expand', '.expand', Expand);
	Utils.initComponent('Accordion', '.accordion', Accordion);
	Utils.initComponent('Tabs', '.tabs', Tabs);
}, 1000);
