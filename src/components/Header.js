import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';
import {useNavigate} from "react-router-dom";
import SideProfile from "./SideProfile";
import React, {useState} from "react";
import SideProfileUser from "./SideProfile-user";

function Header() {
    let navigate = useNavigate();
    // sideProfile=0 안보임
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
                    <input
                        type={"button"}
                        className={styles[`icon-profile-button`]}
                        onClick={() => {
                            if (sideProfile===0) {
                                setSideProfile(1);
                            } else if (sideProfile===1) {
                                setSideProfile(2);
                            } else {
                                setSideProfile(0);
                        }}}
                    />
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
            <ShowSideProfile sideProfile={sideProfile} />
            {/*{*/}
            {/*    sideProfile == 1*/}
            {/*        ? <SideProfile/> : null*/}
            {/*}*/}
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
        return <SideProfileUser/>
    }
}