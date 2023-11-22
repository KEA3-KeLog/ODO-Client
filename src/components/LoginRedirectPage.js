import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {SyncLoader} from 'react-spinners';
import styled from "styled-components";

const LoginRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const handleOAuthLogin = async (code) => {
        try {
            // 받아온 code를 서버에 전달합니다.
            // 회원가입 & 로그인
            const response = await axios.get(`http://localhost:8080/oauth/login/${params.sns}?code=${code}`);
            // 응답 데이터
            // alert("로그인 성공: " + dataList)
            // console.log("두번째꺼가 null 인지?" + dataList[1])
            // console.log("마지막 id 값은??" + dataList[2])
            console.log(response.data);
            console.log(response.data.email);
            console.log(response.data.blogName);
            console.log(response.data.memberId);

            localStorage.setItem("userData",JSON.stringify(response.data));

            if (response.data.blogName=== null) {
                navigate("/signin1", {
                    state: {
                        email: response.data.email,
                        id: response.data.memberId
                    }
                });
            } else {
                // 이미 로그인 정보가 있으면 /sign1으로 가지 않고 바로 / 로 이동
                navigate("/", {
                    state: response.data.memberId
                });
            }
        } catch (error) {
            console.log("정보는 불러오지만 400 에러가 발생합니다. 해결 아직 못함ㅜㅜ");
        }
    };

    // location 값이 변경될 때만 실행되는 코드
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        // 버튼을 클릭했을 때 리디렉트 됬었던 http://localhost:8080/oauth/{kakao/nave/google} 로 부터 인가 코드(code)를 받아옵니다.
        const code = searchParams.get('code'); 
        console.log(code); // Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            // alert("CODE = " + code)
            // console.log(code);
            handleOAuthLogin(code);
        }
    }, [location]);

    return (
        <Wrapper>
            <h3>잠시만 기다려 주세요</h3>
            <SyncLoader margin={10}/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`

export default LoginRedirectPage;