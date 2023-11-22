import axios from 'axios'

const VOICEFILE_API_BASE_URL = "http://localhost:8080/api/uploadvoicefile";

class VoiceFileService {
    uploadVoiceFile(formData) {
        return axios.post(VOICEFILE_API_BASE_URL, formData);
    }
}

export default new VoiceFileService();