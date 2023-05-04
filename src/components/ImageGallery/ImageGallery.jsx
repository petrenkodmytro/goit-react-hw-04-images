import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({
  images,
  openModal,
  closeModal,
  showModal,
  imgUrl,
  tag,
}) => {
  return (
    <>
      <GalleryList>
        {images.map(img => (
          <ImageGalleryItem
            key={img.id}
            item={img}
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
            imgUrl={imgUrl}
            tag={tag}
          />
        ))}
      </GalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.bool.isRequired,
  imgUrl: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
