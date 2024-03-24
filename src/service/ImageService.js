import axios from "axios";
import { imageApi } from "../api/Api";

const POST_API_BASE_URL = imageApi;

class ImageService {

    
  uploadImage(formData) {
    return axios.post(POST_API_BASE_URL, formData);
  }
  
  getImage(imageId) {
    return axios.get(POST_API_BASE_URL + "/" + imageId);
}
  getThumbnail(postKey) {
    return axios.get(POST_API_BASE_URL + "/thumbnail/" + postKey);
  }

  updateImage(formData) {
    return axios.post(POST_API_BASE_URL + "/update", formData);
  }
  deleteImage(postKey) {
    return axios.post(POST_API_BASE_URL + "/delete", { postKey: postKey });
  }
}
export default new ImageService();