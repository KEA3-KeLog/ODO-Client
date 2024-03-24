import axios from "axios";
import { ttsApi } from "../api/Api";
const POST_API_BASE_URL = ttsApi;

class TTSService {
    constructor() {
        this.audio = new Audio();
    }

    requestVoice(contents, userId) {
        const data = {
            contents: contents,
            userId: userId
        };

        return axios.post(POST_API_BASE_URL, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error.response.data);
                throw error;
            });
    }

    playVoice(postId) {
        return axios.get(POST_API_BASE_URL + "/" + postId, {
                responseType: 'blob'
            })
            .then(response => {
                if (response.status === 200) {
                    console.log("ok");
                    this.audio.src = URL.createObjectURL(response.data);
                    this.audio.play();
                } else {
                    console.error("Unexpected response status: " + response.status);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log("Post not found");
                    // 적절한 사용자에게 알림을 보여줄 수 있습니다.
                } else {
                    console.error(error.response ? error.response.data : error.message);
                }
                throw error;
            });
    }
    pause() {
        this.audio.pause();
    }

    resume() {
        this.audio.play();
    }
}
// const formData = new FormData();
// formData.append('file', mp3File);  // mp3File은 파일 객체
// formData.append('userId', 123);    // 123은 예시, 실제 userId를 사용하세요.

// // axios를 사용하여 요청을 보낼 때
// axios.post('http://localhost:8000/api/tts/clone', formData, {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error.response.data);
// });



export default new TTSService();