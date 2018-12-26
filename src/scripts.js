import '@atoms/Icon/IconSet'; // see ./src/elements/atoms/Icon/IconSet.js
import Form from '@molecules/Form/Form.Container';
import Tabs from '@molecules/Tabs/Tabs.Container';
import Modal from '@molecules/Modal/Modal.Container';
import Expand from '@molecules/Expand/Expand.Container';
import Tracking from '@modifiers/Tracking/Tracking.Container';
import Accordion from '@molecules/Accordion/Accordion.Container';

setTimeout(() => {
	Utils.initComponent('Form', '.form', Form);
	Utils.initComponent('Expand', '.expand', Expand);
	Utils.initComponent('Accordion', '.accordion', Accordion);
	Utils.initComponent('Tabs', '.tabs', Tabs);
	Utils.initComponent('Modal', '.modal', Modal);
	new Tracking({
	  vendors: [
	    {
	      type: 'GoogleTagManager',
	      id: 'GOOGLE-API-KEY'
	    }
	  ]
	});
}, 1000);
