import NavBar from './Navigationbar';
import React, {useEffect, useRef, useState} from "react";
import ResizedComponent from "./ResizedComponent";
import styles from "./StoreContent.module.css"
import axios from "axios";
import styled from "styled-components";


function StoreContent() {
    const userjwt = 1; //회원 정보는 받아야함
    const [userPoint, setUserPoint] = useState("-");

    // 상세설명 모달이 열렸는지 닫혔는지 state
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    // Modal 영역 밖 클릭 시 모달창 닫힘
    const detailModalRef = useRef();

    //아래 방식으로 페이지에 접속하자마자 API를 호출해야함
    useEffect(() => {
        //localstorage에 저장되어있는 JWT 토큰에서 회원 정보를 가지고온다.
        //const userId = localStorage.getItem('userId');
        //API 호출부분에 유저 정보를 전달
        userpointAPI(userjwt);

        // 상세설명 모달 영역 밖 클릭 시
        const handleClickOutside=(e)=>{
            if (isDetailModalOpen && !detailModalRef.current.contains(e.target)) {
                setIsDetailModalOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return()=>{
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isDetailModalOpen]);

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
        try {
            await axios.get(`http://localhost:8080/store/api/purchase/${userId}?point=${Point}`);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const itemLog = async (itemId) => {
        try {
            await axios.get(`http://localhost:8080/store/api/itemlog/${itemId}`);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const updateinven = async (userId, itemId) => {
        try {
            await axios.get(`http://localhost:8080/store/api/inven/${userId}?itemId=${itemId}`);
        } catch (error) {
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
                updatePoint(userjwt, Point)

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
            <div className={styles.screen}>
                <div className={styles["show-point"]}>
                    <div className={styles["show-point-text"]}>보유
                        <img className={styles["icon-point"]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles["text-wrapper-16"]}>{userPoint}</div>
                </div>


                {/* =============================================================== */}


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
                                <button
                                    className={styles[`item-btn-1`]}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        setIsDetailModalOpen(true);
                                        console.log("클릭 이벤트");
                                    }}
                                >상세설명</button>
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(1, "방문 인사말 보이스", 2000)}>구매하기
                                </button>
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
                                <button
                                    className={styles[`item-btn-1`]}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        setIsDetailModalOpen(true);
                                    }}
                                >상세설명</button>
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(2, "가수 아이유의 AI 보이스", 3000)}>구매하기
                                </button>
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
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(3, "배우 나나의 AI 보이스", 3000)}>구매하기
                                </button>
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
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(4, "배우 성시경의 AI 보이스", 3000)}>구매하기
                                </button>
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
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(5, "스트릭 프리즈", 2000)}>구매하기
                                </button>
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
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(6, "스트릭 그래프 염색칩 X 5", 400)}>구매하기
                                </button>
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
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(7, "스트릭 그래프 염색칩 X 40", 3000)}>구매하기
                                </button>
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
                                <button className={styles[`item-btn-2`]}
                                        onClick={() => handlePurchase(1, "", 10000)}>구매하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* =============================================================== */}
            </div>
            <div ref={detailModalRef}>
                {
                    isDetailModalOpen && <DetailModal />
                }
            </div>
        </>
    );
}

// 상세설명 창이 열리는 모달 입니다.
const DetailModal=()=>{
    return(
        <div className={styles[`detail-modal`]}>

                <div className={styles[`item-image-container`]}>
                    <img className={styles[`item-image`]}
                         src={require("../assets/store-item-1.svg").default}
                    />
                </div>
                <div className={styles[`item-title`]}>방문 인사말 보이스</div>
                <div className={styles[`item-docs`]}>
                    상세설명: <br/>
                    사용하면 블로그 방문자를 맞이하는 인사말을 자동 재생할 수 있습니다.
                    자신이 설정한 인사말의 문구를 선택한 보이스로 재생하게 됩니다.
                    기본 보이스는 자신의 목소리로, 방문 인사말 보이스를 사용한 순간 프로필에서 음량 조절 버튼이 보이게 되며
                    블로그 방문자에게 인사말 문구가 자동재생됩니다.
                </div>

        </div>
    )
}

export default StoreContent;