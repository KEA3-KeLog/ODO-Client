import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';
import {useNavigate} from "react-router-dom";
import SideProfile from "./SideProfile";
import React, {useRef, useState} from "react";
import SideProfileUser from "./SideProfile-user";
import {defaultUrlTransform} from "react-markdown";

function Header() {
    let navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <div className={styles[`header-content`]}>
                    <Navbar.Brand onClick={() => {
                        navigate('/')
                    }}>
                        <img
                            alt="logo_ODO"
                            src={require('../assets/logo.png')}
                            width="180px"
                        />
                    </Navbar.Brand>
                    <button
                        className={styles[`icon-profile-button`]}
                        onClick={() => {
                            setShowProfile(!showProfile);
                        }}
                    >
                        <img id={"profileImg"}
                            alt={""}
                            src={require("../assets/icon_profile.svg").default}
                        />
                    </button>
                </div>
                <div className={styles[`header-navigate`]}>
                    <a
                        className={styles.navigate}
                        onClick={() => {
                            navigate('/')
                        }}>메인페이지</a>
                    <a
                        className={styles.navigate}
                        onClick={() => {
                            navigate('/store')
                        }}>상점</a>
                </div>
            </Navbar>
            <div className={styles[`section-main-bg-text-box`]}>
                <p className={styles[`section-main-bg-title`]}>내 목소리로 듣는 블로그<br/></p>
                <p className={styles[`section-main-bg-subtitle`]}>ODO와 함께 시작하세요</p>
                <button className={styles[`section-main-bg-button`]}>자세히보기</button>
            </div>
            {
                // 버튼 안 눌렀을 때 -> null
                // 버튼 눌렀을 때 -> 스토리지에 "memeberId" 값이 있는지 확인
                !showProfile
                ? null
                    : (localStorage.getItem("memberId")
                    ? <SideProfileUser />
                        :<SideProfile />
                    )
            }
        </>
    );
}

export default Header;

function changeProfileImage() {
    let profileImg = document.getElementById("profileImg");
    profileImg.src = require("../assets/author_profile.svg").default;

}