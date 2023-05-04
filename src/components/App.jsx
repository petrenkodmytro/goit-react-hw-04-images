import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchData } from 'api/fetchData';
import { Alert } from './ImageGallery/ImageGallery.styled';

export const App = () => {
  const [textQuery, setTextQuery] = useState('');
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [tag, setTag] = useState('');

  // записываем запрос поиска в App из Searchbar
  const handleSubmit = searchValue => {
    setTextQuery(searchValue);
    setPageNumber(1);
    setImages([]);
    setTotalPage(null);
  };

  // запускается при первом рендере и после изменения textQuery и pageNumber
  useEffect(() => {
    // проверка, чтобы не было запроса при первом рендере
    if (!textQuery) {
      return;
    }
    // пішов запит на бекенд
    const getImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchData(textQuery, pageNumber);
        console.log('запит:', textQuery);
        console.log('номер сторінки:', pageNumber);
        setImages(prev => [...prev, ...response.data.hits]);
        setTotalPage(response.data.totalHits);
      } catch (error) {
        setError('Something wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [textQuery, pageNumber]);

  const onLoadMore = () => {
    setPageNumber(prev => prev + 1);
  };

  const onOpenModal = (imgUrl, tag) => {
    setShowModal(true);
    setImgUrl(imgUrl);
    setTag(tag);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <Layout>
        <ImageGallery
          images={images}
          openModal={onOpenModal}
          closeModal={onCloseModal}
          showModal={showModal}
          imgUrl={imgUrl}
          tag={tag}
        />
      </Layout>

      {/* спінер */}
      <Loader isLoading={loading} />

      {/* кнопка завантажити ще */}
      {totalPage / 12 > pageNumber && <Button loadMore={onLoadMore} />}

      {/* нічого не знайшло */}
      {totalPage === 0 && (
        <Alert>
          'Sorry, there are no images matching your search query. Please try
          again.'
        </Alert>
      )}

      {/* помилка запиту */}
      {error && <Alert>{error}</Alert>}

      <GlobalStyle />
    </>
  );
};
