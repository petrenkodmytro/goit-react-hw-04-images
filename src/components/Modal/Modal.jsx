import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // слухач для кнопок
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  // чистимо за собою після закриття модалки
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    // перевірка клавіші Escape
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  // закриття модалки по кліку на бекдроп
  onBackdropeClick = e => {
    // перевірка чи клік був на бекдроп
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropeClick}>
        <ModalDiv>{this.props.children}</ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}
