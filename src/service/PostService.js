import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/api/post";

class PostService {
    getPosts() {
       return axios.get(POST_API_BASE_URL);
    }

    createPost(posts) {
        return axios.post(POST_API_BASE_URL, posts);
    }

    getOnePost(no) {
        return axios.get(POST_API_BASE_URL + "/" + no);
    }
}

export default new PostService();