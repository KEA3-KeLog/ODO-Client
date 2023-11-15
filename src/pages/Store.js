import "./Store.css";
import StoreContent from "../components/StoreContent";
import NavBar from '../components/Navigationbar';
import React ,{useEffect, useState}from "react";
import ResizedComponent from "../components/ResizedComponent";
import styles from "../components/StoreContent.module.css"
import axios from "axios";


function Store() {
    const userjwt = 1; //회원 정보는 받아야함
    const [userPoint, setUserPoint] = useState("-"); 

    //아래 방식으로 페이지에 접속하자마자 API를 호출해야함
    useEffect(() => {
            //localstorage에 저장되어있는 JWT 토큰에서 회원 정보를 가지고온다.
            //const userId = localStorage.getItem('userId');
            //API 호출부분에 유저 정보를 전달 
            userpointAPI(userjwt);
        }, []);

    const userpointAPI = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/store/api/userpoint/${userId}`); // Update the URL accordingly
            setUserPoint(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserPoint("-");
        }
    };

    const updatePoint = async (userId, Point) => {
        try{
            await axios.get(`http://localhost:8080/store/api/purchase/${userId}?point=${Point}`);
        }catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const itemLog = async (itemId) => {
        try{
            await axios.get(`http://localhost:8080/store/api/itemlog/${itemId}`);
        }catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const updateinven = async (userId, itemId) => {
        try{
            await axios.get(`http://localhost:8080/store/api/inven/${userId}?itemId=${itemId}`);
        }catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const handlePurchase = (itemNum, productName, price) => {
        const Point = userPoint - price
        // 가격과 사용자 포인트 비교
        if (userPoint >= price) {
          // 알림 창 띄우기
            const isConfirmed = window.confirm(`"${productName}" 상품을 ${price} 포인트에 구매하시겠습니까?`);
    
            if (isConfirmed) {
                // "확인" 버튼 클릭 시
                alert("구매되었습니다.");
                // 사용자 포인트 업데이트
                setUserPoint(Point);
                updatePoint(userjwt,Point)

                // item 목록 테이블과 Inven 테이블의 위치에 대한 고민
                itemLog(itemNum)
                updateinven(userjwt, itemNum)
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
      };

    return (
        <>
            <NavBar />
            <div className="screen">
                <div className="banner">
                    <div className="text-wrapper">상점</div>
                    <img className="icon-shop-store"
                         alt="Icon shop store"
                         src={require("../assets/icon_shopstore_black.svg").default}
                    />
                </div>
                <div className={"show-point"}>
                    <div className="show-point-text">보유
                        <img className={"icon-point"}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className="text-wrapper-16">{userPoint}</div>
                </div>


                {/* =============================================================== */}
                {/* <StoreContent/> */}


                <div className={styles.content}>
            <div className={styles.frame}>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-1.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>방문 인사말 보이스</div>
                    <div className={styles[`item-price`]}>2,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(1,"방문 인사말 보이스", 2000)}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-2.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>가수 아이유의 AI 보이스</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(2,"가수 아이유의 AI 보이스", 3000)} >구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-3.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>배우 나나의 AI 보이스</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(3,"배우 나나의 AI 보이스", 3000)}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-4.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>배우 성시경의 AI 보이스</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(4,"배우 성시경의 AI 보이스", 3000)}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-5.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>스트릭 프리즈</div>
                    <div className={styles[`item-price`]}>2,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(5,"스트릭 프리즈", 2000)}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-6.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>스트릭 그래프 염색칩 X 5</div>
                    <div className={styles[`item-price`]}>400
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(6,"스트릭 그래프 염색칩 X 5", 400)}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-6.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>스트릭 그래프 염색칩 X 40</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(7,"스트릭 그래프 염색칩 X 40", 3000)}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-7.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>「도심의 야경」프로필 배경</div>
                    <div className={styles[`item-price`]}>10,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]} onClick={() => handlePurchase(1,"", 10000)}>구매하기</button>
                    </div>
                </div>
            </div>
        </div>
                {/* =============================================================== */}
            </div>
        </>
    );
}

export default Store;