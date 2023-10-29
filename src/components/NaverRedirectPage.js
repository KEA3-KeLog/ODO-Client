import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const NaverRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthNaver = async (code) => {
        try {
            // 네이버로부터 받아온 code를 서버에 전달합니다.
            // 회원가입 & 로그인
            const response = await axios.get(`http://localhost:8080/oauth/login/naver?code=${code}`);
            let dataList = [];
            dataList = response.data; // 응답 데이터
            if (dataList[1] === null) {
                navigate("/signin1", {
                    state: {
                        email: dataList[0],
                        id: dataList[2]
                    }
                });
            } else {
                // 이미 로그인 정보가 있으면 /sign1으로 가지 않고 바로 / 로 이동
                navigate("/", {
                    state: "ok"
                });
            }
        } catch (error) {
            console.log("정보는 불러오지만 400 에러가 발생합니다. 해결 아직 못함ㅜㅜ");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        // 버튼을 클릭했을 때 리디렉트 됬었던 http://localhost:8080/oauth/naver 로 부터 인가 코드(code)를 받아옵니다.
        const code = searchParams.get('code');  // 네이버는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            // alert("CODE = " + code)
            // console.log(code);
            handleOAuthNaver(code);
        }
    }, [location]);

    return (
        <div>
            <div>빙글빙글 돌아가는 로딩 아이콘</div>
        </div>
    );
};

export default NaverRedirectPage;