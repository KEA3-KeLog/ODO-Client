import styles from './SideProfile-user.module.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import UserService from "../service/UserService";

function SideProfile(props) {
    const navigate = useNavigate();
    const userId = props.id;
    const [state, setState] = useState({});

    // userId 를 back에 보냄
    // -> back 에서 userId를 받으면 그걸로 oauth_member 조회, 해당 userId의 blog name, nickname, email, 프로필 사진 가져옴
    // 그럼 back에서 가져온 정보를 여기에 다시 보냄
    useEffect(() => {
        UserService.getUser(userId).then(function (res) {
            console.log(res);
            setState(res.data);
        });
    }, []);

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
                         src={require("../assets/author_profile.svg").default}/>
                    <div className={styles[`user-profile-info`]}>
                        <h4>{state.blog_name}</h4>
                        <div className={styles[`user-profile-info-email`]}>{state.email}</div>
                        <div className={styles[`user-profile-point`]}>
                            <div className={styles.icon}/>
                            <div className={styles.point}>1,150</div>
                        </div>
                    </div>
                </div>
                <div className={styles[`box-horizontal`]}/>
                <div className={styles[`section-router`]}>
                    <button onClick={()=>{
                        navigate(`./myblogpage/${props.id}`);
                    }}>마이페이지</button>
                    <button onClick={()=>{
                        navigate(`./myblogpage/${props.id}`);
                    }}>내 블로그</button>
                    <button onClick={()=>{
                        navigate('./login');
                    }}>알림</button>
                    <button onClick={()=>{
                        navigate('./login');
                    }}>로그아웃</button>
                </div>
            </div>
        </div>
    );
}

export default SideProfile;