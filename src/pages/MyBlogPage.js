import "./MyBlogPage.css";
import NavBar from "../components/Navigationbar";
import NavBarUser from "../components/Navigationbar-user"
import ResizedComponent from "../components/ResizedComponent";
import PostService from "../service/PostService";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';  // Import react-calendar

import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import axios from 'axios';
import UserService from "../service/UserService";

function formatDateTime(dateTimeString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString('en-US', options).replace(/,/g, '');
}

function MyBlogPage() {

    // 유저 정보 변수
    const userId = useParams().userId;
    const [userName, setUserName] = useState("");
    const [userBlogName, setUserBlogName] = useState("");
    const [introduction, setIntroduction] = useState("");

    const [dateCounts, setDateCounts] = useState({});

    const [newDate, setNewDate] = useState('');
    const newEntry = { count: 1 };

    const [streakFreeze, setStreakFreeze] = useState({});


    const [state, setState] = useState({
        posts: [],
    });

    const navigate = useNavigate();


  useEffect(() => {
    PostService.getPosts(userId).then(function (res) {
      setState({ posts: res.data });
    });

    UserService.getUser(userId).then(function (res) {
        setUserBlogName(res.data.blog_name);
        setUserName(res.data.blog_nickname);
        setIntroduction(res.data.introduction);
        console.log(res.data);
    })
  }, []);
  console.log(introduction);

  useEffect(() => {
    // 서버에서 날짜별 포스트 개수를 가져오는 API 호출
    axios.get('http://localhost:8080/api/post/countByDate')
      .then(response => {
        setDateCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching post counts:', error);
      });
  }, []); // 빈 배열은 한 번만 호출하도록 설정


  useEffect(() => {
    // 서버에서 날짜별 포스트 개수를 가져오는 API 호출
    axios.get('http://localhost:8080/api/post/countFreeze')
      .then(response => {
        setStreakFreeze(response.data);
      })
      .catch(error => {
        console.error('Error fetching post counts:', error);
      });
  }, []); // 빈 배열은 한 번만 호출하도록 설정

  let length = state.posts.length;
  var postArr = [];
  for (var i = 0; i < 8; i++) {
    if (state.posts[length - 1 - i] !== undefined) {
      postArr[i] = Object(state.posts[length - 1 - i]);
    }
  }
  const postList = postArr.map((v) => (
    <div
      className="PostCardBlock"
      onClick={() => {
        navigate("/postview/" + v.postId, {
          state: userId,
        });
      }}
    >
      <div className="PostCardBlockImage">
        <div
          className="PostCardBlockImage_Link"
          style={{ paddingTop: "55.1921%" }}
        >
          <img
            src={"http://localhost:8080/api/image/" + v.fileNewName
            }
          />
        </div>
      </div>
      <div className="PostCardBlockContents">
        <div className="PostCardBlockTag">
            <span>TAG</span>
          {/*<span>{v.tag}</span>*/}
        </div>
        <div className="PostCardBlockContents_Link">
          <h4 className="PostCardBlockContents_Title">
            {v.title}
          </h4>
          <div>
            <p className="PostCardBlockContents_subtitle">
              {v.summary}
            </p>
          </div>
        </div>
        <div className="PostCardBlockDate">
            {console.log(typeof(v.createTime))}
          <span>{formatDateTime(v.createdTime)}</span>
        </div>
      </div>
    </div>))

    // volume value
    const [volume, setVolume] = useState(10);
    // display: block 일때 보이고 display: none 일때 안 보입니다.
    const [volumeLowIcon, setVolumeLowIcon] = useState(false);


    // 글 작성 버튼을 클릭해서 /writepost/:userId 로 갑니다
    const handleWritePostButtonClick = () => {
        navigate(`../../writepost/${userId}`);
    };

    const handleProfileEditClick = () => {
        navigate(`../../mypage/${userId}`,{
            state: 3
        });
    }






    const dateCountsArray = Object.values(dateCounts);

    const handleAddNewEntry = () => {
        // Check if the newDate is not empty
        if (newDate.trim() !== '') {
            // Create a new entry with the entered date and a count of 1
            const entryToAdd = { ...newEntry, date: newDate };

            // Log the data to be sent in the POST request
            console.log('Data to be sent in the POST request:', entryToAdd);

            // Assuming dateCounts is a state variable, update it with the new entry
            setDateCounts((prevDateCounts) => ({
                ...prevDateCounts,
                [newDate]: entryToAdd,
            }));

            // Reset the newDate input
            setNewDate('');

            // Send a POST request to your server to add the new entry
            axios.post('http://localhost:8080/api/post/addNewValue', entryToAdd)
                .then(response => {
                    // Handle the response if needed
                    console.log('New entry added successfully(react):', response.data);
                })
                .catch(error => {
                    console.error('Error adding new entry(react):', error);
                });
        }
    };
      const updatedDateCounts = dateCountsArray.concat(streakFreeze);

    return (
        <>
            {
                userId === localStorage.getItem("memberId")
                    ? <NavBarUser/>
                    : <NavBar userId={userId}/>
            }
            <div className="container">
                <ion-icon name="chevron-down-outline"></ion-icon>
                <div className="child first">
                    <div className="profile">
                        <div className="profile_image">
                            <img src={require("../image/Ellipse 15.png")} alt="Profile"/>
                        </div>
                        <div className="volumeControl">
                            {
                                // volumeLowIcon이 true 이고 volume이 0이 아닐때
                                !volumeLowIcon && volume != 0 ? (
                                    <button
                                        className={"volumeIcon"}
                                        onClick={() => {
                                            // 음소거 버튼으로 교체됩니다.
                                            setVolumeLowIcon(true);
                                            console.log(volume);
                                        }}
                                    >
                                        <img
                                            alt={"volume icon"}
                                            src={require("../assets/icon_sound.svg").default}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        className={"volumeIcon"}
                                        onClick={() => {
                                            setVolumeLowIcon(false);
                                        }}
                                    >
                                        <img
                                            alt={"volume low icon"}
                                            src={require("../assets/icon_sound-low.svg").default}
                                        />
                                    </button>
                                )
                            }
                            <div className={"sliderContainer"}>
                                <SliderRail/>
                                <SliderFillTrack fill={`${(volume / 100) * 80}%`}/>
                                <input
                                    className={"slider"}
                                    type={"range"}
                                    min={"0"}
                                    max={"100"}
                                    color={"gray"}
                                    value={volume}
                                    onChange={(e) => {
                                        setVolume(e.target.value);
                                        console.log(volume);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="Introduce">
                            <div className="blogName">{userName}</div>
                            <div className="subIntro">
                                {introduction}
                            </div>
                        </div>
                        <div className="buttons">
                            <button onClick={handleWritePostButtonClick}>글 작성</button>
                            <button onClick={handleProfileEditClick}>프로필 편집</button>
                        </div>
                        <div className="firstLink">
                            <div style={{marginRight: "10px"}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <path
                                        d="M1.82535 8.27376C1.29689 8.80841 1 9.53356 1 10.2897C1 11.0458 1.29689 11.7709 1.82535 12.3056C2.35381 12.8403 3.07056 13.1406 3.81792 13.1406C4.56528 13.1406 5.28203 12.8403 5.81049 12.3056M7.80146 6.25946C8.06314 6.52419 8.27072 6.83847 8.41235 7.18436C8.55397 7.53026 8.62687 7.90099 8.62687 8.27539C8.62687 8.64978 8.55397 9.02051 8.41235 9.36641C8.27072 9.7123 8.06314 10.0266 7.80146 10.2913L5.80888 12.3072M3.81631 6.25946L1.82374 8.27539M12.1746 5.86687C12.7031 5.33221 13 4.60706 13 3.85094C13 3.09483 12.7031 2.36968 12.1746 1.83502C11.6462 1.30037 10.9294 1 10.1821 1C9.43472 1 8.71797 1.30037 8.1895 1.83502M6.19854 7.88198C5.93686 7.61725 5.72928 7.30297 5.58765 6.95707C5.44603 6.61118 5.37313 6.24045 5.37313 5.86605C5.37313 5.49166 5.44603 5.12093 5.58765 4.77503C5.72928 4.42914 5.93686 4.11486 6.19854 3.85013L8.19112 1.83421M10.1837 7.88198L12.1763 5.86605"
                                        stroke="#7D7D7D"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="mailLink">ahy1612@gmail.com</div>
                        </div>
                        <br/>
                        <div className="secondLink">
                            <div style={{marginRight: "10px"}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <path
                                        d="M1.82535 8.27376C1.29689 8.80841 1 9.53356 1 10.2897C1 11.0458 1.29689 11.7709 1.82535 12.3056C2.35381 12.8403 3.07056 13.1406 3.81792 13.1406C4.56528 13.1406 5.28203 12.8403 5.81049 12.3056M7.80146 6.25946C8.06314 6.52419 8.27072 6.83847 8.41235 7.18436C8.55397 7.53026 8.62687 7.90099 8.62687 8.27539C8.62687 8.64978 8.55397 9.02051 8.41235 9.36641C8.27072 9.7123 8.06314 10.0266 7.80146 10.2913L5.80888 12.3072M3.81631 6.25946L1.82374 8.27539M12.1746 5.86687C12.7031 5.33221 13 4.60706 13 3.85094C13 3.09483 12.7031 2.36968 12.1746 1.83502C11.6462 1.30037 10.9294 1 10.1821 1C9.43472 1 8.71797 1.30037 8.1895 1.83502M6.19854 7.88198C5.93686 7.61725 5.72928 7.30297 5.58765 6.95707C5.44603 6.61118 5.37313 6.24045 5.37313 5.86605C5.37313 5.49166 5.44603 5.12093 5.58765 4.77503C5.72928 4.42914 5.93686 4.11486 6.19854 3.85013L8.19112 1.83421M10.1837 7.88198L12.1763 5.86605"
                                        stroke="#7D7D7D"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>https://github.com/An-hyeonyoung</div>
                        </div>
                    </div>
                    <div className="horizontal-line"/>
                    <div className="tag">
                        <div className="tagList">태그목록</div>
                        <ul>
                            <li
                                onClick={()=>{
                                    navigate("./postsbytag");
                                }}>
                                전체보기 <p>(50)</p>
                            </li>
                            <li>
                                JavaScript <p>(12)</p>
                            </li>
                            <li>
                                Algorithm <p>(26)</p>
                            </li>
                            <li>
                                SpringBoot <p>(4)</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="child second">
                    <div className="search-area">
                        <div className="select-menu">
                            {/*<SelectBox options={OPTIONS} defaultValue="title"></SelectBox>*/}
                            <div className={"dropdown"}>
                                <button className={`dropdownBtn`}>
                                    제목 검색
                                    <span className={`dropdownBtnIcon`}/>
                                </button>
                                <div className={`dropdownItem`}>
                                    <a href="#">제목 검색</a>
                                    <a href="#">태그 검색</a>
                                </div>
                            </div>
                        </div>
                        <div className="search">
                            <input
                                type="text"
                                placeholder="‘현영’ 님의 블로그 제목으로 검색해 보세요!"
                                onFocus={() =>
                                    "if(this.placeholder=='‘현영’ 님의 블로그 제목으로 검색해 보세요!') this.placeholder='';"
                                }
                                onBlur={() =>
                                    "if(this.placeholder=='') this.placeholder='‘현영’ 님의 블로그 제목으로 검색해 보세요!';"
                                }
                            />
                        </div>
                        <div className="searchImage"/>
                    </div>
                    <div className="new-contents">
                        <div>
                            <strong>최신글</strong>
                        </div>
                        <br></br>
                        <div className="PostCard">
                            {postList}
                        </div>
                    </div>
                    <div className="works">
                        <div>
                            <span className="workTitle">2023 블로그 기여도</span>
                        </div>
                        <div>

                        <ReactCalendarHeatmap
              startDate={new Date('2022-12-31')}
              endDate={new Date('2023-12-30')}
              values={Array.isArray(updatedDateCounts) ? updatedDateCounts : []}

              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-scale-${value.count}`;
              }}
              showWeekdayLabels
            />
            </div>

{/* Calendar */}
<div>
{/* 포스팅 개수 */}
{/* <Calendar
  tileContent={({ date, view }) => {
    const formattedDate = date.toISOString().split('T')[0];

    // 서버에서 받은 날짜를 UTC 기준으로 처리하는 함수
    const convertToUTC = (dateString) => {
      const localDate = new Date(dateString);
      const utcDate = new Date(localDate.toUTCString());
      return new Date(utcDate.setHours(0, 0, 0, 0));
    };

    // dateCounts가 배열인지 확인
    if (Array.isArray(dateCounts)) {
      // 서버에서 받은 날짜 데이터를 UTC 기준으로 처리
      const dateCountsAsDate = dateCounts.map(item => ({ ...item, date: convertToUTC(item.date) }));

      // find 메서드 사용
      const dateCount = dateCountsAsDate.find((item) => item.date.toISOString().split('T')[0] === formattedDate);

      return dateCount && view === 'month' ? <p>{dateCount.count} </p> : null;
    } else {
      // dateCounts가 배열이 아닌 경우, 처리할 내용 추가
      return null;
    }
  }}
/> */}
{/* 포스팅 색깔 */}
{/* <Calendar
  tileContent={({ date, view }) => {
    const formattedDate = date.toISOString().split('T')[0];

    // 서버에서 받은 날짜를 UTC 기준으로 처리하는 함수
    const convertToUTC = (dateString) => {
      const localDate = new Date(dateString);
      const utcDate = new Date(localDate.toUTCString());
      return new Date(utcDate.setHours(0, 0, 0, 0));
    };

    // dateCounts가 배열인지 확인
    if (Array.isArray(dateCounts)) {
      // 서버에서 받은 날짜 데이터를 UTC 기준으로 처리
      const dateCountsAsDate = dateCounts.map(item => ({ ...item, date: convertToUTC(item.date) }));

      // find 메서드 사용
      const dateCount = dateCountsAsDate.find((item) => item.date.toISOString().split('T')[0] === formattedDate);

      // 포스팅 개수에 따라 색깔을 결정하는 함수
      const getColor = (count) => {
        if (count >= 5) {
          return 'yellow'; // 포스팅이 5개 이상인 경우 녹색
        } else if (count > 0) {
          return 'orange'; // 포스팅이 1개 이상인 경우 노랑
        } else {
          return 'white'; // 포스팅이 없는 경우 흰색
        }
      };

      // getColor 함수를 사용하여 색깔 결정
      const color = dateCount ? getColor(dateCount.count) : 'white';

      return (
        // <div style={{ backgroundColor: color, borderRadius: '50%', height: '100%', width: '100%' }} />
        <div style={{ backgroundColor: color, borderRadius: '0%', height: '100%', width: '100%' }} />
      );
    } else {
      // dateCounts가 배열이 아닌 경우, 처리할 내용 추가
      return null;
    }
  }}
/> */}


{/* <div style={{ display: 'flex' }}> */}
{/* 포스팅 사진 */}
{/* <div style={{ flex: '70%' }}>
<Calendar
  tileContent={({ date, view }) => {
    const formattedDate = date.toISOString().split('T')[0];

    // 서버에서 받은 날짜를 UTC 기준으로 처리하는 함수
    const convertToUTC = (dateString) => {
      const localDate = new Date(dateString);
      const utcDate = new Date(localDate.toUTCString());
      return new Date(utcDate.setHours(0, 0, 0, 0));
    };

    // dateCounts가 배열인지 확인
    if (Array.isArray(dateCounts)) {
      // 서버에서 받은 날짜 데이터를 UTC 기준으로 처리
      const dateCountsAsDate = dateCounts.map(item => ({ ...item, date: convertToUTC(item.date) }));

      // find 메서드 사용
      const dateCount = dateCountsAsDate.find((item) => item.date.toISOString().split('T')[0] === formattedDate);

      // 포스팅 개수에 따라 이미지를 결정하는 함수
      const getImage = (count) => {
        if (count >= 3) {
          return `url(${greenImage})`; // 포스팅이 3개 이상인 경우 녹색 이미지
        } else if (count > 0) {
          return `url(${yellowImage})`; // 포스팅이 1개 이상인 경우 노랑 이미지
        } else {
          return `url(${whiteImage})`;; // 포스팅이 없는 경우 흰색 이미지
        }
      };

      // getImage 함수를 사용하여 이미지 결정
      const backgroundImage = dateCount ? getImage(dateCount.count) : `url(${whiteImage})`;

      return (
        <div
          style={{
            backgroundImage: backgroundImage,
            backgroundSize: 'cover',
            borderRadius: '0%',
            height: '100%',
            width: '100%',
          }}
        />
      );
    } else {
      // dateCounts가 배열이 아닌 경우, 처리할 내용 추가
      return null;
    }
  }}
/> */}


    {/* </div> */}
{/* Calendar */}



{/* <div style={{ flex: '100%' }}>
    <img
      src={require("../image/123.png")}
      className="postnotice"
      alt="Post Notice"
      style={{ maxWidth: '100%', height: '50%' }}
    />
  </div>
            </div> */}


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyBlogPage;

const SliderRail = styled.div`
  width: 80%;
  height: 4px;
  border-radius: 2px;
  background-color: gray;
  position: absolute;
  top: calc(50% - 2px);
`;

const SliderFillTrack = styled.div`
  width: ${(props) => props.fill};
  height: 4px;
  border-radius: 2px;
  background-color: black;
  position: absolute;
  top: calc(50% - 2px);
`;
