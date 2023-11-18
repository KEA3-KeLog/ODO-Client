import "./writePost.css";
import toolbar from "../img/toolbar.png";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect, useRef } from "react";
import PostService from "../service/PostService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Viewer } from '@toast-ui/react-editor';

import MarkdownEditor from "./MarkdownEditor";
import NavBar from "../components/Navigationbar";
import ImageService from "../service/ImageService";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

function EditPost() {
  const { state: initialState } = useLocation();
  
  
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  //추가
  const [tags, setTags] = useState([]); 
  const [contents, setContents] = useState("");
  const editorRef = useRef();
  // const userId = useParams().userId;
  const userId = initialState.userId;
  const postId = initialState.postId;
  
  
  // const [notification, setNotification] = useState(null);

  // // Show notification
  // const showNotification = () => {
  //   if (notification) {
  //     notification.classList.add('show');
  //     setTimeout(() => {
  //       notification.classList.remove('show');
  //     }, 2000);
  //   }
  // };

  // useEffect(() => {
  //   const foundNotification = document.getElementById('notification-container');
  //   setNotification(foundNotification);
  // }, []); // componentDidMount에서 실행
  
  
  const test = `# markdown`;

  const handleContentChange = (newContent) => {
    setContents(newContent); // 마크다운 컨텐트 업데이트
  };


  useEffect(() => {
    if (initialState) {
        // setTag(initialState.tag || "");
        setTags(initialState.tagList || []);
        setTitle(initialState.title || "");
        setContents(initialState.contents || "");
    }
}, [initialState]);




  
  const onChange = () => {
    setContents(editorRef.current.getInstance().getMarkdown());
  };

  const handleTagChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setTags((prevTags) => [...prevTags, e.target.value.trim()]);
      e.target.value = ""; // Clear input after adding tag
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

 
  console.log("userId는?" + userId);
  console.log("tag?" + tag);
  console.log("title?" + title);
  console.log("content?" + contents);
  console.log("postid?" + postId);


  let post = {
    tagList: tags,
    title: title,
    contents: contents,
    userId: userId,
    postId: postId,
  };

return (
  <>
    <NavBar userId={userId} />
    <div className="Head"></div>
    <img className="toolbar" src={toolbar} />
    <div className="Write">
      <div>
        <input
          type="text"
          id="title_txt"
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* <div>
        <input
          type="text"
          id="tag_txt"
          placeholder="태그를 입력하세요"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
       */}
       <div className="tag-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button onClick={() => handleRemoveTag(index)}>X</button>
              </span>
            ))}
          </div>
       








      <div data-color-mode="light">
      <Editor
            initialValue={initialState.contents}
            previewStyle="vertical"
            height="900px"
            initialEditType="markdown"
            useCommandShortcut={false}
            plugins={[colorSyntax]}
            language="ko-KR"
            ref={editorRef}
            onChange={onChange}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const formData = new FormData();
              formData.append("file", blob);
              console.log(blob);
              const img = await ImageService.uploadImage(formData);
              const url = img.data;
              callback("http://localhost:8080/api/image/" + url, url);
            },
          }}
        />
      </div>
    </div>
    <div className="bottom">
      <div className="post_save">
        <button id="post_save_button"> 임시저장 </button>
        <button
          id="post_submit_button"
          onClick={(e) => {
            e.preventDefault();
            PostService.updatePost(postId, post).then((res) => {
              navigate(`/myblogpage/${userId}`);
              


            });

            
            
          }}
        >
          {" "}
          게시하기{" "}
        </button>
      </div>
    </div>
  </>
);
}

export default EditPost;