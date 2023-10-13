import { useCallback } from "react";
import "./login.css";
import Button from 'react-bootstrap/Button';
import ODOLogo from './img/logo.png';
import naverLogo from './img/naver.png';
import kakaoLogo from './img/kakao.jpg';
import googleLogo from './img/google.jpg';
import { useState, useEffect } from 'react';
function login() {
    //let [fade, setFade] = useState('');

    /*useEffect(() => {
        setTimeout(() => { setFade('end') }, 500);
    }, [fade])

    const onLbjNotion01ImageClick = useCallback(() => {
        window.open(
            "https://chestnut-pest-92d.notion.site/KAKAO-Enterprise-Academy-0b351038ba694fffaf895e81ae9f9a97?pvs=4"
        );
    }, []);

    const onFigmaLogoIcon1472891ImageClick = useCallback(() => {
        window.open("https://www.figma.com/files/team/1283970495007828691");
    }, []);

    const onImageClick = useCallback(() => {
        window.open("https://github.com/KEA3-KeLog");
    }, []);*/

    return (
        <>
            <img style={{ paddingTop: 200 }}
                className="ODOLogo"
                src={ODOLogo}
                width="180px"

            />
            <div style={{ paddingTop: 70 }}>
                <Button
                    className="naverLogin">
                    <img className="naverLogo"
                        src={naverLogo} />
                    <text className="naverText">네이버 로그인</text>
                    {/* <div style={{ paddingTop: 17, paddingLeft: 130, paddingBottom: 13, paddingRight: 160 }}>
                        <text className="naverText">네이버 로그인</text>
                    </div> */}

                </Button>
            </div >
            <div style={{ paddingTop: 10 }}>
                <Button
                    className="kakaoLogin"
                ><img className="kakaoLogo"
                    src={kakaoLogo} />
                    <text className="kakaoText">카카오 로그인</text>
                </Button>
            </div>
            <div style={{ paddingTop: 10 }}>
                <Button
                    className="googleLogin"
                ><img className="googleLogo"
                    src={googleLogo} />
                    <text className="googleText">구글 로그인</text>
                </Button>
            </div>
            <div style={{ paddingTop: 50 }}>
                <Button type="button"
                    className="emailLogin"
                >
                    <text className="emailText">이메일로 로그인</text>
                </Button>
            </div>
            <div style={{ paddingTop: 50 }}
            className="signIn">
                <text className="normal">아직 회원이 아니신가요? </text>
                <text className="bold">회원가입</text>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="200%" viewBox="0 0 1440 0" fill="none">
                <path d="M120 0L1646 232.5L1380.5 451.5L-65 405.5L-93.5 96L120 0Z" fill="#F3F3F3" />
            </svg>
        </>


    );
};

export default login;
