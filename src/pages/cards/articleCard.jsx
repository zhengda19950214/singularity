import React, {useState} from 'react'
import {COMMENT_ARTICLE} from "../graphQL/mutations";
import {useMutation} from "@apollo/react-hooks";import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import {useVotesState} from "../hooks/answerStates";
import './articleCard.css'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import Button from "@material-ui/core/Button";
import {useCommentState} from "../hooks/commentStates";
import TimeAgo from "react-timeago";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import {BOOKMARK_ANSWER, UN_BOOKMARK_ANSWER} from "../graphQL/userMutation";
import Tooltip from "@material-ui/core/Tooltip";
const ArticleCard = ({article,refetch,bookmarked}) => {
    const {user} = article;
    const {upvote,downvote,id,upvoteStatus} = article;
    const [commentHeight, setCommentHeight] = useState('40px');
    const {thumbUp,thumbDown,toggleThumbDown,toggleThumbUp,upVotes} = useVotesState({upvote,downvote,id,upvoteStatus});
    const {commentContent,commentMode,setCommentContent,setCommentMode,emptyCommentError,setEmptyCommentError} = useCommentState();
    const [bookmarkAnswerMutation] = useMutation(BOOKMARK_ANSWER);
    const [unBookmarkMutation] = useMutation(UN_BOOKMARK_ANSWER);
    const [sendCommentMutation] = useMutation(COMMENT_ARTICLE);
    const [bookmarkedIcon, setBookmarkedIcon] = useState(bookmarked);
    const unBookmarkAnswer = () => {
        unBookmarkMutation({variables: {answerID: article.id}}).then(() => {
            setBookmarkedIcon(false);
        })
    };
    const bookmarkAnswer = () => {
        bookmarkAnswerMutation({variables: {answerID: article.id}}).then(() => {
            setBookmarkedIcon(true)
        })
    };
    const sendComment = () => {
        if (commentContent === ''){
            setEmptyCommentError(true)
        }
        else{
            sendCommentMutation({ variables: { answerID:article.id,commentContent}}).then(
                ()=>{
                    refetch()
                }
            );
            setEmptyCommentError(false);
            setCommentMode(false);
        }
    };
    return (
        <div className="card">
            <div className="questionHeader" style={{marginBottom:'20px'}}>
                <h3>{article.title}</h3>
            </div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={user.thumbnail||require('../../resource/profile.svg')}/>
                { user &&
                <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2><TimeAgo date={article.lastUpdated} live={false}/></h2>
                    <h3>{user.university.name}</h3>
                </div>
                }
            </div>
            <div className="articleContent">
                <HTMLEllipsis unsafeHTML={article.content} maxLine = '500'/>
            </div>
            <div className="articleTopicWrapper">
            </div>
            <div className="answerActions">
                <div className="thumbWrapper">
                    {!thumbUp && <ThumbUpAltOutlinedIcon onClick={()=>toggleThumbUp(id)}/>}
                    {thumbUp && <ThumbUpIcon onClick={()=>toggleThumbUp(id)} style={{color: "#FF9240"}}/>}
                    <span>{upVotes}</span>
                </div>
                {!thumbDown && <ThumbDownAltOutlinedIcon onClick={toggleThumbDown}/>}
                {thumbDown && <ThumbDownAltOutlinedIcon onClick={toggleThumbDown} style={{color: "#FF9240"}}/>}
                <div className="rightAnswerActions">
                    <div className="commentsIconWrapper">
                        <AddCommentOutlinedIcon onClick={()=>setCommentMode(!commentMode)}/>
                        <span>{article.comments.length}</span>
                    </div>
                    <ShareRoundedIcon/>
                    {bookmarkedIcon &&
                    <Tooltip title="unbookmark answer"><BookmarkRoundedIcon onClick={unBookmarkAnswer}
                                                                            style={{color: "#FF9240"}}/></Tooltip>}
                    {!bookmarkedIcon &&
                    <Tooltip title="bookmark answer"><BookmarkBorderOutlinedIcon onClick={bookmarkAnswer}/></Tooltip>}
                </div>
            </div>
            {commentMode &&
            <div className="commentInputArea">
                                <textarea style={{height: commentHeight}} onChange={e => {
                                    setCommentContent(e.target.value);
                                    setCommentHeight(e.target.scrollHeight + 2 + 'px')
                                }
                                } placeholder="Write your comment"/>
                <Button onClick={sendComment}>
                    <span>{"Send"}</span>
                </Button>
                {emptyCommentError && <h2>Please enter comment before send.</h2>}
            </div>}


        </div>
    );
};


export default ArticleCard;