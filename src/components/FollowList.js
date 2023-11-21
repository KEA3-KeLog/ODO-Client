import styles from "./FollowList.module.css";
import React from "react";

function FollowList() {
    return (
        <div className={styles[`common`]}>
            <div className={styles[`list-item`]}>
                <div className={styles[`profile`]}>
                    <img
                        className={styles[`profile-image`]}
                        src={require("../assets/author_profile.svg").default}
                    />
                    <div className={styles[`profile-text`]}>
                        <div className={styles[`name`]}>hyun_dev</div>
                        <div className={styles[`text`]}>
                            안녕하세요~ <br />
                            잔디밭 채우고 싶은 <br />
                            프론트 앤드 개발자 입니다.
                        </div>
                        <div className={styles[`post-tag`]}>
                            <div className={styles[`tag-item`]}>
                                태그
                            </div>
                            <div className={styles[`tag-item`]}>
                                태그
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles[`post`]}>
                    {/*최신 게시물 이미지 입니다.*/}
                    <img
                        className={styles[`post-img`]}
                        src={require("../assets/Rectangle 10.png")}
                    />
                    <div className={styles[`post-content`]}>
                        <div className={styles[`post-tag`]}>
                            <div className={styles[`tag-item`]}>
                                태그
                            </div>
                            <div className={styles[`tag-item`]}>
                                태그
                            </div>
                        </div>
                        <div className={styles[`post-title`]}>
                            프로그래밍의 순간들
                        </div>
                        <div className={styles[`post-sub-title`]}>
                            디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 얻을 수 있다.
                        </div>
                        <div className={styles[`post-date`]}>
                            <span>2023-10-01</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowList;