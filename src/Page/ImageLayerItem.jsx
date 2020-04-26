import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageContext from '../PageContext';

class ImageLayerItemInternal extends Component {
  render() {
    const { scale } = this.props;
    return (
      <div style={{
        position: 'absolute',
        top: `${(this.props.top * scale)}px`,
        left: `${this.props.left * scale}px`,
        width: `${this.props.width * scale}px`,
        height: `${this.props.height * scale}px`,
        pointerEvents: 'all'
      }} className="react-pdf__Image">

      </div>
    );
  }
}

ImageLayerItemInternal.propTypes = {};

export default function ImageLayerItem(props) {
  return (
    <PageContext.Consumer>
      {context => <ImageLayerItemInternal {...context} {...props} />}
    </PageContext.Consumer>
  );
}
