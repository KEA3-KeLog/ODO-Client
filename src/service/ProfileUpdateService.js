import axios from 'axios';
import { profileApi } from '../api/Api';
const USER_INVEN_API_BASE_URL = `${profileApi}/userprofile/`;

const USER_PROFILE_API_BASE_URL = `${profileApi}/profileupdate/`;


class ProfileUpdateService {

    getUserInfo(userId) {
        return axios.get(USER_INVEN_API_BASE_URL + userId);
    }

    UpdateUserInfo(userId,data) {
        return axios.post(USER_PROFILE_API_BASE_URL + userId + data);
    }
    
}

export default new ProfileUpdateService();