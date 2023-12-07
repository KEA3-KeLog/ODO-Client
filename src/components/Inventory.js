import styles from './Inventory.module.css';
import styled, {css} from "styled-components";
import {useEffect, useState} from "react";
import StoreService from '../service/StoreService';
import InvenService from '../service/InvenService';

import axios from 'axios';


// 아이템 사용중 or 사용 중 아님을 나타내는 버튼 css 입니다.
const ItemStatus = styled.div`
  width: 60px;
  height: 17px;
  border-radius: 10px;
  border: 1px black solid;
  padding-top: 3px;
  font-size: 10px;
  text-align: center;
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
    const userId = localStorage.getItem("memberId");
    const [userPoint, setuserPoint] = useState("");
    const [items, setItems] = useState([]);
    const [itemDetail, setItemDetail] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const [itemStatus, setItemStatus] = useState(false);

    const [newDate, setNewDate] = useState('');
    const [dateCounts, setDateCounts] = useState({});
    const newEntry = { count: 1 };

    useEffect(() => {
        getpoint(userId);
        getInven(userId);
    },[])

    const handleItemStatusClick = () => {
        setItemStatus(!itemStatus);
    }

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


    const handleAddNewEntry = () => {
        // Check if the newDate is not empty
        if (newDate.trim() !== '') {
            // Create a new entry with the entered date and a count of 1
            const entryToAdd = { ...newEntry, date: newDate };
    
            // Log the data to be sent in the POST request
            console.log('Data to be sent in the POST request:', entryToAdd);
    
            // Assuming dateCounts is a state variable, update it with the new entry
            setDateCounts((prevDateCounts) => ({
                ...prevDateCounts,
                [newDate]: entryToAdd,
            }));
    
            // Reset the newDate input
            setNewDate('');
    
            // Send a POST request to your server to add the new entry
            axios.post('http://localhost:8080/api/post/addNewValue', entryToAdd)
                .then(response => {
                    // Handle the response if needed
                    console.log('New entry added successfully(react):', response.data);
                })
                .catch(error => {
                    console.error('Error adding new entry(react):', error);
                });
        }
    };

    


    {modalOpen && <ItemDetailModal item={itemDetail} newDate={newDate} setNewDate={setNewDate} handleAddNewEntry={handleAddNewEntry} />}
    



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
                            <button className={styles[`item`]}>
                                <div className={styles[`item-image-container`]}>
                                    <img className={styles[`item-image`]}
                                        src={require(`../assets/store-item-${item.itemId}.svg`)}
                                    />
                                </div>
                                <div className={styles[`item-status-container`]}>
                                    <div className={styles[`item-title`]}>{item.itemName}</div>

                                    {
                                        itemStatus
                                            ?
                                            <ItemStatus
                                                onClick={handleItemStatusClick}
                                                on={itemStatus}>
                                                사용중
                                            </ItemStatus>
                                            :
                                            <ItemStatus
                                                onClick={handleItemStatusClick}
                                                on={itemStatus}>
                                                장착하기
                                            </ItemStatus>

                                    }
                                    {/*<ItemStatus*/}
                                    {/*    onClick={handleItemStatusClick}*/}
                                    {/*    on={itemStatus}>*/}
                                    {/*    사용중*/}
                                    {/*</ItemStatus>*/}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                {/*해당 아이템 설명*/}
                {modalOpen && <ItemDetailModal item={itemDetail} newDate={newDate} setNewDate={setNewDate} handleAddNewEntry={handleAddNewEntry} />}
            </div>
            
        </div>
    )
}


// const ItemDetailModal = ({ item, newDate, setNewDate, handleAddNewEntry }) => {
//     return (
//         <div className={styles[`container`]}>
//             <div className={styles[`item-image-container`]}>
//                 <img className={styles[`item-image`]}
//                      src={require(`../assets/store-item-${item.itemId}.svg`)}
//                 />
//             </div>
//             <div className={styles[`item-title`]}>{item.itemName}</div>
//             <div>1개 보유</div>
//             <div className={styles[`item-docs`]}>
//                 {item.itemInfo}
//             </div>

// {item.itemId === 4 (
//     <div>
//             <input
//         type="date"
//         value={newDate}
//         onChange={(e) => setNewDate(e.target.value)}
//         placeholder="Enter date"
//       />
//       <button onClick={handleAddNewEntry}> 사용하기 </button>

//       </div>
//       )}

//         </div>
//     );
// };

const ItemDetailModal = ({ item, newDate, setNewDate, handleAddNewEntry }) => {
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


            {item.itemId === '5' ? (
                <div>
                    <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        placeholder="Enter date"
                    />
                    <button onClick={handleAddNewEntry}> 사용하기 </button>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );
};



export default Inventory;