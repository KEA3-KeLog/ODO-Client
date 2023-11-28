import axios from 'axios';

const USER_POINT_API_BASE_URL = "http://localhost:8080/store/api/userpoint/";

const UPDATE_USER_POINT_API_BASE_URL = "http://localhost:8080/store/api/purchase/";

const UPDATE_USER_INVEN_API_BASE_URL = "http://localhost:8080/store/api/inven/";

const UPDATE_ITEM_LOG =  "http://localhost:8080/store/api/itemlog/";

const INVENTORY_CHECKING = "http://localhost:8080/store/api/invencheck/";

class StoreService {
    getPoint(userId) {
        return axios.get(USER_POINT_API_BASE_URL + userId);
    }

    updatePoint(userId, point){
        return axios.get(UPDATE_USER_POINT_API_BASE_URL + userId + "?point=" + point);
    } 

    updateInven(userId, itemId){
        return axios.get(UPDATE_USER_INVEN_API_BASE_URL + userId + "?itemId=" + itemId);
    }

    ItemLog(itemId){
        return axios.get(UPDATE_ITEM_LOG + itemId);
    }

    InvenCheck(userId){
        return axios.get(INVENTORY_CHECKING + userId)
    }
}

export default new StoreService();