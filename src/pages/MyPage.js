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
    // 팔로우 목록 0 / 인벤토리 1 / 프로필 편집 2
    const [tab, setTab] = useState(1);

    const handleFollowListClick = () => {
        setTab(0);
    }

    const handleInventoryClick = () => {
        setTab(1);
    }
    const handleProfileEditClick = () => {
        setTab(2);
    }

    const handleStoreClick = () => {
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
                    onClick={handleFollowListClick}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_hamburger-menu2.svg').default}
                    />
                    <div>팔로우 목록</div>
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
                    onClick={handleProfileEditClick}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_edit.svg').default}
                    />
                    <div>프로필 편집</div>
                </button>
                <button
                    className={styles[`tab-item`]}
                    onClick={handleStoreClick}>
                    <img className={styles[`tab-icon`]}
                         src={require('../assets/icon_shopstore_gray.svg').default}
                    />
                    <div>상점</div>
                </button>
            </div>
            <hr/>
            <TabContent tab={tab} userId={userId}/>
        </>
    )
}

function TabContent(props) {
    return [
        <FollowList />,
        <Inventory userId={props.userId}/>,
        <ProfileEdit />,
        <StoreContent />
    ][props.tab]
}

export default MyPage;