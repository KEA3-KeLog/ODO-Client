import axios from "axios";

const POST_API_BASE_URL = "http://localhost:8080/api/image";

class ImageService {

    
  createImage(image) {
    return axios.post(POST_API_BASE_URL, image);
  }
  
  getImage(imageId) {
    return axios.get(POST_API_BASE_URL + "/" + imageId);
}
}


export default new ImageService();