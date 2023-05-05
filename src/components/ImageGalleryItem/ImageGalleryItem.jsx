import PropTypes from 'prop-types';
import { ImageItem, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({
  item,
  openModal,
  closeModal,
  showModal,
  imgUrl,
  tag,
}) => {
  return (
    <>
      <ImageItem
        onClick={e => {
          e.preventDefault();
          openModal(item.largeImageURL, item.tags);
        }}
      >
        <Img src={item.webformatURL} alt={item.tags} loading="lazy" />
      </ImageItem>

      {/* модалка */}
      {showModal && (
        <Modal closeModal={closeModal} imgUrl={imgUrl} tag={tag}/>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  imgUrl: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
