import styles from './MyPage.module.css';
import NavBarUser from '../components/Navigationbar-user';
import Inventory from "../components/Inventory";
import ProfileEdit from "../components/ProfileEdit";
import {useParams} from "react-router-dom";
import {useState} from "react";
import FollowList from "../components/FollowList";
import StoreContent from "../components/StoreContent";

function MyPage() {
    const userId = useParams().userId;
    // 상점 0 / 인벤토리 1 / 팔로우 목록 2 / 프로필 편집 3
    const [tab, setTab] = useState(1);

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



    return (
        <>
            <NavBarUser userId={userId}/>
            <div className={styles[`tab`]}>
                <div className={styles[`tab-name`]}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_home.svg').default}
                    />
                    <div>마이페이지</div>
                </div>
                <button
                    className={styles[`tab-item`]}
                    onClick={handleStoreClick}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_shopstore_gray.svg').default}
                    />
                    <div>상점</div>
                </button>
                <button
                    className={styles[`tab-item`]}
                    onClick={handleInventoryClick}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_inventory_black.svg').default}
                    />
                    <div>인벤토리</div>
                </button>
                <button
                    className={styles[`tab-item`]}
                    onClick={handleFollowListClick}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_hamburger-menu2.svg').default}
                    />
                    <div>팔로우 목록</div>
                </button>
                <button
                    className={styles[`tab-item`]}
                    onClick={handleProfileEditClick}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_edit.svg').default}
                    />
                    <div>프로필 편집</div>
                </button>

            </div>
            <hr/>
            <TabContent tab={tab} userId={userId}/>
        </>
    )
}

function TabContent(props) {
    return [
        <StoreContent />,
        <Inventory userId={props.userId}/>,
        <FollowList />,
        <ProfileEdit />,
    ][props.tab]
}

export default MyPage;