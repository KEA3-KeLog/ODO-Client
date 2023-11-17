import styles from "./ProfileEdit.module.css";
import React, {useState} from "react";

function ProfileEdit() {
    const [userBlogName, setUserBlogName] = useState("");
    const testString = "testString";
    const saveUserBlogName = e => {
        setUserBlogName(e.target.value);
    }

    return (
        <div className={styles[`common`]}>
            <div className={styles[`first`]}>
                <div className={styles[`element`]}>
                    <div className={styles[`element-title`]}>
                        블로그 이름
                    </div>
                    <input
                        type={"text"}
                        className={styles[`input-text`]}
                        placeholder={`${testString}`}
                        onChange={saveUserBlogName}/>
                    <div className={styles[`element-rule`]}>
                        내 블로그 좌측 상단에 나타나는 블로그 이름입니다.
                    </div>
                </div>
                <div className={styles[`element`]}>
                    <div className={styles[`element-title`]}>
                        닉네임
                    </div>
                    <input
                        type={"text"}
                        className={styles[`input-text`]}
                        placeholder={`${testString}`}
                        onChange={saveUserBlogName}/>
                </div>
                <div className={styles[`element`]}>
                    <div className={styles[`element-title`]}>
                        한 줄 소개
                    </div>
                    <input
                        type={"text"}
                        className={styles[`input-text-big`]}
                        placeholder={`${testString}`}
                        onChange={saveUserBlogName}/>
                    <div className={styles[`element-rule`]}>
                        50자 이내로 적어주세요.
                    </div>
                </div>
                <div className={styles[`element`]}>
                    <div className={styles[`element-title`]}>
                        소셜 정보
                    </div>
                    <div className={styles[`link-box`]}>
                        <img
                            className={styles[`link-icon`]}
                            src={require("../assets/icon_link.svg").default}
                        />
                        <input
                            type={"text"}
                            className={styles[`link-input-text`]}
                            placeholder={`${testString}`}
                            onChange={saveUserBlogName}/>
                    </div>
                    <div className={styles[`link-box`]}>
                        <img
                            className={styles[`link-icon`]}
                            src={require("../assets/icon_link.svg").default}
                        />
                        <input
                            type={"text"}
                            className={styles[`link-input-text`]}
                            placeholder={`${testString}`}
                            onChange={saveUserBlogName}/>
                    </div>
                    <div className={styles[`link-box`]}>
                        <img
                            className={styles[`link-icon`]}
                            src={require("../assets/icon_link.svg").default}
                        />
                        <input
                            type={"text"}
                            className={styles[`link-input-text`]}
                            placeholder={`${testString}`}
                            onChange={saveUserBlogName}/>
                    </div>
                    <div className={styles[`link-box`]}>
                        <img
                            className={styles[`link-icon`]}
                            src={require("../assets/icon_link.svg").default}
                        />
                        <input
                            type={"text"}
                            className={styles[`link-input-text`]}
                            placeholder={`${testString}`}
                            onChange={saveUserBlogName}/>
                    </div>
                </div>
                <div className={styles[`element`]}>
                    <div className={styles[`element-title`]}>
                        이메일 주소
                    </div>
                    <input
                        type={"text"}
                        className={styles[`input-text`]}
                        placeholder={`${testString}`}
                        onChange={saveUserBlogName}/>
                    <div className={styles[`element-rule`]}>
                        시스템에서 발송하는 이메일을 수신하는 주소입니다.
                    </div>
                </div>
                <div className={styles[`element`]}>
                    <div className={styles[`element-title`]}>
                        이메일 수신 설정
                    </div>
                    ~~ 토글
                </div>
            </div>
            <div className={styles[`second`]}>
                <div className={styles[`element`]}>
                    <div className={styles[`element-title`]}>
                        <img
                            className={styles[`mic-icon`]}
                            src={require("../assets/icon_mic.svg").default}
                        />
                        <div>마이 AI 보이스</div>
                    </div>
                    <input
                        type={"text"}
                        className={styles[`input-text-big`]}
                        placeholder={`${testString}`}
                        onChange={saveUserBlogName}/>
                    <div className={styles[`element-rule`]}>
                        processing your voice...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit;