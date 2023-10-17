import styles from "./SignIn-1.module.css"
import React from "react";
import {useNavigate} from "react-router-dom";

function SignIn1() {
    const navigate = useNavigate()

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
                        <input type={"text"} className={styles[`input-style`]}
                               placeholder={"'현영'님이 작성한 블로그 클론 코딩 회고록! 지금 검색해 보세요."}/>
                    </div>
                    <div className={styles['horizontal-line']}/>
                    <div className={styles[`input-information-item`]}>
                        <h2>블로그 주소</h2>
                        <input type={"text"} className={styles[`input-style`]}
                               placeholder={"영문, 숫자, 하이픈 만 입력 가능 (개설 후 변경 불가)"}/>
                    </div>
                    <div className={styles['horizontal-line']}/>
                    <div className={styles[`input-information-item`]}>
                        <h2>닉네임</h2>
                        <input type={"text"} className={styles[`input-style`]} placeholder={"블로그에서 사용할 닉네임을 지어 주세요."}/>
                    </div>
                </div>
                <div className={styles[`section-button`]}>
                    <button className={styles[`button-prev`]}
                            onClick={() => {
                                navigate('/');
                            }}>이전
                    </button>
                    <button className={styles[`button-next`]}
                            onClick={() => {
                                navigate('/signin2');
                            }}>다음
                    </button>
                </div>
            </div>
        </>
    );
}

export default SignIn1;