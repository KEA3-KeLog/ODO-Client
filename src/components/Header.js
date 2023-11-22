import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';
import {useNavigate} from "react-router-dom";
import SideProfile from "./SideProfile";
import React, {useRef, useState} from "react";
import SideProfileUser from "./SideProfile-user";
import {defaultUrlTransform} from "react-markdown";

function Header(props) {
    let navigate = useNavigate();
    // sideProfile=0 클릭안해서 안보이는 상태
    // sideProfile=1 로그인 안 된 상태
    // sideProfile=2 로그인 되서 프로필이 보임
    const [sideProfile, setSideProfile] = useState(0);

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
                            // 로그인 안 된 상태
                            if (sideProfile===0 && !props.sideProfileUser) {
                                setSideProfile(1);
                            }
                            // 로그인 된 상태 -> 유저 프로필 모달
                            else if (sideProfile===0 && props.sideProfileUser) {
                                setSideProfile(2);
                                // changeProfileImage();
                            } else {
                                setSideProfile(0);
                        }}}
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
            <ShowSideProfile sideProfile={sideProfile} id={props.id}/>
        </>
    );
}

export default Header;

function ShowSideProfile(props) {
    if (props.sideProfile==0) {
        return null;
    } else if (props.sideProfile==1) {
        return <SideProfile/>;
    } else {
        return <SideProfileUser id={props.id}/>
    }
}

function changeProfileImage() {
    let profileImg = document.getElementById("profileImg");
    profileImg.src = require("../assets/author_profile.svg").default;

}