import React, { useState, useEffect } from "react";
import ImageService from '../service/ImageService';
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";



function Mtest() {

  return (
    <div data-color-mode="light">
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="900px"
        initialEditType="markdown"
        useCommandShortcut={false}
        plugins={[colorSyntax]}
        language="ko-KR"
        hooks={{
            addImageBlobHook: async (blob, callback) => {
                const formData = new FormData();
                formData.append("image", blob);
                console.log(blob);
                console.log(formData);
                // const img = await ImageService.createPost(formData);       
                // const url = img.data[0].boardImageUrl;
    
                callback('http://localhost:5000/img/카레유.png', '');
              },
          }}
      />
    </div>
  );
}

export default Mtest;
