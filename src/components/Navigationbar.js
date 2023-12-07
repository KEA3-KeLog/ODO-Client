import styles from './Navigationbar.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../service/UserService";

function Navigationbar(props) {
    const navigate = useNavigate();

    // 유저 정보 변수
    const userId = props.userId;
    
    const [userName, setUserName] = useState("");
    const [userBlogName, setUserBlogName] = useState("");


    // isModalOpen이 true 이면 모달창 열림
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Modal 영역 밖 클릭 시 모달창 닫힘
    const modalRef = useRef();

    useEffect(()=>{
        UserService.getUser(userId).then(function (res) {
            setUserName(res.data.blog_nickname);
            setUserBlogName(res.data.blog_name);
        })
        const handleClickOutside=(e)=>{
            if (isModalOpen && !modalRef.current.contains(e.target)) {
                setIsModalOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return()=>{
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isModalOpen]);

    const handleBlogNameClick = () => {
        navigate(`../../myblogpage/${userId}`);
    };

    const handleBlogLogoClick = () => {
        navigate(`../../`, {state: userId});
    }

    return (
        <>
            <div className={styles.navigation}>
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
                >{userBlogName}</button>
            </div>
            <div ref={modalRef}>
                {
                    isModalOpen && (<Modal />)
                }
            </div>
        </>
    );
}

const Modal = () => {
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