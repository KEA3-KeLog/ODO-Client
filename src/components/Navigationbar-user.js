import styles from './Navigationbar-user.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function NavigationbarUser(props) {
    // navModalOpen이 true 이면 모달창 열림
    const [navModalOpen, setNavModalOpen] = useState(false);
    const navigate = useNavigate();
    // navModal 영역 밖 클릭 시 모달창 닫기
    const modalEl = useRef();
    const userId = props.userId;

    const handleBlogNameClick = () => {
        navigate(`../../myblogpage/${userId}`);
    };

    const handleStoreClick =  () => {
        navigate(`../../store`)
    };

    const handleMyPageClick = () => {
        navigate(`../../mypage/${userId}`)
    }

    return (
        <>
            <div className={styles.navigation}>
                <div className={styles.common}>
                    <input
                        type={"button"}
                        className={styles[`hamburger-menu`]}
                        onClick={() => {
                            setNavModalOpen(true);
                        }}
                    />
                    <input type={"button"}
                           className={styles[`nav-logo`]}
                    />
                    <button className={styles[`user-name`]}
                            onClick={handleBlogNameClick}
                    >hyun_dev
                    </button>
                </div>
                <div className={styles[`user-menu`]}>
                    <button>
                        <img
                            src={require("../assets/icon_point_gray.svg").default}
                            />
                            <div>1,150</div>
                    </button>
                    <button onClick={handleStoreClick}>
                        <img
                            src={require("../assets/icon_shopstore_gray.svg").default}
                        />
                        <div>상점</div>
                    </button>
                    <button onClick={handleMyPageClick}>
                        <img
                            src={require("../assets/icon_home.svg").default}
                        />
                        <div>마이페이지</div>
                    </button>
                </div>
            </div>
            <div ref={modalEl}>
                {
                    navModalOpen && <NavModal/>
                }
            </div>
        </>
    );
}


const NavModal = () => {
    return (
        <div className={styles[`nav-modal`]}>
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