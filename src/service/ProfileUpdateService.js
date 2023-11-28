import axios from 'axios';

const USER_INVEN_API_BASE_URL = "http://localhost:8080/profile/api/userprofile/";

const USER_PROFILE_API_BASE_URL = "http://localhost:8080/profile/api/profileupdate/";


class ProfileUpdateService {
    getUserInfo(userId) {
        return axios.get(USER_INVEN_API_BASE_URL + userId);
    }

    UpdateUserInfo(userId,data) {
        return axios.post(USER_PROFILE_API_BASE_URL + userId + data);
    }
}

export default new ProfileUpdateService();