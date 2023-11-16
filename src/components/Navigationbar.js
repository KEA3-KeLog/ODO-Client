import styles from './Navigationbar.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function Navigationbar(props) {
    // navModalOpen이 true 이면 모달창 열림
    const [navModalOpen, setNavModalOpen] = useState(false);
    const navigate = useNavigate();
    // navModal 영역 밖 클릭 시 모달창 닫기
    const modalEl = useRef();
    const userId = props.userId;

    // useEffect(()=>{
    //     console.log("modalEl.current: ", modalEl.current);
    //     const handleClickOutside=(e)=>{
    //         if (navModalOpen && !modalEl.current.contains(e.target)) {
    //             console.log("먀");
    //             setNavModalOpen(false);
    //         }
    //     }
    //     window.addEventListener("click", handleClickOutside);
    //     return()=>{
    //         window.removeEventListener("click", handleClickOutside);
    //     };
    // }, [navModalOpen]);

    const handleBlogNameClick = () => {
        navigate(`../../myblogpage/${userId}`);
    };

    return (
        <>
            <div className={styles.navigation}>
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
                >hyun_dev</button>
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

export default Navigationbar;