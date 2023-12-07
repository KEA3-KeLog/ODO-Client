import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/oauth/api/user/";

class UserService {
    getUser(userId) {
        return axios.get(USER_API_BASE_URL + userId);
    }

    uploadProfileImg(formData) {
        axios.post(USER_API_BASE_URL + "profileImg", formData);
    }
}

export default new UserService();