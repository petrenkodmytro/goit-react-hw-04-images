import axios from 'axios';

export async function fetchData(query, pageNumber) {
  const API_URL = 'https://pixabay.com/api/';
  // параметри запиту на бекенд
  const options = {
    params: {
      key: '34377092-e5c25fb54909ad5e9d7281441',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: pageNumber,
      per_page: 12,
    },
  };

  const response = await axios.get(API_URL, options);
  // console.log(response.data);
  return response;
}
