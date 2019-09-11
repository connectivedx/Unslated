import Icon from '@guideAtoms/Icon/Icon';
import Form from '@guideAtoms/Form/Form';
import Input from '@guideAtoms/Input/Input';
import Rhythm from '@guideAtoms/Rhythm/Rhythm';
import Heading from '@guideAtoms/Heading/Heading';
import { List } from '@guideAtoms/List/List';
import {
  Card,
  Card__header,
  Card__body,
  Card__footer
} from '@guideMolecules/Card/Card';

// Guide Icons
export class Icons extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'section',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'guide__icons',
      `guide__icons--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

// Wrapper for icon cards
export class Icons_wrapper extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'section',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'guide__icons-wrapper',
      className
    ]);

    return (
      <Rhythm
        className={classStack}
        {...attrs}
      >
        {children}
      </Rhythm>
    );
  }
}

// Icon cards
export class Icons_card extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node,
    /** Icon name */
    name: PropTypes.string,
    /** File name */
    file: PropTypes.string,
    /** File Size */
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ])
  };

  static defaultProps = {
    variant: 'default'
  };

  render = () => {
    const {
      className,
      variant,
      children,
      name,
      file,
      size,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'guide__icons-card',
      `guide__icons-card--${variant}`,
      className
    ]);

    return (
      <Card
        style={{
          '--icon-font-size': '128px',
          '--icon-fill': 'auto',
          '--icon-stroke': 'transparent',
          '--icon-stroke-width': '0'
        }}
        className={classStack}
        data-icon={name}
        {...attrs}
      >
        <Card__header>
          <Heading level="h5">
            {file}
            <Form legend="Use the form below to change icon size" className="icon__utilities">
              <List>
                <Input tagName="li" className="icon__utility list__item list__item--default" type="range" id="icon-size" min="1" max="256" defaultValue="128" name="font-size" label="size" align="inline-right" />
                <Input tagName="li" className="icon__utility list__item list__item--default" type="range" id="icon-stroke-width" min="0" max="16" defaultValue="0" name="stroke-width" label="stroke" align="inline-right" />
                <Input tagName="li" className="icon__utility list__item list__item--default" type="color" id="icon-fill" name="fill" label="fill" align="inline-right" />
                <Input tagName="li" className="icon__utility list__item list__item--default" type="color" id="icon-stroke" name="stroke" label="stroke" align="inline-right" />
              </List>
            </Form>
          </Heading>
        </Card__header>

        <Card__body>
          <Icon name={name} />
        </Card__body>

        <Card__footer>
          <p>{size}</p>
        </Card__footer>
      </Card>
    );
  }
}

export default Icons;
