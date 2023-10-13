import { useCallback } from "react";
import "./writePost.css";
import toolbar from "../img/toolbar.png";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
function login() {

    return (
        <>
        
            <div className="Head">

            </div>
            <img className="toolbar"
            src={toolbar} />
            <div className="Write">
                <div>
                    <input type='text' id="title_txt" placeholder="제목을 입력하세요" />
                </div>
                <div>
                    <input type='text' id="tag_txt" placeholder="태그를 입력하세요" />
                </div>

                <div>
                    <textarea id='content_txt' placeholder="내용을 입력하세요."></textarea>
                </div>
            </div>
            <div className="bottom">
                <div className='post_save'>
                    <button id="post_save_button"> 임시저장 </button>
                    <button id="post_submit_button"> 게시하기 </button>
                </div>

            </div>
        </>


    );
};

export default login;
