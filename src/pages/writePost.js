
import "./writePost.css";
import toolbar from "../img/toolbar.png";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import PostService from '../service/PostService';
import { useNavigate } from 'react-router-dom';



function WritePost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [contents, setContents] = useState("");

    let post = {
        tag: tag,
        title: title,
        contents: contents,
        userId: 0
    };
    
    return (
        <>
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
                    <textarea id='content_txt' placeholder="내용을 입력하세요." name="contents"
                        value={contents} onChange={(e) => setContents(e.target.value)}></textarea>
                </div>
            </div>
            <div className="bottom">
                <div className='post_save'>
                    <button id="post_save_button"> 임시저장 </button>
                    <button id="post_submit_button" onClick={(e) => {
                        e.preventDefault();
                        PostService.createPost(post).then(res => {
                            navigate('/postview/' + res.data);
                        });
                    }}> 게시하기 </button>
                </div>

            </div>
        </>


    );
};

export default WritePost;
