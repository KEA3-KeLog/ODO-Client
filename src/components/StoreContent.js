import React, {useEffect, useRef, useState} from "react";
import styles from "./StoreContent.module.css"
import axios from "axios";
import StoreService from "../service/StoreService";
import UserService from "../service/UserService";
import {useNavigate} from "react-router-dom";


function StoreContent() {
    //localStorage로 부터 userId 값을 가져온다.
    const localUserData = JSON.parse(localStorage.getItem('userData'));
    const userId = localStorage.getItem("memberId");
    const navigate = useNavigate();

    const [userPoint, setUserPoint] = useState("-");

    const [userItem, setUserItem] = useState([]);

    const [storeItems, setStoreItems] = useState([]);

    const [itemDetail, setItemDetail] = useState();

    // 상세설명 모달이 열렸는지 닫혔는지 state
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    // Modal 영역 밖 클릭 시 모달창 닫힘
    const detailModalRef = useRef();

    //아래 방식으로 페이지에 접속하자마자 API를 호출해야함
    useEffect(() => {
        //localstorage에 저장되어있는 JWT 토큰에서 회원 정보를 가지고온다.
        //const userId = localStorage.getItem('userId');
        //API 호출부분에 유저 정보를 전달
        userpointAPI(userId);
        checkInven(userId);
        getItems();

        // 상세설명 모달 영역 밖 클릭 시
        const handleClickOutside = (e) => {
            if (isDetailModalOpen && !detailModalRef.current.contains(e.target)) {
                setIsDetailModalOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };

    }, [isDetailModalOpen]);

    const getItems = async() => {
        try {
            const response = await StoreService.getAllItems();
            console.log(response.data);
            
            setStoreItems(response.data);
        } catch (error) {
            console.log('Error fetching store data: ', error);
        }
    }

    const userpointAPI = async (userId) => {
        try {
            const response = await StoreService.getPoint(userId); // Update the URL accordingly
            setUserPoint(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserPoint("-");
        }
    };

    const updatePoint = async (userId, Point) => {
        try {
            await StoreService.updatePoint(userId, Point);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const itemLog = async (itemId) => {
        try {
            await StoreService.ItemLog(itemId);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const updateinven = async (userId, itemId) => {
        try {
            await StoreService.updateInven(userId, itemId);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const checkInven = async (userId) => {
        try {
            const response = await StoreService.InvenCheck(userId);
            console.log(response.data);
            setUserItem(response.data);
        } catch {
            console.log("Cant Inven Check");
        }
        console.log(userItem);
    }

    const handlePurchase = (itemNum, productName, price) => {
        itemNum = parseInt(itemNum,10);
        const Point = userPoint - price
        if (userItem.includes(itemNum)) {
            alert("이미 인벤토리에 있습니다!")
        } else {
            // 가격과 사용자 포인트 비교
            if (userPoint >= price) {
                // 알림 창 띄우기
                const isConfirmed = window.confirm(`"${productName}" 상품을 ${price} 포인트에 구매하시겠습니까?`);

                if (isConfirmed) {
                    // "확인" 버튼 클릭 시
                    alert("구매되었습니다.");
                    // 사용자 포인트 업데이트
                    setUserPoint(Point);
                    updatePoint(userId, Point)

                    // item 목록 테이블과 Inven 테이블의 위치에 대한 고민
                    itemLog(itemNum)
                    updateinven(userId, itemNum)

                } else {
                    // "취소" 버튼 클릭 시
                    alert("취소되었습니다.");
                    // 페이지 Redirect
                    // 여기에 원래 페이지로 Redirect하는 로직을 추가해야 합니다.
                    // 예시: window.location.href = '/original-page';
                }
            } else {
                // 포인트가 부족한 경우 알림 창 띄우기
                alert("포인트가 부족합니다.");
                // 여기에 원래 페이지로 Redirect하는 로직을 추가해야 합니다.
                // 예시: window.location.href = '/original-page';
            }
        }
        checkInven(userId);
    };

    return (
        <>
            <div className={styles.screen}>
                <div className={styles[`point-area`]}>
                    <div className={styles[`point-title`]}>
                        <div>보유</div>
                        <img
                            src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`point`]}>{userPoint}</div>
                </div>


                {/* =============================================================== */}


                <div className={styles.content}>
                    <div className={styles.frame}>
                        {/*상점 아이템 리스트*/}
                        {storeItems.map((item, index) => (
                            <div
                                key={index}
                            >
                                <div className={styles.item}>
                                    <img className={styles[`item-image`]}
                                         alt="Image"
                                         src={require(`../assets/store-item-${item.itemId}.svg`)}
                                         width={"64px"}
                                    />
                                    <div className={styles[`item-text`]}>{item.itemName}</div>
                                    <div className={styles[`item-price`]}>{Math.floor(item.itemPrice)}
                                        <img className={styles[`icon-item-price`]}
                                             alt={""}
                                             src={require("../assets/icon_point_black.svg").default}
                                        />
                                    </div>
                                    <div className={styles[`item-btn`]}>
                                        <button
                                            className={styles[`item-btn-1`]}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsDetailModalOpen(true);
                                                setItemDetail(item);
                                            }}
                                        >상세설명
                                        </button>
                                        <button className={styles[`item-btn-2`]}
                                                onClick={() => handlePurchase(item.itemId, item.itemName, item.itemPrice)}>구매하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={detailModalRef}>
                {
                    isDetailModalOpen && <DetailModal item={itemDetail}/>
                }
            </div>
        </>
    );
}

// 상세설명 창이 열리는 모달 입니다.
const DetailModal = ({item}) => {
    return (
        <div className={styles[`detail-modal`]}>
            <div className={styles[`item-image-container`]}>
                <img className={styles[`item-image`]}
                     src={require(`../assets/store-item-${item.itemId}.svg`)}
                />
            </div>
            <div className={styles[`item-title`]}>{item.itemName}</div>
            <div className={styles[`item-docs`]}>
                상세설명: <br/>
                {item.itemInfo}
            </div>

        </div>
    )
}

export default StoreContent;