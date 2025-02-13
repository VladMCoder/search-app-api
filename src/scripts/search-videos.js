import { getVideos } from "../scripts/api-requests";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const forms = {
  form: document.querySelector(".form-submit"),
  buttonSubmit: document.querySelector(".button-search"),
  inputForm: document.querySelector(".form-submit-input"),
  resultSearch: document.querySelector(".result-search"),
};

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
    const response = await getVideos(validationSearch);
    cardListResult(response.data.hits);
    if (!response.data.total) {
      forms.resultSearch.innerHTML = `<p class="pixabay-picture">Oops! Something wrong! Video not found</p>`;
      return;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

function cardListResult(arr) {
  arr.forEach(({ tags, videos, likes, views }) => {
    const videoURL = videos.small.url;
    const markUp = `
        <div class="photo-card-pixabay">
            <video class="pixabay-pictures" width="480" src="${videoURL}" alt="${tags}" controls loading="lazy"></video>
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
