import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/api/comment";

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