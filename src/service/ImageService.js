import axios from "axios";

const POST_API_BASE_URL = "http://localhost:8080/api/image";

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
}


export default new ImageService();