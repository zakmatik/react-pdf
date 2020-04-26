import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageContext from '../PageContext';
import { isPage, isRotate } from '../shared/propTypes';
import ImageLayerItem from './ImageLayerItem';

class ImageLayerInternal extends Component {
  get unrotatedViewport() {
    const { page, scale } = this.props;

    return page.getViewport({ scale });
  }

  /**
   * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
   * text content.
   */
  get rotate() {
    const { page, rotate } = this.props;
    return rotate - page.rotate;
  }
  renderImageItems() {
    const imageItems = this.props.images;
    if (!imageItems || imageItems.length === 0) {
      return null;
    }

    return imageItems.map((imageItem, itemIndex) => (
      <ImageLayerItem key={itemIndex} itemIndex={itemIndex} {...imageItem} />
    ));
  }
  render() {
    const { page } = this.props;
    const { unrotatedViewport: viewport, rotate } = this;
    return (
      <div
        className="react-pdf__Page__imageContent"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${viewport.width}px`,
          height: `${viewport.height}px`,
          color: 'transparent',
          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          WebkitTransform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          pointerEvents: 'none',
        }}
      >
        {this.renderImageItems()}
      </div>
    );
  }
}

ImageLayerInternal.propTypes = {
  images: PropTypes.array,
  page: isPage.isRequired,
  rotate: isRotate,
  scale: PropTypes.number,
};


export default function ImageLayer(props) {
  return (
    <PageContext.Consumer>
      {context => <ImageLayerInternal {...context} {...props} />}
    </PageContext.Consumer>
  );
}
