import React, { useState } from "react";
import {marked} from "marked";
import "./MarkdownEditor.css";

const MarkdownEditor = ({ onContentChange }) => {
  const [content, setContent] = useState("");
  const [isSelectVisible, setSelectVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isRendered, setIsRendered] = useState(false);


  const handleContentChange = (e) => {
    const markdown = e.target.value;
    setContent(markdown);
    onContentChange(markdown);

    const transformedText = transformMarkdown(markdown);
    setContent(transformedText); 

    if (markdown.endsWith('/')) {
      setSelectVisible(true);
    } else {
      setSelectVisible(false);
    }
  };

  const handleLevelChange = (e) => {
    const newLevelContent = `${e.target.value} `;
    setSelectedLevel(parseInt(e.target.value, 10));
    setSelectVisible(false);
    setContent((prevContent) => prevContent + newLevelContent);
  };

  const transformMarkdown = (input) => {
    const regex = /^\/(\d+)\s(.+)/gm;
    const output = input.replace(regex, (match, level, content) => {
      let heading = '';
      for (let i = 0; i < parseInt(level, 10); i++) {
        heading += '#';
      }
      return `${heading} ${content}`;
    });

    return output;
  };




  const renderMarkdown = (markdown) => {
    return { __html: marked(markdown) };
  };

  return (
    <div>
    <div>
      <textarea
        id='content_txt'
        value={content}
        onChange={handleContentChange}
        placeholder="내용을 입력하세요"
      />
      
    </div>

      {isSelectVisible && (
          <div>
            <label>레벨 선택: </label>
            <select value={selectedLevel} onChange={handleLevelChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        )}



{/* 조건부 렌더링을 통해 해당 요소를 접었다 폈다할 수 있도록 함 */}
<button onClick={() => setIsRendered(!isRendered)}>
        {isRendered ? "미리보기 접기" : "미리보기 보기"}
      </button>
{isRendered && (
        <div className="markdown-rendered-content" dangerouslySetInnerHTML={renderMarkdown(content)} />
      )}

      
      {/* <div>
                    <textarea id='content_txt' placeholder="내용을 입력하세요." name="contents"
                        value={contents} onChange={(e) => setContents(e.target.value)}></textarea>
                </div> */}
    </div>
  );
};

export default MarkdownEditor;