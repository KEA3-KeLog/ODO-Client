import styles from "./PostsByTag.module.css";
import NavBarUser from "../components/Navigationbar-user";
import React from "react";

function PostsByTag() {
    return (
        <>
            <NavBarUser/>
            <div className={styles[`page-view`]}>
                <div className={styles[`post-card-grid-block`]}>
                    {/*postcard 아이템 1*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <div className={styles[`post-card-date`]}>2023-10-01</div>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>




                    {/*postcard 아이템 2*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <div className={styles[`post-card-date`]}>2023-10-01</div>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>



                    {/*postcard 아이템 2*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <div className={styles[`post-card-date`]}>2023-10-01</div>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>



                    {/*postcard 아이템 2*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <p className={styles[`post-card-date`]}>2023-10-01</p>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>




                    {/*postcard 아이템 2*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <p className={styles[`post-card-date`]}>2023-10-01</p>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>



                    {/*postcard 아이템 2*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <p className={styles[`post-card-date`]}>2023-10-01</p>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>



                    {/*postcard 아이템 2*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <div className={styles[`post-card-date`]}>2023-10-01</div>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>



                    {/*postcard 아이템 2*/}
                    <div className={styles[`post-card-block`]}>
                        <div className={styles[`post-card-img`]}>
                            <img
                                alt={"post image"}
                                src={require('../assets/Rectangle 31.png')}
                            />
                        </div>
                        <div className={styles[`post-card-content`]}>
                            <h4>프로그래밍의 순간들</h4>
                            <p className={styles[`post-card-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                                있다.</p>
                            <p className={styles[`post-card-date`]}>2023-10-01</p>
                        </div>
                        <div className={styles[`post-card-footer`]}>
                            <div className={styles[`user-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`user-name`]}>by <span
                                    style={{color: "black", fontWeight: "650"}}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-card-likes`]}>🖤 12</div>
                        </div>
                    </div>










                </div>
            </div>

        </>
    )
}

export default PostsByTag;