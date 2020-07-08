import React from "react";
import './addArticle.css'
import PostPage from "../posts/postPage";

export const AddArticle = ({university}) => {
    return (
        <div className="AddArticleWrapper">
            <div className="addArticleFormWrapper">
                <PostPage type="article" universityId={university}/>
            </div>
        </div>
    )
};
