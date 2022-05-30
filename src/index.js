import { Notify } from 'notiflix/';
import './sass/main.scss';

import CardsApiSerice from './fetchCards';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const cardsApiSerice = new CardsApiSerice();

function handleSearch(e) {
  e.preventDefault();

  clearGallery();
  cardsApiSerice.query = refs.searchForm.elements.searchQuery.value.trim();

  if (cardsApiSerice.query === '') {
    return Notify.failure('Please input a valid query');
  }

  cardsApiSerice.resetPage();
  cardsApiSerice.fetchCards().then(appendGallery);
  refs.loadMoreBtn.classList.remove('hidden');
}

function onLoadMore() {
  cardsApiSerice.incrementPage();
  cardsApiSerice.fetchCards().then(appendGallery);
}

function appendGallery({ hits }) {
  const markup = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
      <a class="shadow rounded-sm" href="${largeImageURL}">
        <img class=" object-fit" width="400" height="300" src="${webformatURL}" alt="${tags}">
        <ul class="flex justify-around items-center">
          <li class="flex flex-col items-center py-1">
            <p>Likes</p>
            <p>${likes}</p>
          </li>
          <li class="flex flex-col items-center py-1">
            <p>Views</p>
            <p>${views}</p>
          </li>
          <li class="flex flex-col items-center py-1">
            <p>Comments</p>
            <p>${comments}</p>
          </li>
          <li class="flex flex-col items-center py-1">
            <p>Downloads</p>
            <p>${downloads}</p>
          </li>
        </ul>
    </a>

      `;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.searchForm.addEventListener('submit', handleSearch);
