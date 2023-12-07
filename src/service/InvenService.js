import axios from 'axios';

const USER_INVEN_API_BASE_URL = "http://localhost:8080/Inven/api/userInventory/";


class InvenService {
    getItems(userId) {
        return axios.get(USER_INVEN_API_BASE_URL + userId);
    }

    equipItem(userId, itemId) {
        const formData = new FormData();
        formData.append("itemId", itemId);
        axios.post(USER_INVEN_API_BASE_URL + userId, formData);
    }
}

export default new InvenService();