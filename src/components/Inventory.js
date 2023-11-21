import styles from './Inventory.module.css';
import styled, {css} from "styled-components";
import {useState} from "react";

// 아이템 사용중 or 사용 중 아님을 나타내는 버튼 css 입니다.
const ItemStatus = styled.div`
  width: 60px;
  height: 17px;
  border-radius: 10px;
  border: 1px black solid;
  margin-top: 14px;
  font-size: 10px;
  text-align: center;
  padding-top: 3px;
  font-weight: bold;
  color: black;
  background: white;
  
  // 사용중 일때
  ${(props) =>
          props.on &&
          css`
            color: white;
            background: black;
          `}
`;

function Inventory(props) {
    const userId = props.userId;

    return (
        <div className={styles[`common`]}>
            <div className={styles[`point-area`]}>
                <div className={styles[`point-title`]}>
                    <div>보유</div>
                    <img
                        src={require("../assets/icon_point_black.svg").default}
                    />
                </div>
                <div className={styles[`point`]}>{userId}</div>
            </div>
            <div className={styles[`container-area`]}>
                {/*보유 아이템 리스트*/}
                <div className={styles[`container`]}>
                    {/*첫번째 아이템*/}
                    <button className={styles[`item`]}>
                        <div className={styles[`item-image-container`]}>
                            <img className={styles[`item-image`]}
                                 src={require("../assets/store-item-1.svg").default}
                            />
                        </div>
                        <div className={styles[`item-status-container`]}>
                            <div className={styles[`item-title`]}>방문 인사말 보이스</div>
                            <div className={styles[`item-status`]}>
                                <ItemStatus on={"true"}>사용중</ItemStatus>
                            </div>
                        </div>
                    </button>
                    {/*두번째 아이템*/}
                    <button className={styles[`item`]}>
                        <div className={styles[`item-image-container`]}>
                            <img className={styles[`item-image`]}
                                 src={require("../assets/store-item-2.svg").default}
                            />
                        </div>
                        <div className={styles[`item-status-container`]}>
                            <div className={styles[`item-title`]}>스트릭 프리즈</div>
                            <div className={styles[`item-status`]}>
                                <ItemStatus>장착하기</ItemStatus>
                            </div>
                        </div>
                    </button>
                    <button className={styles[`item`]}>
                        <div className={styles[`item-image-container`]}>
                            <img className={styles[`item-image`]}
                                 src={require("../assets/store-item-3.svg").default}
                            />
                        </div>
                    </button>
                </div>
                {/*해당 아이템 설명*/}
                <ItemDetail />
            </div>
        </div>
    )
}

const ItemDetail=()=>{
    return (
        <div className={styles[`container`]}>
            <div className={styles[`item-image-container`]}>
                <img className={styles[`item-image`]}
                     src={require("../assets/store-item-1.svg").default}
                />
            </div>
            <div className={styles[`item-title`]}>방문 인사말 보이스</div>
            <div>1개 보유</div>
            <div className={styles[`item-docs`]}>
                사용하면 블로그 방문자를 맞이하는 인사말을 자동 재생할 수 있습니다.
                자신이 설정한 인사말의 문구를 선택한 보이스로 재생하게 됩니다.
                기본 보이스는 자신의 목소리로, 방문 인사말 보이스를 사용한 순간 프로필에서 음량 조절 버튼이 보이게 되며
                블로그 방문자에게 인사말 문구가 자동재생됩니다.
            </div>
        </div>
    )
}

export default Inventory;