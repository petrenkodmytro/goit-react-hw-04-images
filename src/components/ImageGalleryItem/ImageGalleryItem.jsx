import PropTypes from 'prop-types';
import { ImageItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, openModal }) => {
  return (
    <ImageItem
      onClick={e => {
        e.preventDefault();
        openModal(item.largeImageURL, item.tags);
      }}
    >
      <Img src={item.webformatURL} alt={item.tags} loading="lazy" />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};
