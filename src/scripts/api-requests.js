import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

const defaultApiKey = "27705044-7405daf320d0c0d335478c588";
const optionsPhotos = "image_photo&orientation&safesearch=true";

export async function getPhotos(value) {
  return await axios.get(`?key=${defaultApiKey}&q=${value}&${optionsPhotos}`);
}

const optionsVideos = "video_type&orientation&safesearch=true";

export async function getVideos(value) {
  return await axios.get(
    `videos/?key=${defaultApiKey}&q=${value}&${optionsVideos}`
  );
}
