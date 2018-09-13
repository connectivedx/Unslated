/** This component provides an easy way to build a placeholder SVG. */

export class PlaceholderSvg extends React.Component {
  static propTypes = {
    /** Placeholder Width prop */
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    /** Placeholder Height prop */
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    /** Placeholder text */
    text: PropTypes.string,
    /** Placeholder image color */
    imgColor: PropTypes.string,
    /** Placeholder text color */
    textColor: PropTypes.string,
    /** Placeholder font-family */
    fontFamily: PropTypes.string,
    /** Placeholder font-size */
    fontSize: PropTypes.string,
    /** Placeholder font-weight */
    fontWeight: PropTypes.string
  };

  static defaultProps = {
    width: 500,
    height: 250,
    text: 'FPO',
    imgColor: '#ccc',
    textColor: '#fff',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'bold'
  };

  state = {
    isActive: false
  }

  /** toggle is a helper method to switch the isActive state between a boolean true or false */
  toggle = () => {
    this.setState({ isActive: !this.state.isActive });
  }

  render = () => {
    const {
      width,
      height,
      text,
      imgColor,
      textColor,
      fontFamily,
      fontSize,
      fontWeight,
      ...attrs
    } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        style={{
          height: `${height}px`,
          maxWidth: '100%',
          textTransform: 'uppercase',
          width: `${width}px`
        }}
      >
        <rect
          fill={imgColor}
          width="100%"
          height="100%"
        />
        <text
          fill={textColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          x="50%"
          y="50%"
          textAnchor="middle"
        >
          {text}
        </text>
      </svg>
    );
  }
}

export default PlaceholderSvg;
