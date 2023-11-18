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
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import CommentService from "../service/CommentService";

import '@toast-ui/editor/dist/toastui-editor-viewer.css';


function PostView() {
    const postId = useParams().postId;
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [contents, setContents] = useState("");
    const [summary, setSummary] = useState("");
    let state = {
        posts: []
    }
    const location = useLocation();
    const userId = location.state;

    useEffect(() => {
        PostService.getOnePost(postId).then(res => {
            console.log(res);
            setTag(res.data.tag);
            setTitle(res.data.title);
            setContents(res.data.contents);
            setSummary(res.data.summary);
        });
    });


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
                            <button id="tag"> {tag} </button><br /><br /><br />
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
                        </div>
                    </div>

                    <div className="row"><br/>
                    <Comment postId={postId} />

                    </div>

                </div>

                <div id='Mains-right'>

                </div>

            </div>

        </>
    );
};

export default PostView;
