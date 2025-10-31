import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryList = document.querySelector('#gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function renderGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery_item">
        <a href="${largeImageURL}">
          <img class="gallery_img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="gallery_info_wrapper">
          <p class="gallery_info">Likes <span>${likes}</span></p>
          <p class="gallery_info">Views <span>${views}</span></p>
          <p class="gallery_info">Comments <span>${comments}</span></p>
          <p class="gallery_info">Downloads <span>${downloads}</span></p>
        </div>
      </li>`
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
