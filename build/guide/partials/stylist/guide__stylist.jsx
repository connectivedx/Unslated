import Icon from '@atoms/Icon/Icon';
import Select from '@atoms/Select/Select';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import breakpoints from '!!style-loader!css-loader!@vars/breakpoints';

export const Guide__stylist = (props) => {
  const {
    data,
    children,
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
          <Select label={false} className="guide__stylist-examples" defaultValue="0" id="examples" name="examples">
            <option value="0">All examples</option>
            {
              Object.keys(data).map((index) => (
                <option key={index} value={(parseInt(index, 10) + 1)}>
                  {data[index].name}
                </option>
              ))
            }
          </Select>
        </Rhythm>
        <Rhythm>
          <Heading level="h5">Breakpoints</Heading>
          <div className="guide__breakpoint guide__stylist__section">
            <div>
              <Select label="Size" className="guide__stylist-breakpoint-size" defaultValue="1" name="breakpoint-sizes" id="breakpointSize">
                <option value="none">None</option>
                {
                  Object.keys(breakpoints).map((key, index) => {
                    if (key.indexOf('below') !== -1) { return false; }
                    let value = breakpoints[key].replace(/\((.*)\)/g, '$1').split(' ');
                    value = value[value.length - 1].replace('width:', '');
                    value = value.replace(/rem\((.*?)\)/g, '$1');
                    return <option key={index} value={value}>{key.replace('--', '')}</option>;
                  })
                }
              </Select>
            </div>
            <div>
              <Select label="Speed" className="guide__stylist-breakpoint-speed" defaultValue="1" name="breakpoint-speed" id="breakpointSpeed">
                <option value="0s">Normal</option>
                <option value="1s">1 second</option>
                <option value="2s">2 seconds</option>
                <option value="5s">5 seconds</option>
                <option value="10s">10 seconds</option>
              </Select>
            </div>
          </div>
        </Rhythm>
        <Rhythm>
          <Heading level="h5">Stats</Heading>
          <div className="guide__stats guide__stylist__section">
            <small className="guide__stylist-js-stat stats"><strong>JS:</strong> 0 Bytes</small>
            <small className="guide__stylist-css-stat stats"><strong>CSS:</strong> 0 Bytes</small>
          </div>
        </Rhythm>
      </Rhythm>
    </section>
  );
};

export default Guide__stylist;
