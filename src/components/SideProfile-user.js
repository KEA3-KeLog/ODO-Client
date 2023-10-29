import styles from './SideProfile-user.module.css';
import {useNavigate} from "react-router-dom";

function SideProfile(props) {
    const navigate = useNavigate();
    // axios 요청을 해서 현재 user의 blognickname, email, id 를 받습니다.


    return (
        <div className={styles[`section-side-profile`]}>
            <div className={styles[`profile-box-polygon`]} />
            <div className={styles[`profile-box`]}>
                <div className={styles[`box-text`]}>
                    안녕하세요!<br/>
                    {props.id} 현영님
                </div>
                <div className={styles[`user-profile`]}>
                    <img className={styles[`user-profile-img`]}
                         src={require("../assets/author_profile.svg").default}/>
                    <div className={styles[`user-profile-info`]}>
                        <h4>hyun_dev</h4>
                        <div className={styles[`user-profile-info-email`]}>ahy1612@gmail.com</div>
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