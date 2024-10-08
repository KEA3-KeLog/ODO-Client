import styles from "./MainPage.module.css";
import Header from "../components/Header";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PostService from "../service/PostService";
import ItemsCarousel from 'react-items-carousel';
import UserService from "../service/UserService"; // Import the UserService


function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options).replace(/,/g, '');
}

function MainPage() {
    
    // const [activeItemIndex, setActiveItemIndex] = useState(0);
    // const chevronWidth = 40;

    const { ref, inView } = useInView({
        threshold: 0.5
    });

    const location = useLocation();
    const id = location.state;
    const [login, setLogin] = useState(false);

    const [userName, setUserName] = useState('');

    const [userNames, setUserNames] = useState({});
    useEffect(() => {
        if (id != null) {
            setLogin(true);
        }
    }, []);

    const [state, setState] = useState({
        posts: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        PostService.getAllPost().then(function (res) {
            setState({ posts: res.data });
        });
    }, []);




    const MAX_SUMMARY_LENGTH = 100;
    const MAX_DISPLAY_ITEMS = 4;

    // Ensure that the list has a maximum length of MAX_DISPLAY_ITEMS


    const latestPosts = state.posts.slice(-MAX_DISPLAY_ITEMS).reverse();

    useEffect(() => {
        // Fetch user names for all posts
        Promise.all(state.posts.map(post => UserService.getUser(post.userId)))
            .then(responses => {
                const userNamesMap = {};
                responses.forEach((res, index) => {
                    userNamesMap[state.posts[index].userId] = res.data.blog_nickname;
                });
                setUserNames(userNamesMap);
            })
            .catch(error => {
                console.error("Error fetching user names:", error);
            });
    }, [state.posts]);

    const upToDateList = latestPosts.map((v) => {
        return (
            <div className={styles[`post-card-block`]} key={v.postId} onClick={() => {
                navigate("/postview/" + v.postId, {
                    state: v.userId,
                });
            }}>
                <div className={styles[`img-block`]}>
                    <img className={styles[`post-view-1-image`]}
                        src={"http://localhost:8080/api/image/" + v.fileNewName}
                    />
                </div>
                <div className={styles[`post-view-1-content`]}>
                    <span className={styles[`post-view-1-title`]}>{v.title}</span>
                    <p className={styles[`post-view-1-text`]}>
                        {v.summary.length > MAX_SUMMARY_LENGTH
                            ? v.summary.slice(0, MAX_SUMMARY_LENGTH) + "..."
                            : v.summary
                        }
                    </p>
                    <p className={styles[`post-view-1-date`]}>{formatDateTime(v.createdTime)}</p>
                </div>
                <div className={styles[`post-view-1-footer`]}>
                    <div className={styles[`post-view-1-profile`]}>
                        <img
                            alt={""}
                            src={require("../assets/author_profile.svg").default}
                        />
                        <p className={styles[`post-view-1-author-name`]}>
                            by <span style={{ color: "black", fontWeight: "650" }}>{userNames[v.userId]}</span>
                        </p>
                    </div>
                    <div className={styles[`post-view-1-like`]}>🖤 0</div>
                </div>
            </div>
        )
    });

    return (
        <>
            <div className={styles[`section-main-bg`]}>
                <Header />
            </div>

            <div className={styles[`section-content`]}>
                <div className={styles[`h-fontstyle`]}>오늘의<br />키워드를<br />확인하세요</div>
                <div className={styles[`section-tag`]}>
                    <div className={styles[`section-tag-1`]}>
                        <div className={styles[`tag-item`]}>Javascript</div>
                        <div className={styles[`tag-item`]}>ReactJS</div>
                        <div className={styles[`tag-item`]}>Springboot</div>
                        <div className={styles[`tag-item`]}>Python</div>
                        <div className={styles[`tag-item`]}>Javascript</div>
                    </div>
                    <div className={styles[`section-tag-2`]}>
                        <div className={styles[`tag-item`]}>Javascript</div>
                        <div className={styles[`tag-item`]}>ReactJS</div>
                        <div className={styles[`tag-item`]}>Springboot</div>
                        <div className={styles[`tag-item`]}>Springboot</div>
                    </div>
                </div>
            </div>


            {/*<div style={{ padding: `0 ${chevronWidth}px` }}>*/}
            {/*    <ItemsCarousel*/}
            {/*        requestToChangeActive={setActiveItemIndex}*/}
            {/*        activeItemIndex={activeItemIndex}*/}
            {/*        numberOfCards={4}*/}
            {/*        gutter={20}*/}
            {/*        leftChevron={<button>{'<'}</button>}*/}
            {/*        rightChevron={<button>{'>'}</button>}*/}
            {/*        outsideChevron*/}
            {/*        chevronWidth={chevronWidth}*/}
            {/*    >*/}
            {/*        /!*<div style={{ height: 200, background: '#EEE' }}>First card</div>*!/*/}
            {/*        /!*<div style={{ height: 200, background: '#EEE' }}>Second card</div>*!/*/}
            {/*        /!*<div style={{ height: 200, background: '#EEE' }}>Third card</div>*!/*/}
            {/*        /!*<div style={{ height: 200, background: '#EEE' }}>Fourth card</div>*!/*/}
            {/*        {upToDateList}*/}
            {/*    </ItemsCarousel>*/}
            {/*</div>*/}

            <div className={styles[`section-content`]}>
                <div className={styles[`search-box`]}>
                    <div className={styles.dropdown}>
                        <button className={styles[`dropdown-btn`]}>
                            블로그 검색
                            <span className={styles[`dropdown-btn-icon`]} />
                        </button>
                        <div className={styles[`dropdown-item`]}>
                            <a href="#">제목 검색</a>
                            <a href="#">태그 검색</a>
                        </div>
                    </div>
                    <input type={"text"} className={styles[`input-style`]}
                        placeholder={"'현영'님이 작성한 블로그 클론 코딩 회고록! 지금 검색해 보세요."} />
                    <div className={styles[`search-icon`]} />
                </div>
            </div>

            <div className={styles[`section-post`]}>
                <button className={styles[`move-to-posts`]}>
                    최신포스트
                    <span className={styles[`move-to-posts-icon`]} />
                </button>
                <div className={styles[`section-post-view-1`]}>
                    {upToDateList}
                </div>
            </div>


            <div className={styles[`section-post`]}>
                <button className={styles[`move-to-posts`]}>
                    인기포스트
                    <span className={styles[`move-to-posts-icon`]} />
                </button>
                <div className={styles[`section-post-view-2`]}>
                    {/*첫번째 아이템*/}
                    <div className={styles[`post-view-2-frame-1`]}>
                        <div className={styles[`post-view-2-item`]}>
                            <img className={styles[`post-view-2-item-img`]}
                                alt={"post image"}
                                src={require('../assets/Rectangle 10.png')}
                            />
                            <div className={styles[`post-view-1-content`]}>
                                <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                                <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을
                                    수 있다.</p>
                                <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                                <div className={styles[`post-view-1-footer`]}>
                                    <div className={styles[`post-view-1-profile`]}>
                                        <img
                                            alt={""}
                                            src={require("../assets/author_profile.svg").default}
                                        />
                                        <p className={styles[`post-view-1-author-name`]}>by <span
                                            style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                                    </div>
                                    <div className={styles[`post-view-1-like`]}>🖤 12</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*두번째 아이템*/}
                    <div className={styles[`post-view-2-frame-2`]}>
                        <div className={styles[`post-view-2-item`]}>
                            <img className={styles[`post-view-2-item-img`]}
                                alt={"post image"}
                                src={require('../assets/Rectangle 20.png')}
                            />
                            <div className={styles[`post-view-1-content`]}>
                                <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                                <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을
                                    수 있다.</p>
                                <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                                <div className={styles[`post-view-1-footer`]}>
                                    <div className={styles[`post-view-1-profile`]}>
                                        <img
                                            alt={""}
                                            src={require("../assets/author_profile.svg").default}
                                        />
                                        <p className={styles[`post-view-1-author-name`]}>by <span
                                            style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                                    </div>
                                    <div className={styles[`post-view-1-like`]}>🖤 12</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles[`post-view-2-item`]}>
                            <img className={styles[`post-view-2-item-img`]}
                                alt={"post image"}
                                src={require('../assets/Rectangle 20.png')}
                            />
                            <div className={styles[`post-view-1-content`]}>
                                <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                                <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을
                                    수 있다.</p>
                                <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                                <div className={styles[`post-view-1-footer`]}>
                                    <div className={styles[`post-view-1-profile`]}>
                                        <img
                                            alt={""}
                                            src={require("../assets/author_profile.svg").default}
                                        />
                                        <p className={styles[`post-view-1-author-name`]}>by <span
                                            style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                                    </div>
                                    <div className={styles[`post-view-1-like`]}>🖤 12</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles[`post-view-2-item`]}>
                            <img className={styles[`post-view-2-item-img`]}
                                alt={"post image"}
                                src={require('../assets/Rectangle 20.png')}
                            />
                            <div className={styles[`post-view-1-content`]}>
                                <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                                <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을
                                    수 있다.</p>
                                <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                                <div className={styles[`post-view-1-footer`]}>
                                    <div className={styles[`post-view-1-profile`]}>
                                        <img
                                            alt={""}
                                            src={require("../assets/author_profile.svg").default}
                                        />
                                        <p className={styles[`post-view-1-author-name`]}>by <span
                                            style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                                    </div>
                                    <div className={styles[`post-view-1-like`]}>🖤 12</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles[`post-view-2-item`]}>
                            <img className={styles[`post-view-2-item-img`]}
                                alt={"post image"}
                                src={require('../assets/Rectangle 20.png')}
                            />
                            <div className={styles[`post-view-1-content`]}>
                                <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                                <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을
                                    수 있다.</p>
                                <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                                <div className={styles[`post-view-1-footer`]}>
                                    <div className={styles[`post-view-1-profile`]}>
                                        <img
                                            alt={""}
                                            src={require("../assets/author_profile.svg").default}
                                        />
                                        <p className={styles[`post-view-1-author-name`]}>by <span
                                            style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                                    </div>
                                    <div className={styles[`post-view-1-like`]}>🖤 12</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedPost />

        </>
    );
}

