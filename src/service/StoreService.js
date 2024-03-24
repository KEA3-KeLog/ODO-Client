import axios from 'axios';
import { storeApi } from '../api/Api';

const USER_POINT_API_BASE_URL = `${storeApi}/userpoint/`;

const UPDATE_USER_POINT_API_BASE_URL =  `${storeApi}/purchase/`;

const UPDATE_USER_INVEN_API_BASE_URL =  `${storeApi}/inven/`;

const UPDATE_ITEM_LOG =   `${storeApi}/itemlog/`;

const INVENTORY_CHECKING =  `${storeApi}/invencheck/`;

const GET_ALL_ITEMS =  `${storeApi}/getAllItems`;

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

    getAllItems(){
        return axios.get(GET_ALL_ITEMS);
    }
}

export default new StoreService();