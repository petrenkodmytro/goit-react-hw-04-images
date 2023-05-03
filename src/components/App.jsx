import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { fetchData } from 'api/fetchData';
import { Alert } from './ImageGallery/ImageGallery.styled';

export class App extends Component {
  state = {
    textQuery: '',
    images: [],
    pageNumber: 1,
    loading: false, // spiner
    showModal: false,
    error: null,
    totalPage: null,
  };

  // записываем запрос поиска в App из Searchbar
  handleSubmit = searchValue => {
    this.setState({ textQuery: searchValue, pageNumber: 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    let { pageNumber } = this.state;
    const prevSearchValue = prevState.textQuery;
    const nextSearchValue = this.state.textQuery;
    
    if (prevSearchValue !== nextSearchValue) {
      this.setState({ pageNumber: 1, images: [] });
    }

    // Перевіряємо, чи змінились пропси запиту або state сторінки (pageNumber)
    if (
      prevSearchValue !== nextSearchValue ||
      prevState.pageNumber !== pageNumber
    ) {
      // запуск спінера
      this.setState({ loading: true, error: null });

      // пішов запит на бекенд
      try {
        const response = await fetchData(nextSearchValue, pageNumber);
        console.log('запит:', nextSearchValue);
        console.log('номер сторінки:', pageNumber);
        this.setState(prevState => ({
          images:
            pageNumber === 1
              ? response.data.hits
              : [...prevState.images, ...response.data.hits],
          totalPage: response.data.totalHits,
        }));
      } catch (error) {
        this.setState({ error: 'Something wrong. Please try again.' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <Layout>
          <ImageGallery
            images={this.state.images}
            openModal={this.onOpenModal}
          />
        </Layout>

        {/* модалка */}
        {this.state.showModal && (
          <Modal closeModal={this.onCloseModal}>
            <img src={this.state.imgUrl} alt={this.state.tag} />
          </Modal>
        )}

        {/* спінер */}
        <Loader isLoading={this.state.loading} />

        {/* кнопка завантажити ще */}
        {this.state.totalPage / 12 > this.state.pageNumber && (
          <Button loadMore={this.onLoadMore} />
        )}

        {/* нічого не знайшло */}
        {this.state.totalPage === 0 && (
          <Alert>
            'Sorry, there are no images matching your search query. Please try
            again.'
          </Alert>
        )}

        {/* помилка запиту */}
        {this.state.error && <Alert>{this.state.error}</Alert>}

        <GlobalStyle />
      </>
    );
  }
}
