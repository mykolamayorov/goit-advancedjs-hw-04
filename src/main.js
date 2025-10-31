import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  totalHits = 0;
  clearGallery();

  hideLoadMore();
  showLoader();

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(data.hits);

    if (totalHits > data.hits.length) {
      showLoadMore();
    } else {
      hideLoadMore();
    }
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMore();
  showLoader();

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);

    const cardHeight = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalLoaded = document.querySelectorAll('.gallery_item').length;
    if (totalLoaded >= totalHits) {
      hideLoadMore();
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMore();
    }
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMore() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMore() {
  loadMoreBtn.classList.add('hidden');
}
