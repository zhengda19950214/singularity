import {useState} from "react";

export const useCommentState = ()=>{
    const [commentContent, setCommentContent] = useState('');
    const [commentMode, setCommentMode] = useState(false);
    const [emptyCommentError,setEmptyCommentError] = useState(false);


    return {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError};
};
