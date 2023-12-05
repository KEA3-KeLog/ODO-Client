import "./writePost.css";
import toolbar from "../img/toolbar.png";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect, useRef, useCallback } from "react";
import PostService from "../service/PostService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Viewer } from '@toast-ui/react-editor';
import TTSService from "../service/TTSService";
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
  //변경
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]); // 변경: 태그 배열
  const [contents, setContents] = useState("");

  const editorRef = useRef();
  // const userId = useParams().userId;
  const userId = initialState.userId;
  const postId = initialState.postId;
  const postKey = initialState.postKey;
  console.log(postKey);

  const test = `# markdown`;

  const handleContentChange = (newContent) => {
    setContents(newContent); // 마크다운 컨텐트 업데이트
  };


  useEffect(() => {
    if (initialState) {
        // setTag(initialState.tag || "");
        setTagList(initialState.tagList || []);
        setTitle(initialState.title || "");
        setContents(initialState.contents || "");
    }
}, [initialState]);


const onKeyUp = useCallback(
  (e) => {
    if (typeof window !== "undefined") {
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        // 중복된 태그 확인
        if (!tagList.includes("#" + e.target.value.trim())) {
          setTagList((prevTags) => [...prevTags, "#" + e.target.value.trim()]);
        }
        setTag(""); // Clear the input after adding a tag
      }
    }
  },
  [tag, tagList]
);



  
  const onChange = () => {
    setContents(editorRef.current.getInstance().getMarkdown());
  };

  const handleTagChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      // 중복된 태그 확인
      if (!tagList.includes(e.target.value.trim())) {
        setTagList((prevTags) => [...prevTags, e.target.value.trim()]);
      }
      setTag(""); // 입력 후 초기화
    }
  };

  const handleRemoveTag = (index) => {
    setTagList((prevTags) => prevTags.filter((_, i) => i !== index));
  };



  const handleAddImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("postKey", postKey);// postId 사용
    formData.append("title",title); // title 같이 전송해봄
    console.log(formData);
  
    try {
      // 이미지를 업로드하고 서버에 저장
      const img = await ImageService.updateImage(formData);
      const url = img.data;
  
      // 이미지 URL을 에디터에 추가
      callback("http://localhost:8080/api/image/" + url, url);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      // 이미지 삭제 API 호출
      await ImageService.deleteImage(postId);
  
      // 삭제 성공 시 에디터의 이미지 삭제
      // 여기에서 구현은 에디터의 이미지를 삭제하는 방식에 따라 다를 수 있습니다.
      // 해당 방식을 알려주시면 더 구체적인 도움을 드릴 수 있습니다.
  
      console.log("이미지 삭제 성공");
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
    }
  };
 


  let post = {
    tagList: tagList,
    title: title,
    contents: contents,
    userId: userId,
    postId: postId,
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
      </div>
       */}
       {/* <div className="tag-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button onClick={() => handleRemoveTag(index)}>X</button>
              </span>
            ))}
          </div> */}


          <div className="tag-input-container">
          <div className="tag-input-wrapper">
            {tagList.map((tag, index) => (
              <div key={index} className="tag_post" onClick={() => handleRemoveTag(index)}>
                {tag}
                {/* <button onClick={() => handleRemoveTag(index)}>X</button> */}
              </div>
            ))}
            <input
              type="text"
              placeholder="태그를 입력하세요"
              id="tag_txt"
              name="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyUp={onKeyUp}
            />
          </div>
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
              addImageBlobHook: handleAddImage,
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
            TTSService.requestVoice(contents, userId);
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