import styles from './SideProfile.module.css';
import {useNavigate} from "react-router-dom";

function SideProfile() {
    const navigate = useNavigate();

    return (
        <div className={styles[`section-side-profile`]}>
            <div className={styles[`profile-box-polygon`]} />
            <div className={styles[`profile-box`]}>
                <div className={styles[`box-text`]}>
                    안녕하세요!<br/>
                    로그인하여 시작하세요.
                </div>
                <div className={styles[`box-horizontal`]}/>
                <div className={styles[`section-button`]}>
                    <button onClick={()=>{
                        navigate('./login');
                    }}>로그인</button>
                    <div className={styles[`section-button-line`]}>|</div>
                    <button onClick={()=>{
                        navigate('./login');
                    }}>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default SideProfile;