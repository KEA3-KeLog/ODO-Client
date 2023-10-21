import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthKakao = async (code) => {
        try {
            // 카카오로부터 받아온 code를 서버에 전달합니다.
            // 회원가입 & 로그인
            const response = await axios.get(`http://localhost:8080/oauth/login/kakao?code=${code}`);
            const data = response.data; // 응답 데이터
            alert("로그인 성공: " + data)
            navigate("/success");
        } catch (error) {
            navigate("/fail");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        // 버튼을 클릭했을 때 리디렉트 됬었던 http://localhost:8080/oauth/kakao 로 부터 인가 코드(code)를 받아옵니다.
        const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            alert("CODE = " + code)
            handleOAuthKakao(code);
        }
    }, [location]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default KakaoRedirectPage;