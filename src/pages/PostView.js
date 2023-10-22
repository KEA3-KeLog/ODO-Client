import "./PostView.css";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import PostService from '../service/PostService';
import { useParams } from "react-router-dom";



function PostView() {
    const id = useParams().id;
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [contents, setContents] = useState("");
    let state = {
        posts: []
    }
    useEffect(() => {
        PostService.getPosts().then(res => {
            console.log(res);
            state = { post: res.data };
        });
        PostService.getOnePost(id).then(res => {
            console.log(res);
            setTag(res.data.tag);
            setTitle(res.data.title);
            setContents(res.data.contents);
        });
    });


    return (
        <>
            <div className='Head' />

            <div className='Mains'>
                <div id='Mains-left'>
                </div>

                <div>
                    <div className='Post_head'>
                        <div className="row">
                            <h1 id = "title">{title}</h1>
                            <text id ="thin">by <text id ="bold">hyun_dev</text> · 2023.09.27</text><br/><br/>
                            <button id="tag"> {tag} </button><br/><br/><br/>
                        </div>
                    </div>

                    <div className="Post_summary">
                        <div className="row">
                            <h2>*AI 요약</h2>
                            JSX 문법은 자바스크립트와 HTML을 동시작성 가능하다는 장점이 있다.<br/>
                            가독성이 높고 편리하기 때문에 프론트엔드 개발자에게 추천.
                        </div><br/>
                    </div>
                    <div className="Post_contents">
                        <div className="row"><br/><br/><br/>
                            {contents}
                        </div>
                    </div>
                   
                </div>

                <div id='Mains-right'>

                </div>
            </div>
        </>
    );
};

export default PostView;
