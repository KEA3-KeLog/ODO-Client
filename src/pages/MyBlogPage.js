import './MyBlogPage.css';
import NavBar from '../components/Navigationbar';
import ResizedComponent from '../components/ResizedComponent';
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import styles from "./MainPage.module.css";

const SelectBoxWrapper = styled.div`
  display: flex;
`;

// Icon에 사용할 Icon SVG 컴포넌트 생성
const IconSVG = styled.svg`
  margin-left: -28px;
  margin-top: 10px;
  align-self: center;
  width: 24px;
`;

export const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  min-width: 0;
  display: block;
  width: 100%;
  line-height: inherit;
  border: 1px;
  border-radius: 4px;
  background-color: white;
  margin: 10px 0 0 0;
  box-shadow: 0px 0px 10px 3px rgba(190, 190, 190, 0.6);

  &:hover {
    background-color: #c0c0c0;
    transition: 0.5s;
  }
`;

function MyBlogPage() {

    // volume value
    const [volume, setVolume] = useState(10);
    // display: block 일때 보이고 display: none 일때 안 보입니다.
    const [volumeLowIcon, setVolumeLowIcon] = useState(false);

    const OPTIONS = [
        {value: "Title", name: "제목"},
        {value: "Contents", name: "내용"}
    ];

    const SelectBox = (props) => {
        const handleChange = (e) => {
            // event handler
            console.log(e.target.value);
        };
        return (
            <SelectBoxWrapper>
                <Select onChange={handleChange}>
                    {props.options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            defaultValue={props.defaultValue === option.value}
                        >
                            {option.name}
                        </option>
                    ))}
                </Select>
                <IconSVG
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 14L16 6H4L10 14Z"
                        fill="#1A1A1A"
                    />
                </IconSVG>
            </SelectBoxWrapper>
        );
    };

    return (
        <>
            <NavBar/>
            <div class="container">
                <ion-icon name="chevron-down-outline"></ion-icon>
                <div class="child first">
                    <div class="profile">
                        <div className='profile_image'>
                            <img src='image/Ellipse 15.png' alt="Profile"/>
                        </div>
                        <div className='volumeControl'>
                            {
                                // volumeLowIcon이 true 이고 volume이 0이 아닐때
                                !volumeLowIcon && volume != 0
                                    ? <button className={"volumeIcon"}
                                              onClick={() => {
                                                  // 음소거 버튼으로 교체됩니다.
                                                  setVolumeLowIcon(true);
                                                  console.log(volume);
                                              }}>
                                        <img
                                            alt={"volume icon"}
                                            src={require("../assets/icon_sound.svg").default}
                                        />
                                    </button>
                                    : <button className={"volumeIcon"}
                                              onClick={() => {
                                                  setVolumeLowIcon(false);
                                              }}>
                                        <img
                                            alt={"volume low icon"}
                                            src={require("../assets/icon_sound-low.svg").default}
                                        />
                                    </button>
                            }
                            <div className={"sliderContainer"}>
                                <SliderRail />
                                <SliderFillTrack fill={
                                    `${(volume / 100) * 80}%`
                                } />
                                <input className={"slider"}
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
                        <div className='Introduce'>
                            <div className='blogName'>
                                hyun_dev
                            </div>
                            <div className='subIntro'>
                                <text>안녕하세요~ <br/>잔디밭 채우고 싶은 <br/>프론트 앤드 개발자 입니다.</text>
                            </div>
                        </div>
                        <div className='buttons'>
                            <button>글 작성</button>
                            <button>프로필 편집</button>
                        </div>
                        <div className='firstLink'>
                            <div style={{marginRight: '10px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                     fill="none">
                                    <path
                                        d="M1.82535 8.27376C1.29689 8.80841 1 9.53356 1 10.2897C1 11.0458 1.29689 11.7709 1.82535 12.3056C2.35381 12.8403 3.07056 13.1406 3.81792 13.1406C4.56528 13.1406 5.28203 12.8403 5.81049 12.3056M7.80146 6.25946C8.06314 6.52419 8.27072 6.83847 8.41235 7.18436C8.55397 7.53026 8.62687 7.90099 8.62687 8.27539C8.62687 8.64978 8.55397 9.02051 8.41235 9.36641C8.27072 9.7123 8.06314 10.0266 7.80146 10.2913L5.80888 12.3072M3.81631 6.25946L1.82374 8.27539M12.1746 5.86687C12.7031 5.33221 13 4.60706 13 3.85094C13 3.09483 12.7031 2.36968 12.1746 1.83502C11.6462 1.30037 10.9294 1 10.1821 1C9.43472 1 8.71797 1.30037 8.1895 1.83502M6.19854 7.88198C5.93686 7.61725 5.72928 7.30297 5.58765 6.95707C5.44603 6.61118 5.37313 6.24045 5.37313 5.86605C5.37313 5.49166 5.44603 5.12093 5.58765 4.77503C5.72928 4.42914 5.93686 4.11486 6.19854 3.85013L8.19112 1.83421M10.1837 7.88198L12.1763 5.86605"
                                        stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div className='mailLink'>ahy1612@gmail.com</div>
                        </div>
                        <br/>
                        <div className='secondLink'>
                            <div style={{marginRight: '10px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                     fill="none">
                                    <path
                                        d="M1.82535 8.27376C1.29689 8.80841 1 9.53356 1 10.2897C1 11.0458 1.29689 11.7709 1.82535 12.3056C2.35381 12.8403 3.07056 13.1406 3.81792 13.1406C4.56528 13.1406 5.28203 12.8403 5.81049 12.3056M7.80146 6.25946C8.06314 6.52419 8.27072 6.83847 8.41235 7.18436C8.55397 7.53026 8.62687 7.90099 8.62687 8.27539C8.62687 8.64978 8.55397 9.02051 8.41235 9.36641C8.27072 9.7123 8.06314 10.0266 7.80146 10.2913L5.80888 12.3072M3.81631 6.25946L1.82374 8.27539M12.1746 5.86687C12.7031 5.33221 13 4.60706 13 3.85094C13 3.09483 12.7031 2.36968 12.1746 1.83502C11.6462 1.30037 10.9294 1 10.1821 1C9.43472 1 8.71797 1.30037 8.1895 1.83502M6.19854 7.88198C5.93686 7.61725 5.72928 7.30297 5.58765 6.95707C5.44603 6.61118 5.37313 6.24045 5.37313 5.86605C5.37313 5.49166 5.44603 5.12093 5.58765 4.77503C5.72928 4.42914 5.93686 4.11486 6.19854 3.85013L8.19112 1.83421M10.1837 7.88198L12.1763 5.86605"
                                        stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>https://github.com/An-hyeonyoung</div>
                        </div>
                    </div>
                    <div className='horizontal-line'/>
                    <div class="tag">
                        <div className='tagList'>태그목록</div>
                        <ul>
                            <li>전체보기 <p>(50)</p></li>
                            <li>JavaScript <p>(12)</p></li>
                            <li>Algorithm <p>(26)</p></li>
                            <li>SpringBoot <p>(4)</p></li>
                        </ul>
                    </div>
                </div>
                <div class="child second">
                    <div className="searcharea">
                        <div className='select-menu'>
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
                        <div className='search'>
                            <input type="text"
                                   placeholder="‘현영’ 님의 블로그 제목으로 검색해 보세요!"
                                   onfocus="if(this.placeholder=='‘현영’ 님의 블로그 제목으로 검색해 보세요!') this.placeholder='';"
                                   onblur="if(this.placeholder=='') this.placeholder='‘현영’ 님의 블로그 제목으로 검색해 보세요!';"/>
                        </div>
                        <div className='searchImage'/>
                    </div>

                    <div className="new-contents">
                        <div><strong>최신글</strong></div>
                        <br></br>
                        <div className='PostCard'>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 28.png' alt="P"/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 29.png'/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 30.png' alt="P"/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 31.png'/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 31.png'/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 31.png'/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 31.png'/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                            <div className='PostCardBlock'>
                                <div className='PostCardBlockImage'>
                                    <div className='PostCardBlockImage_Link' style={{paddingTop: '55.1921%'}}>
                                        <img src='image\Rectangle 31.png'/>
                                    </div>
                                </div>
                                <div className='PostCardBlockContents'>
                                    <div className='PostCardBlockTag'>
                                        <span>JavaScript</span>
                                    </div>
                                    <div className='PostCardBlockContents_Link'>
                                        <h4 className='PostCardBlockContents_Title'>프로그래밍의 순간들</h4>
                                        <div>
                                            <p className='PostCardBlockContents_subtitle'>디버깅 중 마주친 문제는 Stack Overflow
                                                검색을 통해 도움을 얻을 수 있다.</p>
                                        </div>
                                    </div>
                                    <div className='PostCardBlockDate'>
                                        <span>2023-10-01</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="works">
                        <div>
                            <span className='workTitle'>2023 블로그 기여도</span>
                        </div>
                        <div>
                            <img src='image\Rectangle 65.png' className='workimage'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
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
  width: ${props => props.fill};
  height: 4px;
  border-radius: 2px;
  background-color: black;
  position: absolute;
  top: calc(50% - 2px);
`;
