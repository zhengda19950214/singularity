import React from 'react'
import ReactQuill from "react-quill";
import './textInputArea.css'

class TextInputAreaTEST extends React.Component{
    constructor(props) {
        super(props);
        this.reactQuillRef = null;
        this.state = {
            uploadImageWindow: false
        }
    }

    modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline'],
                [{'color': []}, {size: []}],
                [{'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],
                ['image', 'video'],
                ['blockquote', 'code-block'],
            ],  handlers: {
                'image': ()=> this.setState({uploadImageWindow:true})
            }

        }
    };


    render() {
        return (
            <div className="TextInputAreaWrapper">
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    onChange={this.props.setPostContent}
                    placeholder={this.props.placeholder}
                    modules={this.modules}
                    theme={"snow"} // pass false to use minimal theme
                />
            </div>
        );
    }
}


export default TextInputAreaTEST;