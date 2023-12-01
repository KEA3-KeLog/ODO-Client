import styles from "./SignIn-1.module.css"
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import * as events from "events";

function SignIn1() {
    // email 은 소셜 로그인을 하면서 받아온 사용자 email 값 입니다.
    const location = useLocation();
    const email = location.state.email;
    const id = location.state.id;

    const baseUrl = "http://localhost:8080"

    const navigate = useNavigate()
    // 블로그 이름, 블로그 주소, 블로그 닉네임을 state로 저장합니다.
    const [userBlogName, setUserBlogName] = useState("");
    const [userBlogAddress, setUserBlogAddress] = useState("");
    const [userBlogNickname, setUserBlogNickname] = useState("");

    const saveUserBlogName = e => {
        setUserBlogName(e.target.value);
    }

    const saveUserBlogAddress = e => {
        setUserBlogAddress(e.target.value);
    }

    const saveUserBlogNickname = e => {
        setUserBlogNickname(e.target.value);
    }

    const handleClickRegister = async (e) => {
        e.preventDefault();

        // alert("save");
        await axios
            .post(baseUrl+"/oauth/user/insert", {
                email: email,
                id: id,
                userBlogName: userBlogName,
                userBlogNickname: userBlogNickname,
                userBlogAddress: userBlogAddress,
            })
            .then(function(res){
                if(res.status==200) {
                    console.log("성공");
                    navigate("/signin2", {
                        state: {
                            email: email,
                            id: id,
                            userBlogName: userBlogName,
                            userBlogAddress: userBlogAddress
                        }
                    });
                }
            })
            .catch(function () {
                console.log("실패");
            });
    };

    return (
        <>
            <div className={styles[`section-header`]}></div>
            <div className={styles.logo}></div>
            <div className={styles[`header-text`]}>
                <div className={styles[`header-title`]}>OPEN</div>
                <div className={styles[`header-sub-title`]}>나만의 블로그를 만들어 보세요.</div>
            </div>
            <div className={styles[`section-content`]}>
                <h2>블로그 정보 입력</h2>
                <div className={styles[`input-information`]}>
                    <div className={styles[`input-information-item`]}>
                        <h2>블로그 이름</h2>
                        <input
                            type={"text"}
                            className={styles[`input-style`]}
                            placeholder={"'현영'님이 작성한 블로그 클론 코딩 회고록! 지금 검색해 보세요."}
                            onChange={saveUserBlogName}/>
                    </div>
                    <div className={styles['horizontal-line']}/>
                    <div className={styles[`input-information-item`]}>
                        <h2>블로그 주소</h2>
                        <input
                            type={"text"}
                            className={styles[`input-style`]}
                            placeholder={"영문, 숫자, 하이픈 만 입력 가능 (개설 후 변경 불가)"}
                            onChange={saveUserBlogAddress}
                        />
                    </div>
                    <div className={styles['horizontal-line']}/>
                    <div className={styles[`input-information-item`]}>
                        <h2>닉네임</h2>
                        <input
                            type={"text"}
                            className={styles[`input-style`]}
                            placeholder={"블로그에서 사용할 닉네임을 지어 주세요."}
                            onChange={saveUserBlogNickname}
                        />
                    </div>
                </div>
                <div className={styles[`section-button`]}>
                    <button className={styles[`button-prev`]}
                            onClick={() => {
                                navigate('/');
                            }}>이전
                    </button>
                    {/*다음 버튼을 눌렀을 때 사용자가 입력한 정보를 email 과 함께 spring으로 보냅니다.*/}
                    <button className={styles[`button-next`]}
                            // onClick={() => {
                            //     handleClickRegister();
                            //     navigate('/signin2');}}
                            onClick={handleClickRegister}
                            >다음
                    </button>
                </div>
            </div>
        </>
    );
}

export default SignIn1;