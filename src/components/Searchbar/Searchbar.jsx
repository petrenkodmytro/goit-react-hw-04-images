import { BiSearch } from 'react-icons/bi';
import {
  SearchbarWrap,
  SearchBtn,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  notificationMassege,
  notificationOptions,
} from '../Notification/Notification';

export const Searchbar = ({ onSubmit }) => {
  const [textQuery, setTextQuery] = useState('');

  const onChangeInput = e => {
    setTextQuery(e.currentTarget.value.trim().toLowerCase());
  };

  const onSubmitForm = e => {
    e.preventDefault();
    // уведомление
    if (textQuery === '') {
      toast.error(`${notificationMassege}`, notificationOptions);
    }
    //фун-я onSubmit пришла из App через пропсы
    onSubmit(textQuery);
    //очистка строки поиска
    setTextQuery('');
  };

  return (
    <SearchbarWrap>
      <SearchForm onSubmit={onSubmitForm}>
        <SearchBtn type="submit">
          <BiSearch size="24" />
        </SearchBtn>

        <SearchInput
          value={textQuery}
          onChange={onChangeInput}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
      <ToastContainer />
    </SearchbarWrap>
  );
};

// Пример на классах

// export class Searchbar extends Component {
//   state = {
//     textQuery: '',
//   };
//   // следим за изменениями Input (контролируемый элемент)
//   onChangeInput = e => {
//     this.setState({ textQuery: e.currentTarget.value.trim().toLowerCase() });
//   };

//   onSubmitForm = e => {
//     e.preventDefault();
//     // уведомление
//     if (this.state.textQuery === '') {
//       toast.error(`${notificationMassege}`, notificationOptions);
//     }
//     //фун-я onSubmit пришла из App через пропсы
//     this.props.onSubmit(this.state.textQuery);
//     //очистка строки поиска
//     this.setState({ textQuery: '' });
//   };

//   render() {
//     return (
//       <SearchbarWrap>
//         <SearchForm onSubmit={this.onSubmitForm}>
//           <SearchBtn type="submit">
//             <BiSearch size="24" />
//           </SearchBtn>

//           <SearchInput
//             value={this.state.textQuery}
//             onChange={this.onChangeInput}
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//         <ToastContainer />
//       </SearchbarWrap>
//     );
//   }
// }
