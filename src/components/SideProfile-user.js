import styles from './SideProfile-user.module.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import UserService from "../service/UserService";
import StoreService from "../service/StoreService";

function SideProfile() {
    const navigate = useNavigate();

    // 유저 정보
    const userId = localStorage.getItem("memberId");
    const [state, setState] = useState({});
    const [userPoint, setUserPoint] = useState();

    // userId 를 back에 보냄
    // -> back 에서 userId를 받으면 그걸로 oauth_member 조회, 해당 userId의 blog name, nickname, email, 프로필 사진 가져옴
    // 그럼 back에서 가져온 정보를 여기에 다시 보냄
    useEffect(() => {
        UserService.getUser(userId).then(function (res) {
            setState(res.data);
            console.log(res.data);
        });

        userpointAPI(userId);
    }, []);

    const userpointAPI = async (userId) => {
        try {
            const response = await StoreService.getPoint(userId); // Update the URL accordingly
            setUserPoint(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserPoint("-");
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/Login');
    }

    return (
        <div className={styles[`section-side-profile`]}>
            <div className={styles[`profile-box-polygon`]} />
            <div className={styles[`profile-box`]}>
                <div className={styles[`box-text`]}>
                    안녕하세요!<br/>
                    {state.blog_nickname}님
                </div>
                <div className={styles[`user-profile`]}>
                    <img className={styles[`user-profile-img`]}
                         src={state.profile_image_url}/>
                    <div className={styles[`user-profile-info`]}>
                        <h4>{state.blog_name}</h4>
                        <div className={styles[`user-profile-info-email`]}>{state.email}</div>
                        <div className={styles[`user-profile-point`]}>
                            <div className={styles.icon}/>
                            <div className={styles.point}>{userPoint}</div>
                        </div>
                    </div>
                </div>
                <div className={styles[`box-horizontal`]}/>
                <div className={styles[`section-router`]}>
                    <button onClick={()=>{
                        navigate(`./mypage/${userId}`);
                    }}>마이페이지</button>
                    <button onClick={()=>{
                        navigate(`./myblogpage/${userId}`);
                    }}>내 블로그</button>
                    <button onClick={()=>{
                        navigate('./login');
                    }}>알림</button>
                    <button onClick={logout}>로그아웃</button>
                </div>
            </div>
        </div>
    );
}

export default SideProfile;