import styles from './MyPage.module.css';
import NavBarUser from '../components/Navigationbar-user';
import Inventory from "../components/Inventory";
import ProfileEdit from "../components/ProfileEdit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FollowList from "../components/FollowList";
import StoreContent from "../components/StoreContent";
import styled from "styled-components";

function MyPage() {
    const userId = useParams().userId;


    // 상점 0 / 인벤토리 1 / 팔로우 목록 2 / 프로필 편집 3
    const [tab, setTab] = useState(1);

    // 현재 tab의 id
    // 현재 어디 tab인지 사용자에게 알려주기 위한 스타일 입니다.
    const [currentTab, setCurrentTab] = useState("");
    // 이전 tab의 id
    const [prevTab, setPrevTab] = useState("");

    const handleStoreClick = () => {
        setTab(0);
    }

    const handleInventoryClick = () => {
        setTab(1);
    }

    const handleFollowListClick = () => {
        setTab(2);
    }

    const handleProfileEditClick = () => {
        setTab(3);
    }

    const getClick = (e) => {
        setCurrentTab(e.currentTarget.id);
    }

    useEffect(() => {
        // 현재 방문 중인 tab 의 버튼 디자인 변경
        if (currentTab) {
            let current = document.getElementById(currentTab);

            current.style.backgroundColor = "#dadada";
            current.style.cursor = "pointer";
        }
        // tab 이 변경될 때 이전에 적용된 스타일을 변경해 줍니다.
        if (prevTab) {
            let prev = document.getElementById(prevTab);
            prev.style.backgroundColor = "initial";
        }
        setPrevTab(currentTab);
    }, [currentTab])

    return (
        <div className={styles.screen}>
            <NavBarUser />
            <div className={styles[`tab`]}>
                <div className={styles[`tab-name`]}>
                    <img className={styles[`tab-icon`]}
                        src={require('../assets/icon_home.svg').default}
                    />
                    <div>마이페이지</div>
                </div>
                <TabButton
                    id="store"
                    onClick={(e) => {
                        handleStoreClick();
                        getClick(e);
                    }}>
                    <img className={styles[`tab-icon`]}
                        src={require('../assets/icon_shopstore_gray.svg').default}
                    />
                    <div>상점</div>
                </TabButton>
                <TabButton
                    id="inventory"
                    onClick={(e) => {
                        handleInventoryClick();
                        getClick(e);
                    }}>
                    <img className={styles[`tab-icon`]}
                        src={require('../assets/icon_inventory_black.svg').default}
                    />
                    <div>인벤토리</div>
                </TabButton>
                <TabButton
                    id="follow-list"
                    onClick={(e) => {
                        handleFollowListClick();
                        getClick(e);
                    }}>
                    <img className={styles[`tab-icon`]}
                        src={require('../assets/icon_hamburger-menu2.svg').default}
                    />
                    <div>팔로우 목록</div>
                </TabButton>
                <TabButton
                    id="profile-edit"
                    onClick={(e) => {
                        handleProfileEditClick();
                        getClick(e);
                    }}>
                    <img className={styles[`tab-icon`]}
                        src={require('../assets/icon_edit.svg').default}
                    />
                    <div>프로필 편집</div>
                </TabButton>

            </div>
            <hr />
            <TabContent tab={tab} userId={userId} />
        </div>
    )
}

function TabContent(props) {
    return [
        <StoreContent />,
        <Inventory userId={props.userId} />,
        <FollowList />,
        <ProfileEdit userId={props.userId} />,
    ][props.tab]
}

const TabButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: none;
    margin: 0 10px;
    padding: 6px 10px;
    border-radius: 14px;
    height: 36px;
    text-align: center;
    background: none;
    font-size: 16px;
  
    &:hover {
      background-color: #dadada !important;
      cursor: pointer;
    }
`;

export default MyPage;