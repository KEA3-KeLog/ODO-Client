import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/api/post";

class PostService {
    getPosts() {
       return axios.get(POST_API_BASE_URL);
    }

    createPost(posts) {
        return axios.post(POST_API_BASE_URL, posts);
    }

    getOnePost(id) {
        return axios.get(POST_API_BASE_URL + "/" + id);
    }
}

export default new PostService();