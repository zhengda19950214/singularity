import React, {useEffect, useState} from 'react'
import ReactQuill from "react-quill";
import './textInputArea.css'
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";
import Quill from "quill";

function uploadImage(quillEditor, imageUrl) {
    const editorSelection = quillEditor.getSelection();
    let cursorPosition = 0;
    if (editorSelection) {
        cursorPosition = editorSelection.index;
    }
    quillEditor.insertEmbed(cursorPosition, "image", imageUrl);
    quillEditor.setSelection(cursorPosition + 1);


}

const TextInputArea = ({postContent, setPostContent}) => {
    let reactQuillRef = null;
    const [modules, setModules] = useState();
    const [uploadImageWindowOpen, setUploadImageWindowOpen] = useState(false);
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = ['15px', '18px', '22px'];
    Quill.register(Size, true);

    useEffect(() => {
        const initialModules = {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline'],
                    [{'color': []},{ 'size': ['15px', '18px', '22px'] }],
                    [{'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],
                    ['image', 'video'],
                    ['formula','blockquote', 'code-block'],
                ], handlers: {
                    'image': () => setUploadImageWindowOpen(true)
                }

            }
        };
        setModules(initialModules)
    }, []);
    return (
        <div className="TextInputAreaWrapper">
            <ReactQuill
                style={{height:"230px"}}
                ref={(el) => {
                    reactQuillRef = el
                }}
                value={postContent}
                onChange={setPostContent}
                modules={modules}
                theme={"snow"} // pass false to use minimal theme
            />
            {uploadImageWindowOpen &&
            <UploadImageWindow
                fileName={"post"}
                closeWindow={setUploadImageWindowOpen}
                maxHeight={560}
                maxWidth={560}
                callback={
                    (imageUrl) => {
                        uploadImage(reactQuillRef.getEditor(), imageUrl);
                        setUploadImageWindowOpen(false);
                    }
                }
                type={"postPicture"}
            />}
        </div>
    );
};


export default TextInputArea;