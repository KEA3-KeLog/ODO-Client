import axios from 'axios';

const USER_INVEN_API_BASE_URL = "http://localhost:8080/Inven/api/userInventory/";


class InvenService {
    getItems(userId) {
        return axios.get(USER_INVEN_API_BASE_URL + userId);
    }
}

export default new InvenService();