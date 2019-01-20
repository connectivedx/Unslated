import '@atoms/Icon/IconSet'; // see ./src/elements/atoms/Icon/IconSet.js
import Form from '@molecules/Form/Form.Container';
import Tabs from '@molecules/Tabs/Tabs.Container';
import Modal from '@molecules/Modal/Modal.Container';
import Expand from '@molecules/Expand/Expand.Container';
import Tracking from '@modifiers/Tracking/Tracking.Container';
import Accordion from '@molecules/Accordion/Accordion.Container';

setTimeout(() => {

	Utils.initComponent('Expand', '.expand', Expand);
	Utils.initComponent('Accordion', '.accordion', Accordion);
	Utils.initComponent('Tabs', '.tabs', Tabs);	
	Utils.initComponent('Modal', '.modal', Modal, () => {
		//give modals a chance to forms installed
		Utils.initComponent('Form', '.form', Form); 
	});
	new Tracking({
	  vendors: [
	    {
	      type: 'Google',
	      id: ''
	    }
	  ]
	});
}, 1000);
