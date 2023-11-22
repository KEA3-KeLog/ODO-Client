import "./PostView.css";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import PostService from '../service/PostService';
import { useLocation, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'; // 마크다운
import remarkGfm from 'remark-gfm';
import NavBar from "../components/Navigationbar"; // 마크다운
import { Viewer } from '@toast-ui/react-editor';
import Comment from "../components/Comment";

import { useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';


function PostView() {
    const postId = useParams().postId;
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [contents, setContents] = useState("");
    const [summary, setSummary] = useState("");
    //추가
    const [tags, setTags] = useState([]); 
    const navigate = useNavigate();
    let state = {
        posts: []
    }
    const location = useLocation();
    const userId = location.state;

    useEffect(() => {
        PostService.getOnePost(postId).then(res => {
            console.log(res);
            // setTag(res.data.tag);
            setTags(res.data.tagList);
            setTitle(res.data.title);
            setContents(res.data.contents);
            setSummary(res.data.summary);
        });
    }, []);

    const handleUpdate = () => {
        const updatedPost = {
            tagList: tags,
            title: title,
            contents: contents,
            userId: userId,
            postId: postId,
            summary: summary,
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


    return (
        <>
            <NavBar userId={userId} />
            <div className='Head' />
            <div className='Mains'>
                <div id='Mains-left'>
                </div>

                <div>
                    <div className='Post_head'>
                        <div className="row">
                            <h1 id="title">{title}</h1>
                            <text id="thin">by <text id="bold">hyun_dev</text> · 2023.09.27</text><br /><br />
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
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contents}</ReactMarkdown>
                            {/* <Viewer initialValue={contents || ''} /> */}
                            {/* 마크다운 */}<br /><br /><br /><br />
                            
                            {/* <Viewer initialValue={contents || ''} /> */}
                            {/* 마크다운 */}
                        </div>
                    </div>

                    <div className="row"><br/>
                    <Comment postId={postId} />

                    </div>

                </div>

                <div id='Mains-right'>
                     <button id="post_edit_button" onClick={handleUpdate}>수정</button>
                     <button id="post_delete_button" onClick={handleDelete}>삭제</button>

                </div>

            </div>

        </>
    );
};

export default PostView;
