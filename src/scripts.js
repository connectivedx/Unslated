import '@atoms/Icon/IconSet'; // see ./src/elements/atoms/Icon/IconSet.js
import Form from '@molecules/Form/Form.Container';
import Expand from '@molecules/Expand/Expand.Container';

setTimeout(() => {
	Utils.initComponent('Form', '.form', Form);
	Utils.initComponent('Expand', '.expand', Expand);
}, 1000);
