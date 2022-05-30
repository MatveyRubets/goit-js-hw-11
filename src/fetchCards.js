import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27044661-5039fd8f86a9259a09df45cad';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class CardsApiSerice {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchCards() {
    try {
      const res = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${options}&per_page=40&page=${this.page}`,
      );
      if (res.data.total === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }

      return res.data;
    } catch (error) {
      Notify.failure(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(searchQuery) {
    this.searchQuery = searchQuery;
  }
}
