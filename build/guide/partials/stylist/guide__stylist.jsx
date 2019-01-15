import Icon from '@atoms/Icon/Icon';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import breakpoints from '!!style-loader!css-loader!@vars/breakpoints';
console.log(breakpoints);

export const Guide__stylist = (props) => {
  const {
    children,
    examples,
    ...attrs
  } = props;

  const classStack = Utils.createClassStack([
    'guide__stylist'
  ]);

  return (
    <section className={classStack} {...attrs}>
      <Rhythm className="guide__stylist-inner">
        <div className="guide__stylist-minmax">
          <Icon name="close" />
        </div>
        <Rhythm>
          <Heading level="h5">Examples</Heading>
          <select className="guide__stylist-examples" defaultValue="0">
            <option value="0">All examples</option>
            {
              Object.keys(examples).map(index => {
                return <option key={index} value={(parseInt(index, 10) + 1)}>{examples[index].name}</option>;
              })
            }
          </select>
        </Rhythm>
        <Rhythm>
          <Heading level="h5">Breakpoints</Heading>
          <div className="guide__breakpoint">
            <div>
              <label>Size</label>
              <select className="guide__stylist-breakpoint-size" defaultValue="1">
                <option value="none">None</option>
                {
                  Object.keys(breakpoints).map((key, index) => {
                    if (key.indexOf('below') !== -1) { return; }
                    let value = breakpoints[key].replace(/\((.*)\)/g, '$1').split(' ');
                    value = value[value.length - 1].replace('width:', '');
                    return <option key={index} value={value}>{key.replace('--', '')}</option>;
                  })
                }
              </select>
            </div>
            <div>
              <label>Speed</label>
              <select className="guide__stylist-breakpoint-speed" defaultValue="1">
                <option value="0s">Normal</option>
                <option value="1s">1 second</option>
                <option value="2s">2 seconds</option>
                <option value="5s">5 seconds</option>
                <option value="10s">10 seconds</option>
              </select>
            </div>
          </div>
        </Rhythm>
      </Rhythm>
    </section>
  );
};

export default Guide__stylist;
