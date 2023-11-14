import styles from "./StoreContent.module.css"

function StoreContent(){
    return (
        <div className={styles.content}>
            <div className={styles.frame}>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-1.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>방문 인사말 보이스</div>
                    <div className={styles[`item-price`]}>2,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-2.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>가수 아이유의 AI 보이스</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-3.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>배우 나나의 AI 보이스</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-4.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>배우 성시경의 AI 보이스</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-5.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>스트릭 프리즈</div>
                    <div className={styles[`item-price`]}>2,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-6.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>스트릭 그래프 염색칩 X 5</div>
                    <div className={styles[`item-price`]}>400
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-6.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>스트릭 그래프 염색칩 X 40</div>
                    <div className={styles[`item-price`]}>3,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles[`item-image`]}
                         alt="Image"
                         src={require("../assets/store-item-7.svg").default}
                         width={"64px"}
                    />
                    <div className={styles[`item-text`]}>「도심의 야경」프로필 배경</div>
                    <div className={styles[`item-price`]}>10,000
                        <img className={styles[`icon-item-price`]}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className={styles[`item-btn`]}>
                        <button className={styles[`item-btn-1`]}>상세설명</button>
                        <button className={styles[`item-btn-2`]}>구매하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreContent;