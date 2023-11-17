import "./writePost.css";
import React, { useState, useEffec, useRef } from "react";
import PostService from "../service/PostService";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navigationbar";
import ImageService from "../service/ImageService";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

function WritePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  //변경
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]); // 변경: 태그 배열

  

  const [contents, setContents] = useState("");
  //   const [postId, setPostId] = useState(parseInt(Date.now().toString().slice(-9)) * 10000 + Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
  const [postKey, setPostKey] = useState(
    Math.floor(Math.random() * (2147483647 - 0 + 1)) + 0
  );

  const editorRef = useRef();
  const userId = useParams().userId;

  const handleContentChange = (newContent) => {
    setContents(newContent); // 마크다운 컨텐트 업데이트
  };
  const onChange = () => {
    setContents(editorRef.current.getInstance().getMarkdown());
  };


  const handleTagChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setTagList((prevTags) => [...prevTags, e.target.value.trim()]);
      setTag(""); // 입력 후 초기화
    }
  };

  const handleRemoveTag = (index) => {
    setTagList((prevTags) => prevTags.filter((_, i) => i !== index));
  };
  


  


  let post = {
    postKey: postKey,
    tag: tag,
    tagList: tagList,
    title: title,
    contents: contents,
    userId: userId,
  };
  return (
    <>
      <NavBar userId={userId} />
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
        </div> */}
        <div>
          <input
            type="text"
            id="tag_txt"
            placeholder="태그를 입력하시고 엔터를 누르세요"
            name="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyPress={handleTagChange}
          />
          <div className="tag-list">
            {tagList.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button onClick={() => handleRemoveTag(index)}>X</button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div id="content_txt" data-color-mode="light">
        <Editor
          initialValue=" "
          previewStyle="vertical"
          height="680px"
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
              formData.append("postKey", postKey);
              console.log(blob);
              console.log(postKey);
              const img = await ImageService.uploadImage(formData);
              const url = img.data;
              callback("http://localhost:8080/api/image/" + url, url);
            },
          }}
        />
      </div>
      <div className="bottom">
        <div className="post_save">
          <button id="post_save_button"> 임시저장 </button>
          <button
            id="post_submit_button"
            onClick={(e) => {
              e.preventDefault();
              PostService.createPost(post).then((res) => {
                navigate("/postview/" + res.data, {
                  state: post.userId,
                });
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

export default WritePost;
