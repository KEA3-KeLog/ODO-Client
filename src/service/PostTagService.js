import axios from 'axios'
import { postTagApi } from '../api/Api';

const POSTTAG_API_BASE_URL = postTagApi;

class PostTagService {
    getPostTags(userId) {
        return axios.get(POSTTAG_API_BASE_URL + userId);
    }
}

export default new PostTagService();