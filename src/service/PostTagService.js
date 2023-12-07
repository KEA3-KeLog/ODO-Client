import axios from 'axios'

const POSTTAG_API_BASE_URL = "http://localhost:8000/api/post-tags/count/";

class PostTagService {
    getPostTags(userId) {
        return axios.get(POSTTAG_API_BASE_URL + userId);
    }
}

export default new PostTagService();