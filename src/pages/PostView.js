import "./PostView.css";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import PostService from '../service/PostService';
import { useLocation, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'; // 마크다운
import remarkGfm from 'remark-gfm';
import NavBar from "../components/Navigationbar"; // 마크다운
import NavBarUser from "../components/Navigationbar-user";
import { Viewer } from '@toast-ui/react-editor';
import Comment from "../components/Comment";

import { useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import TTSService from "../service/TTSService";
import UserService from "../service/UserService";

function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options).replace(/,/g, '');
  }

function PostView() {
    const postId = useParams().postId;
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [contents, setContents] = useState("");
    const [summary, setSummary] = useState("");
    const [postKey, setPostKey] = useState("");
    const [userName, setUserName] = useState("");
    const [createdTime, setCreatedTime] = useState("");
    //추가
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    let state = {
        posts: []
    }
    const location = useLocation();
    const userId = location.state;

    useEffect(() => {
        console.log("userId: ", userId);
        console.log("memeberId: ", localStorage.getItem("memberId"));

        PostService.getOnePost(postId).then(res => {
            console.log(res);
            // setTag(res.data.tag);
            setTags(res.data.tagList);
            setTitle(res.data.title);
            setContents(res.data.contents);
            setSummary(res.data.summary);
            setCreatedTime(res.data.createdTime);
            setPostKey(res.data.postKey);
        });
        UserService.getUser(userId).then(function (res) {
            setUserName(res.data.blog_nickname);
        })
    }, []);

    const handleUpdate = () => {
        const updatedPost = {
            tagList: tags,
            title: title,
            contents: contents,
            userId: userId,
            postId: postId,
            summary: summary,
            postKey: postKey
        };

        // PostService.updatePost를 호출하여 서버에 업데이트 요청을 보냅니다.
        PostService.updatePost(postId, updatedPost)
            .then(() => {
                console.log('Post updated successfully');
                // 수정된 정보를 가지고 WritePost 페이지로 이동합니다.
                navigate(`/editpost/${userId}`, { state: updatedPost });
            })
            .catch((error) => {
                // Handle update error
                console.error('Error updating post: ', error);
            });
    };






    const handleDelete = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {

            PostService.deletePost(postId)
                .then(() => {
                    // Optionally, you can handle any success actions here, if needed
                    console.log('Post deleted successfully');
                    // Redirect to the desired page after deletion
                    window.location.href = '/myblogpage/' + userId; // Redirect to home page after deletion
                })
                .catch((error) => {
                    // Handle delete error
                    console.error('Error deleting post: ', error);
                });
        }
    };
    const handlePlay = () => {
        TTSService.playVoice(postId)
    }
    const pause = () => {
        TTSService.pause();
    }

    const resume = () => {
        TTSService.resume();
    }


    return (
        <>
            {
                userId == localStorage.getItem("memberId")
                    ? <NavBarUser />
                    : <NavBar userId={userId}/>
            }
            <div className='Head' />
            <div className='Mains'>
                <div id='Mains-left'>
                </div>

                <div>
                    <div className='Post_head'>
                        <div className="row">
                            <h1 id="title">{title}</h1>
                            <text id="thin">by <text id="bold">{userName}</text> · {formatDateTime(createdTime)}</text><br /><br />
                            {tags.map((tag, index) => (
                                <button key={index} id="tag">{tag}</button>
                            ))}



                        </div>
                    </div>

                    <div className="Post_summary">
                        <div className="row">
                            <h2>*AI 요약</h2>
                            {summary}
                        </div><br />
                    </div>
                    <div className="Post_contents">
                        <div className="row"><br /><br /><br />
                            {/* 마크다운 */}
                            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{contents}</ReactMarkdown> */}
                            
                            <Viewer key={contents} initialValue={contents} />
                            {/* 마크다운 */}<br /><br /><br /><br />
                        </div>
                    </div>

                    <div className="row"><br />
                        <Comment postId={postId} />

                    </div>

                </div>

                <div id='Mains-right'>
                    <button id="post_edit_button" onClick={handleUpdate}>수정</button>
                    <button id="post_delete_button" onClick={handleDelete}>삭제</button>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <button id="post_edit_button" onClick={handlePlay}>재생</button>
                    <br/>
                    <button id="post_edit_button" onClick={pause}>pause</button>
                    <br/>
                    <button id="post_edit_button" onClick={resume}>resume</button>
                </div>

            </div>

        </>
    );
};

export default PostView;
