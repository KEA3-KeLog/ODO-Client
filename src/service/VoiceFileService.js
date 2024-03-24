import axios from 'axios'
import { voiceApi } from '../api/Api';

const VOICEFILE_API_BASE_URL = voiceApi;

class VoiceFileService {
    uploadVoiceFile(formData) {
        return axios.post(VOICEFILE_API_BASE_URL, formData);
    }
}

export default new VoiceFileService();