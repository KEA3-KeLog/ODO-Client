
import "./writePost.css";
import toolbar from "../img/toolbar.png";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import PostService from '../service/PostService';
import {useNavigate, useParams} from 'react-router-dom';
import MarkdownEditor from "./MarkdownEditor";
import NavBar from "../components/Navigationbar";



function WritePost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [contents, setContents] = useState("");

    const userId = useParams().userId;

    const handleContentChange = (newContent) => {
        setContents(newContent); // 마크다운 컨텐트 업데이트
      };

    let post = {
        tag: tag,
        title: title,
        contents: contents,
        userId: userId
    };
    
    return (
        <>
            <NavBar userId={userId}/>
            <div className="Head">

            </div>
            <img className="toolbar"
                src={toolbar} />
            <div className="Write">
                <div>
                    <input type='text' id="title_txt" placeholder="제목을 입력하세요" name="title"
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type='text' id="tag_txt" placeholder="태그를 입력하세요" name="tag"
                        value={tag} onChange={(e) => setTag(e.target.value)} />
                </div>
                <div>
                    <MarkdownEditor onContentChange={handleContentChange} />
                </div>
            </div>
            <div className="bottom">
                <div className='post_save'>
                    <button id="post_save_button"> 임시저장 </button>
                    <button id="post_submit_button" onClick={(e) => {
                        e.preventDefault();
                        PostService.createPost(post).then(res => {
                            navigate('/postview/' + res.data, {
                                state: post.userId
                            });
                        });
                    }}> 게시하기 </button>
                </div>
                    
            </div>
        </>


    );
};

export default WritePost;
