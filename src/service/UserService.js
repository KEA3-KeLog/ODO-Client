import axios from 'axios';
import { userApi } from '../api/Api';

const USER_API_BASE_URL = userApi;

class UserService {
    getUser(userId) {
        return axios.get(USER_API_BASE_URL + userId);
    }

    uploadProfileImg(formData) {
        axios.post(USER_API_BASE_URL + "profileImg", formData);
    }
}

export default new UserService();