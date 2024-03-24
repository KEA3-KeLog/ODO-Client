import axios from 'axios';
import { commentApi } from '../api/Api';

const POST_API_BASE_URL = commentApi;

class PostService {
    getComments(postId) {
       return axios.get(POST_API_BASE_URL + "s/" + postId);
    }

    createComment(comment) {
        return axios.post(POST_API_BASE_URL, comment);
    }

    getOneComment(commentId) {
        return axios.get(POST_API_BASE_URL + "/" + commentId);
    }

}

export default new PostService();