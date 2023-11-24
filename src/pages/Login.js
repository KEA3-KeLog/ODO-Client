import { useCallback } from "react";
import "./Login.css";
import Button from 'react-bootstrap/Button';
import ODOLogo from '../img/logo.png';
import naverLogo from '../img/naver.png';
import kakaoLogo from '../img/kakao.jpg';
import googleLogo from '../img/google.jpg';
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
// function Login() {
//      const { login } = useUser();
//     let navigate = useNavigate()

//     const handleKakaoButtonClick = () => {
//         window.location.href = 'http://localhost:8080/oauth/kakao';
//     };

//     const handleNaverButtonClick = () => {
//         window.location.href = 'http://localhost:8080/oauth/naver';
//     };

//     const handleGoogleButtonClick = () => {
//         window.location.href = 'http://localhost:8080/oauth/google';
//     };

//     //let [fade, setFade] = useState('');

//     /*useEffect(() => {
//         setTimeout(() => { setFade('end') }, 500);
//     }, [fade])

//     const onLbjNotion01ImageClick = useCallback(() => {
//         window.open(
//             "https://chestnut-pest-92d.notion.site/KAKAO-Enterprise-Academy-0b351038ba694fffaf895e81ae9f9a97?pvs=4"
//         );
//     }, []);

//     const onFigmaLogoIcon1472891ImageClick = useCallback(() => {
//         window.open("https://www.figma.com/files/team/1283970495007828691");
//     }, []);

//     const onImageClick = useCallback(() => {
//         window.open("https://github.com/KEA3-KeLog");
//     }, []);*/
function Login() {

    const navigate = useNavigate();
    const handleOAuthButtonClick = async (oauthType) => {
        try {
            // 여기에 스프링 부트 서버의 URL을 넣어주세요.
            const serverURL = 'http://localhost:8080';

            // 클릭한 OAuth 버튼에 따라서 OAuth 로그인 URL 생성
            const oauthURL = `${serverURL}/oauth/${oauthType.toLowerCase()}`;

            // OAuth 로그인 URL로 이동
            window.location.href = oauthURL;
        } catch (error) {
            console.error('Error while handling OAuth button click:', error);
        }
    };

    // 컴포넌트가 로드되면서 서버에서 데이터를 가져옴
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // 여기에 스프링 부트 서버의 URL을 넣어주세요.
    //             const serverURL = 'http://localhost:8080';

    //             // 현재 페이지 URL에서 코드 파라미터를 추출
    //             const code = new URLSearchParams(window.location.search).get('code');

    //             // if (code) {
    //             //     // 코드가 존재하면 백엔드에 해당 코드를 전달하여 로그인 처리
    //             //     const response = await axios.get(`${serverURL}/oauth/callback?code=${code}`, {
    //             //         withCredentials: true, // withCredentials 옵션 추가
    //             //     });

    //             //     // 서버에서 받은 데이터를 출력 (여기에서는 로그인 정보를 콘솔에 출력)
    //             //     console.log(response.data);

    //             //     // 받은 데이터를 어딘가에 저장하고 필요한 작업 수행
    //             //     // 예시: localStorage에 저장
    //             //     localStorage.setItem('myId', response.data);

    //             //     navigate('/');
    //             // }
    //         } catch (error) {
    //             console.error('Error while fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하면 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    return (
        <>
            <div className={"odoLogo"}>
                <img
                    src={ODOLogo}
                    width="180px"
                />
            </div>
            <div style={{ paddingTop: 50 }}>
                <button
                    className="naverLogin"
                    onClick={() => handleOAuthButtonClick('Naver')}
                >
                    <img className="naverLogo" src={naverLogo} alt="Naver Logo" />
                    <span className="naverText">네이버 로그인</span>
                </button>
            </div>
            <div style={{ paddingTop: 10 }}>
                <button
                    className="kakaoLogin"
                    onClick={() => handleOAuthButtonClick('Kakao')}
                >
                    <img className="kakaoLogo" src={kakaoLogo} alt="Kakao Logo" />
                    <span className="kakaoText">카카오 로그인</span>
                </button>
            </div>
            <div style={{ paddingTop: 10 }}>
                <button
                    className="googleLogin"
                    onClick={() => handleOAuthButtonClick('Google')}
                >
                    <img className="googleLogo" src={googleLogo} alt="Google Logo" />
                    <span className="googleText">구글 로그인</span>
                </button>
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
                <text className="normal">아직 회원이 아니신가요?</text>
                <button className={"bold"}
                    onClick={()=>{
                        navigate('/signin1')
                    }}>회원가입</button>
            </div>
            <div className={"login-footer"}></div>
        </>
    );
};

export default Login;
