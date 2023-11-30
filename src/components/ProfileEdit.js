import styles from "./ProfileEdit.module.css";
import "./ProfileEdit.css";
import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import VoiceFileService from "../service/VoiceFileService";

import axios from "axios";
import ProfileUpdateService from "../service/ProfileUpdateService";


function ProfileEdit() {
    const localUserData = JSON.parse(localStorage.getItem('userData'));
    const userId = localUserData.memberId;



    const [profileData, setProfileData] = useState(null);
    const [blogName, setUserBlogName] = useState("");
    const [blogNickName, setUserNickName] = useState("");
    const [introduction, setuserIntroduction] = useState("");
    const [sociala, setUserSocialA] = useState("");
    const [socialb, setUserSocialB] = useState("");
    const [socialc, setUserSocialC] = useState("");
    const [sociald, setUserSocialD] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [reviewReceived, setReviewRecieved] =useState("");
    const [updateReceived, setUpdateRecieved] = useState("");    

    //변경사항 여부를 체크
    const [isFormChanged, setIsFormChanged] = useState(false);


    // toggle 관련 state
    const [toggleComment, setToggleComment] = useState(false);
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [toggleVoice, setToggleVoice] = useState(false);

    // 파일 드래그 앤 드롭 관련 state
    const [isActive, setActive] = useState(false);
    // 파일 정보 preview state
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => {
        setActive(false);
    }

    useEffect(() => {
        getUserInfo(userId);
        setIsFormChanged(false);
    },[]);

    const getUserInfo = async(userId) => {
        try{
            const response = await ProfileUpdateService.getUserInfo(userId);
            setProfileData(response.data);
            setUserBlogName(response.data.blogName);
            setUserNickName(response.data.blogNickName);
            setuserIntroduction(response.data.introduction);
            setUserSocialA(response.data.sociala);
            setUserSocialB(response.data.socialb);
            setUserSocialC(response.data.socialc);
            setUserSocialD(response.data.sociald);
            setUserEmail(response.data.userEmail);
            setReviewRecieved(response.data.reviewReceived);
            setUpdateRecieved(response.data.updateReceived);

        }
        catch(error){
            console.error(error);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async(e) => {
        // 파일 드래그 앤 드롭
        e.preventDefault();
        setActive(false);

        const file = e.dataTransfer.files[0];

        const formData = new FormData();
        formData.append("uploadVoiceFile", file);
        console.log("2. userId는:", userId);
        formData.append("userId", userId);

        // FormData의 key 확인
        for (let key of formData.keys()) {
            console.log(key);
        }

// FormData의 value 확인
        for (let value of formData.values()) {
            console.log(value);
        }


        const voiceFile = await VoiceFileService.uploadVoiceFile(formData);

        setFileInfo(file);
    };

    const handleUpload = async({target}) => {
        // 직접 파일 선택
        const file = target.files[0];
        const formData = new FormData();
        formData.append("uploadVoiceFile", file);
        console.log("1. userId는:", userId);
        formData.append("userId", userId);

        const voiceFile = await VoiceFileService.uploadVoiceFile(formData);

        // 업로드 된 파일의 정보를 저장하기 위함
        setFileInfo(file);
    };

    // 업로드한 파일 정보(이름, 크기, 타입)를 저장합니다.
    const setFileInfo = (file) => {
        const {name, size: byteSize, type} = file;
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        setUploadedInfo({name, size, type});  // name, size, type 정보를 uploadedInfo에 저장
    };

    const clickedToggleComment = () => {
        setToggleComment((prev) => !prev);
    };

    const clickedToggleUpdate = () => {
        setToggleUpdate((prev) => !prev);
    };

    const clickedToggleVoice = () => {
        setToggleVoice((prev) => !prev);
    };
    const saveUserBlogName = e => {
        setUserBlogName(e.target.value);
    }

    const handleUserBlogNameChange = (event) => {
        setUserBlogName(event.target.value);
        setIsFormChanged(true);
    };
      
    const handleUserNickNameChange = (event) => {
        setUserNickName(event.target.value);
        setIsFormChanged(true);
    };
      
    const handleUserIntroductionChange = (event) => {
        setuserIntroduction(event.target.value);
        setIsFormChanged(true);
    };
      
    const handleUserSocialAChange = (event) => {
        setUserSocialA(event.target.value);
        setIsFormChanged(true);
    };
      
    const handleUserSocialBChange = (event) => {
        setUserSocialB(event.target.value);
        setIsFormChanged(true);
    };
      
    const handleUserSocialCChange = (event) => {
        setUserSocialC(event.target.value);
        setIsFormChanged(true);
    };
      
      const handleUserSocialDChange = (event) => {
        setUserSocialD(event.target.value);
        setIsFormChanged(true);
    };
      
      const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
        setIsFormChanged(true);
    };
      
    // const handleReviewReceivedChange = (event) => {
    //     setReviewRecieved(event.target.checked);
    //     setIsFormChanged(true);
    // };
      
    // const handleUpdateReceivedChange = (event) => {
    //     setUpdateRecieved(event.target.checked);
    //     setIsFormChanged(true);
    // };

      

    const handlePageSave = async() => {
        console.log(blogName);
        const chekckConfirmed = window.confirm("저장하시겠습니까?");
        if(chekckConfirmed){
            if (isFormChanged) {
                const profileData = {
                    blogName,
                    blogNickName,
                    introduction,
                    sociala,
                    socialb,
                    socialc,
                    sociald,
                    userEmail,
                    reviewReceived,
                    updateReceived,
                }
                console.log(profileData);
                //const response = await ProfileUpdateService.UpdateUserInfo(userId,profileData);
                const response = await axios.post(`http://localhost:8080/profile/api/profileupdate/${userId}`,profileData);
                console.log(response.data);
            }else{
                alert("변경 사항이 없습니다.")
            }
        }
        return true;
      };

    return (
            <div className={styles[`common`]}>
                {/*프로필 편집 화면 왼쪽 내용*/}
                <div className={styles[`first`]}>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            블로그 이름
                        </div>
                        <input
                            type={"text"}
                            className={styles[`input-text`]}
                            placeholder={blogName}
                            onChange={handleUserBlogNameChange}/>
                        <div className={styles[`element-rule`]}>
                            내 블로그 좌측 상단에 나타나는 블로그 이름입니다.
                        </div>
                    </div>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            닉네임
                        </div>
                        <input
                            type={"text"}
                            className={styles[`input-text`]}
                            placeholder={blogNickName}
                            onChange={handleUserNickNameChange}/>
                    </div>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            한 줄 소개
                        </div>
                        <input
                            type={"text"}
                            className={styles[`input-text-big`]}
                            placeholder={introduction}
                            onChange={handleUserIntroductionChange}/>
                        <div className={styles[`element-rule`]}>
                            50자 이내로 적어주세요.
                        </div>
                    </div>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            소셜 정보
                        </div>
                        <div className={styles[`link-box`]}>
                            <img
                                className={styles[`link-icon`]}
                                src={require("../assets/icon_link.svg").default}
                            />
                            <input
                                type={"text"}
                                className={styles[`link-input-text`]}
                                placeholder={sociala}
                                onChange={handleUserSocialAChange}/>
                        </div>
                        <div className={styles[`link-box`]}>
                            <img
                                className={styles[`link-icon`]}
                                src={require("../assets/icon_link.svg").default}
                            />
                            <input
                                type={"text"}
                                className={styles[`link-input-text`]}
                                placeholder={socialb}
                                onChange={handleUserSocialBChange}/>
                        </div>
                        <div className={styles[`link-box`]}>
                            <img
                                className={styles[`link-icon`]}
                                src={require("../assets/icon_link.svg").default}
                            />
                            <input
                                type={"text"}
                                className={styles[`link-input-text`]}
                                placeholder={socialc}
                                onChange={handleUserSocialCChange}/>
                        </div>
                        <div className={styles[`link-box`]}>
                            <img
                                className={styles[`link-icon`]}
                                src={require("../assets/icon_link.svg").default}
                            />
                            <input
                                type={"text"}
                                className={styles[`link-input-text`]}
                                placeholder={sociald}
                                onChange={handleUserSocialDChange}/>
                        </div>
                    </div>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            이메일 주소
                        </div>
                        <input
                            type={"text"}
                            className={styles[`input-text`]}
                            placeholder={userEmail}
                            onChange={handleUserEmailChange}/>
                        <div className={styles[`element-rule`]}>
                            시스템에서 발송하는 이메일을 수신하는 주소입니다.
                        </div>
                    </div>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            이메일 수신 설정
                        </div>
                        <div className={styles[`toggle-container`]}>
                            <ToggleBtn onClick={clickedToggleComment} toggle={toggleComment}>
                                <Circle toggle={toggleComment}/>
                            </ToggleBtn>
                            <div className={styles[`toggle-name`]}>댓글 알림</div>
                        </div>
                        <div className={styles[`toggle-container`]}>
                            <ToggleBtn onClick={clickedToggleUpdate} toggle={toggleUpdate}>
                                <Circle toggle={toggleUpdate}/>
                            </ToggleBtn>
                            <div className={styles[`toggle-name`]}>업데이트 소식</div>
                        </div>
                    </div>
                    <button onClick={handlePageSave}>저장</button>
                </div>
                {/*프로필 편집 화면 오른쪽 내용*/}
                <div className={styles[`second`]}>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            <img
                                className={styles[`mic-icon`]}
                                src={require("../assets/icon_mic.svg").default}
                            />
                            <div>마이 AI 보이스</div>
                        </div>

                        {/*
                        isActive 값에 따라 className을 제어합니다.
                        드래그 앤 드롭 css가 가끔 안되는 문제 있음.
                        */}
                        <label
                            className={`inputFile${isActive ? ' active' : ''}`}
                            onDragEnter={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragEnd}
                            onDrop={handleDrop}
                        >
                            <input
                                className={"uploadFile"}
                                type={"file"}
                                onChange={handleUpload}
                            />
                            {uploadedInfo && <FileInfo {...uploadedInfo} />}
                            {!uploadedInfo && (
                                <>
                                    <div className={"uploadFileButton"}>
                                        음성파일 업로드
                                    </div>
                                    <div className={"uploadFileSub"}>, 또는 파일 놓기</div>
                                </>)}
                        </label>

                        <div className={styles[`element-rule`]}>
                            processing your voice...
                        </div>
                    </div>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title-voice`]}>
                            <div className={styles[`toggle-container`]}>
                                <ToggleBtn onClick={clickedToggleVoice} toggle={toggleVoice}>
                                    <Circle toggle={toggleVoice}/>
                                </ToggleBtn>
                                <div className={styles[`toggle-name`]}>음성 자동재생</div>
                            </div>
                        </div>
                        <div className={styles[`element-rule`]}>
                            내 블로그 방문 시 설정한 음성을 자동으로 재생합니다.
                        </div>
                    </div>
                    <div className={styles[`element`]}>
                        <div className={styles[`element-title`]}>
                            프로필 사진
                        </div>
                        <img
                            className={styles[`profile-img`]}
                            src={require("../assets/author_profile.svg").default}
                        />
                    </div>
                </div>
            </div>
    )
}

const ToggleBtn = styled.button`
  width: 48px;
  height: 24px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "rgb(171, 171, 171)" : "#2a2a2a")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div`
  background-color: white;
  width: 16px;
  height: 16px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
          props.toggle &&
          css`
            transform: translate(26px, 0);
            transition: all 0.5s ease-in-out;
          `}
`;

const FileInfo = (uploadedInfo) => {
    return (
        <ul className="preview_info">
            {Object.entries(uploadedInfo).map(([key, value]) => (
                <li key={key}>
                    <span className="info_key">{key}</span>
                    <span className="info_value">{value}</span>
                </li>
            ))}
        </ul>
    );
}

export default ProfileEdit;