export default MainPage;

const RelatedPost = () => {
    return (
        <div className={styles[`section-post`]}>
            <button className={styles[`move-to-posts`]}>
                연관포스트
                <span className={styles[`move-to-posts-icon`]} />
            </button>
            <div className={styles[`section-post-view-1`]}>
                <div className={styles[`post-card-block`]}>
                    <div className={styles[`img-block`]}>
                        <img
                            alt={"post image"}
                            src={require('../assets/Rectangle 31.png')}
                        />
                    </div>
                    <div className={styles[`post-view-1-content`]}>
                        <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                        <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                            있다.</p>
                        <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                        <div className={styles[`post-view-1-footer`]}>
                            <div className={styles[`post-view-1-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`post-view-1-author-name`]}>by <span
                                    style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-view-1-like`]}>🖤 12</div>
                        </div>
                    </div>
                </div>
                <div className={styles[`post-card-block`]}>
                    <div className={styles[`img-block`]}>
                        <img
                            alt={"post image"}
                            src={require('../assets/Rectangle 31.png')}
                        />
                    </div>
                    <div className={styles[`post-view-1-content`]}>
                        <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                        <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                            있다.</p>
                        <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                        <div className={styles[`post-view-1-footer`]}>
                            <div className={styles[`post-view-1-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`post-view-1-author-name`]}>by <span
                                    style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-view-1-like`]}>🖤 12</div>
                        </div>
                    </div>
                </div>
                <div className={styles[`post-card-block`]}>
                    <div className={styles[`img-block`]}>
                        <img
                            alt={"post image"}
                            src={require('../assets/Rectangle 31.png')}
                        />
                    </div>
                    <div className={styles[`post-view-1-content`]}>
                        <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                        <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                            있다.</p>
                        <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                        <div className={styles[`post-view-1-footer`]}>
                            <div className={styles[`post-view-1-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`post-view-1-author-name`]}>by <span
                                    style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-view-1-like`]}>🖤 12</div>
                        </div>
                    </div>
                </div>
                <div className={styles[`post-card-block`]}>
                    <div className={styles[`img-block`]}>
                        <img
                            alt={"post image"}
                            src={require('../assets/Rectangle 31.png')}
                        />
                    </div>
                    <div className={styles[`post-view-1-content`]}>
                        <span className={styles[`post-view-1-title`]}>프로그래밍의 순간들</span>
                        <p className={styles[`post-view-1-text`]}>디버깅 중 마주친 문제는 Stack Overflow 검색을 통해 도움을 받을 수
                            있다.</p>
                        <p className={styles[`post-view-1-date`]}>2023-10-01</p>
                        <div className={styles[`post-view-1-footer`]}>
                            <div className={styles[`post-view-1-profile`]}>
                                <img
                                    alt={""}
                                    src={require("../assets/author_profile.svg").default}
                                />
                                <p className={styles[`post-view-1-author-name`]}>by <span
                                    style={{ color: "black", fontWeight: "650" }}>hyun_dev</span></p>
                            </div>
                            <div className={styles[`post-view-1-like`]}>🖤 12</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

