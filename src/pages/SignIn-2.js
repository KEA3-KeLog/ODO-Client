import styles from "./SignIn-2.module.css"
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

function SignIn2() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state.email;
    const userBlogAddress = location.state.userBlogAddress;

    return (
        <>
            <div className={styles[`section-header`]}></div>
            <div className={styles.logo}></div>
            <div className={styles[`header-text`]}>
                <div className={styles[`header-title`]}>OPEN</div>
                <div className={styles[`header-sub-title`]}>나만의 블로그를 만들어 보세요.</div>
            </div>
            <div className={styles[`section-content`]}>
                <h2>ODO 회원가입이 완료되었습니다.</h2>
                <div className={styles[`content-information`]}>
                    <div className={styles[`content-information-item`]}>
                        <div className={styles[`item-title`]}>가입계정</div>
                        <div className={styles[`item-content`]}>{email}</div>
                    </div>
                    <div className={styles[`content-information-item`]}>
                        <div className={styles[`item-title`]}>ODO 주소</div>
                        <div className={styles[`item-content`]}>{userBlogAddress}</div>
                    </div>
                </div>
                <button className={styles[`button-style`]}
                        onClick={() => {
                            navigate("/", {
                                state: "ok"
                            });
                        }}>ODO 둘러보기
                </button>
            </div>
        </>
    );
}

export default SignIn2;