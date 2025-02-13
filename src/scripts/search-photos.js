import { getPhotos } from "../scripts/api-requests";
import SimpleLightbox from "simplelightbox";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "simplelightbox/dist/simple-lightbox.min.css";

const forms = {
  form: document.querySelector(".form-submit"),
  buttonSubmit: document.querySelector(".button-search"),
  inputForm: document.querySelector(".form-submit-input"),
  resultSearch: document.querySelector(".result-search"),
};

let SimpleLightboxGallery = {};

forms.form.addEventListener("submit", formSubmit);

async function formSubmit(evt) {
  evt.preventDefault();

  const validationSearch = forms.inputForm.value.trim();

  if (validationSearch === "") {
    Notify.failure("Please, enter your search");
    return;
  }

  try {
    forms.resultSearch.innerHTML = "";
    const response = await getPhotos(validationSearch);
    await cardListResult(response.data.hits);
    SimpleLightboxGallery = new SimpleLightbox(".result-search a");
    if (!response.data.total) {
      forms.resultSearch.innerHTML = `<p class="pixabay-picture">Oops! Something wrong! Picture not found</p>`;
      return;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

function cardListResult(arr) {
  return arr.forEach(({ webformatURL, tags, likes, views }) => {
    const markUp = `
        <div class="photo-card-pixabay">
            <a class="card-pixabay-link" href="${webformatURL}" alt="${tags}" >
                <img class="pixabay-pictures" src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
                <ul class="info-pixabay-list">
                    <li class="info-pixabay-list-item">
                        <p class="info-pixabay-item">Likes: ${likes}</p>
                    </li>
                    <li class="info-pixabay-list-item">
                        <p class="info-pixabay-item">Views: ${views}</p>
                    </li>
                </ul>
        </div>`;
    forms.resultSearch.insertAdjacentHTML("beforeend", markUp);
  });
}
