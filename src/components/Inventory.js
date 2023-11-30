import styles from './Inventory.module.css';
import styled, {css} from "styled-components";
import {useEffect, useState} from "react";
import StoreService from '../service/StoreService';
import InvenService from '../service/InvenService';

// 아이템 사용중 or 사용 중 아님을 나타내는 버튼 css 입니다.
const ItemStatus = styled.div`
  width: 60px;
  height: 17px;
  border-radius: 10px;
  border: 1px black solid;
  margin-top: 14px;
  font-size: 10px;
  text-align: center;
  padding-top: 3px;
  font-weight: bold;
  color: black;
  background: white;
  
  // 사용중 일때
  ${(props) =>
          props.on &&
          css`
            color: white;
            background: black;
          `}
`;

function Inventory(props) {
    const localUserData = JSON.parse(localStorage.getItem('userData'));
    const userId = localUserData.memberId;
    const [userPoint, setuserPoint] = useState("");
    const [items, setItems] = useState([]);
    const [itemDetail, setItemDetail] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getpoint(userId);
        getInven(userId);
    },[])

    const getpoint = async (userId) => {
        try {
            const response = await StoreService.getPoint(userId); // Update the URL accordingly
            setuserPoint(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setuserPoint("-");
        }
    }
    const getInven = async (userId) => {
        try {
            const response = await InvenService.getItems(userId);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const clickItemDetail = (item) => {
        setModalOpen(true);
        setItemDetail(item);
    }

    return (
        <div className={styles[`common`]}>
            <div className={styles[`point-area`]}>
                <div className={styles[`point-title`]}>
                    <div>보유</div>
                    <img
                        src={require("../assets/icon_point_black.svg").default}
                    />
                </div>
                <div className={styles[`point`]}>{userPoint}</div>
            </div>

            <div className={styles[`container-area`]}>
                {/*보유 아이템 리스트*/}
                <div className={styles[`container`]}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={()=>{clickItemDetail(item)}}
                        >
                            <div><strong>Name:</strong> {item.itemName}</div>
                            <button className={styles[`item`]}>
                                <div className={styles[`item-image-container`]}>
                                    <img className={styles[`item-image`]}
                                        src={require(`../assets/store-item-${item.itemId}.svg`)}
                                    />
                                </div>
                                <div className={styles[`item-status-container`]}>
                                    <div className={styles[`item-title`]}>{item.itemName}</div>
                                    <div className={styles[`item-status`]}>
                                        <ItemStatus on={"true"}>사용중</ItemStatus>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                {/*해당 아이템 설명*/}
                {modalOpen && <ItemDetailModal item={itemDetail}/>}
            </div>
            
        </div>
    )
}

const ItemDetailModal=({item})=>{
    return (
        <div className={styles[`container`]}>
            <div className={styles[`item-image-container`]}>
                <img className={styles[`item-image`]}
                     src={require(`../assets/store-item-${item.itemId}.svg`)}
                />
            </div>
            <div className={styles[`item-title`]}>{item.itemName}</div>
            <div>1개 보유</div>
            <div className={styles[`item-docs`]}>
                {item.itemInfo}
            </div>
        </div>
    )
}

export default Inventory;