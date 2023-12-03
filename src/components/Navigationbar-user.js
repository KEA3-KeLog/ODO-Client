import styles from './Navigationbar-user.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import StoreService from "../service/StoreService";

function NavigationbarUser() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("memberId");

    const [userPoint, setUserPoint] = useState("-");

    // isModalOpen이 true 이면 모달창 열림
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        userpointAPI(userId);
        // Modal 영역 밖 클릭 시 모달창 닫기
        const handleClickOutside = (e) => {
            if (isModalOpen && !modalRef.current.contains(e.target)) {
                setIsModalOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isModalOpen]);

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

    const handleBlogNameClick = () => {
        navigate(`../../myblogpage/${userId}`);
    };

    const handleMyPageClick = () => {
        navigate(`../../mypage/${userId}`)
    }

    const handleBlogLogoClick = () => {
        navigate(`../../`, {state: userId});
    }

    return (
        <div>
            <div className={styles.navigation}>
                <div className={styles.common}>
                    <button
                        className={styles[`hamburger-menu`]}
                        onClick={(e) => {
                            // 이벤트 버블링 방지
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                    />
                    <input type={"button"}
                           className={styles[`nav-logo`]}
                           onClick={handleBlogLogoClick}
                    />
                    <button className={styles[`blog-name`]}
                            onClick={handleBlogNameClick}
                    >{localStorage.getItem("blogName")}
                    </button>
                </div>
                <div className={styles[`user-menu`]}>
                    <button>
                        <img
                            src={require("../assets/icon_point_gray.svg").default}
                        />
                        <div>{userPoint}</div>
                    </button>
                    <button onClick={handleMyPageClick}>
                        <img
                            src={require("../assets/icon_home.svg").default}
                        />
                        <div>마이페이지</div>
                    </button>
                </div>
            </div>
            <div
                ref={modalRef}>
                {
                    isModalOpen && (<Modal/>)
                }
            </div>
        </div>
    );
}


const Modal = () => {
    return (
            <div className={styles.navModal}>
                <div className={styles.tag}>
                    <div className={styles.tagList}>태그목록</div>
                    <ul>
                        <li>전체보기 <p>(50)</p></li>
                        <li>JavaScript <p>(12)</p></li>
                        <li>Algorithm <p>(26)</p></li>
                        <li>SpringBoot <p>(4)</p></li>
                    </ul>
                </div>
                <div className={styles.link}>
                    <div className={styles.linkList}>링크</div>
                    <ul>
                        <li>현영의 브런치 스토리</li>
                        <li>현영의 깃허브</li>
                    </ul>
                </div>
            </div>
    );
}

export default NavigationbarUser;