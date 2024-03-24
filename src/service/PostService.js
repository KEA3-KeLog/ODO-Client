import axios from 'axios';
import { postApi } from '../api/Api';
const POST_API_BASE_URL = postApi;

class PostService {
    getAllPost() {
        return axios.get(POST_API_BASE_URL);
    }
    getPosts(userId) {
       return axios.get(POST_API_BASE_URL + "s/" + userId);
    }

    createPost(posts) {
        return axios.post(POST_API_BASE_URL, posts);
    }

    getOnePost(postId) {
        return axios.get(POST_API_BASE_URL + "/" + postId);
    }

    updatePost(postId, updatedPost) {
        return axios.put(POST_API_BASE_URL + "/" + postId, updatedPost);
    }

    deletePost(postId) {
        return axios.delete(POST_API_BASE_URL + "/" + postId);
    }

}

export default new PostService();