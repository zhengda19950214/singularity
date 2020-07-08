import React from 'react'
import {useQuery} from "@apollo/react-hooks";
import {GET_ARTICLE} from "../graphQL/query";
import ArticleCard from "../cards/articleCard";
import './articlePage.css';
import CommentCard from "../cards/commentCard";
const ArticlePage = props => {
    let id = props.match.params.id;
    const {bookMarkedAnswers} = props;
    const { loading, error, data,client,refetch} = useQuery(GET_ARTICLE,{ variables: { answerID:id,orderBy:"RECENT" },});

    if (loading) return <div/>;
    if (error) return <div/>;
    const {comments} = data.getAnswer;
    return (
        <div className="questionAnswerWrapper">
            <div className="questionAnswerContent">
                <div className="articleWrapper">
                    <ArticleCard article={(data.getAnswer)} refetch={refetch} bookmarked={bookMarkedAnswers.some(answer=>answer.id === id)}/>
                </div>
                {comments.length > 0 &&
                <div className="commentsWrapper">
                    {comments.map((comment) => (
                            <div>
                                <div className="articleComment">
                                    <CommentCard comment={comment} clinet={client} refetch={refetch}/>
                                </div>
                                <div style={{width: "100%", borderBottom: "1px solid #BCBCBC"}}/>
                            </div>
                        )
                    )}
                </div>
                }
            </div>
        </div>
    );
};

export default ArticlePage;