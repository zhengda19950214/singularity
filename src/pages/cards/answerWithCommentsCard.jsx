import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import CommentCard from "./commentCard";
import './answerCard.css'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import {useVotesState} from '../hooks/answerStates'
import {useCommentState} from "../hooks/commentStates";
import Button from "@material-ui/core/Button";
import {SEND_COMMENT} from "../graphQL/mutations";
import {useMutation} from "@apollo/react-hooks";
import TimeAgo from "react-timeago";
import SharePopup from "../utils/sharePopup";
import BookmarkRoundedIcon from "@material-ui/icons/BookmarkRounded";
import {BOOKMARK_ANSWER, UN_BOOKMARK_ANSWER} from "../graphQL/userMutation";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReportWindow from "../utils/reportWindow";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const AnswerWithCommentsCard = ({answer, bookmarked,questionId }) => {
    const {upvote, downvote, id, upvoteStatus} = answer;
    const [share, setShare] = useState(false);
    const [comments, setComments] = useState(answer.comments);
    const {thumbUp, thumbDown, toggleThumbDown, toggleThumbUp, upVotes} = useVotesState({
        upvote,
        downvote,
        id,
        upvoteStatus
    });
    const {commentContent, commentMode, setCommentContent, setCommentMode, emptyCommentError, setEmptyCommentError} = useCommentState();
    const [commentHeight, setCommentHeight] = useState('30px');
    const [sendCommentMutation] = useMutation(SEND_COMMENT);
    const [bookmarkedIcon, setBookmarkedIcon] = useState(bookmarked);
    const [unBookmarkMutation] = useMutation(UN_BOOKMARK_ANSWER);
    const [bookmarkAnswerMutation] = useMutation(BOOKMARK_ANSWER);
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const [report, setReport] = useState(false);


    const {user} = answer;
    const thumbnailUrl = user.thumbnail || require('../../resource/ted.jpg');
    const sendComment = () => {
        if (commentContent === '') {
            setEmptyCommentError(true)
        } else {
            sendCommentMutation({variables: {answerId: answer.id, commentContent}}).then(
                (result) => {
                    const {data:{createComment}} = result;
                    setComments([createComment, ...comments])
                }
            );
            setEmptyCommentError(false);
            setCommentMode(false);
        }
    };
    const unBookmarkAnswer = () => {
        unBookmarkMutation({variables: {answerID: answer.id}}).then(() => {
            setBookmarkedIcon(false)
        })
    };
    const bookmarkAnswer = () => {
        bookmarkAnswerMutation({variables: {answerID: answer.id}}).then(() => {
            setBookmarkedIcon(true)
        })
    };

    return (
        <div className="card">
            <div className="answerUserInformation">
                <Link to={'/Profile/' + user.id}><img height="40px" width="50px" src={thumbnailUrl}/></Link>
                <div className="answerUserDetail">
                    <Link to={'/Profile/' + user.id}> <span>{user.firstName + ' ' + user.lastName}</span></Link>
                    <h2><TimeAgo date={answer.lastUpdated} live={false}/></h2>

                    {!user.hideUniversity&&<h3>{user.university.name}</h3>}
                </div>
                <div className="cardToolWrapper">
                    <MoreVertIcon onClick={() => {
                        setToolWindowOpen(!toolWindowOpen)
                    }} className="cardToolIcon"/>
                    {toolWindowOpen &&
                    <div className="cardToolWindow">
                        <div onClick={() => {
                            setReport(true)
                        }} className="topicToolWindowSubSection">
                            <p>Report</p>
                        </div>
                        {report && <ReportWindow user={user} reportContent={`We have received a report on this question /question/${questionId}` }
                                                 reportType={'Answer'}
                                                 closeWindow={() => {
                            setReport(false)
                        }}/>}
                    </div>}
                </div>

            </div>
            <div className="answerContents">
                <Typography variant="body2" color="textSecondary">
                    <div dangerouslySetInnerHTML={{__html: answer.content}}/>
                </Typography>
            </div>
            <div className="answerActions">
                <div className="thumbWrapper">
                    {!thumbUp && <Tooltip title="like"><ThumbUpAltOutlinedIcon onClick={toggleThumbUp}/></Tooltip>}
                    {thumbUp &&
                    <Tooltip title="like"><ThumbUpIcon onClick={toggleThumbUp} style={{color: "#FF9240"}}/></Tooltip>}
                    <span>{upVotes}</span>
                </div>
                {!thumbDown && <Tooltip title="unlike"><ThumbDownAltOutlinedIcon onClick={toggleThumbDown}/></Tooltip>}
                {thumbDown &&
                <Tooltip title="unlike"><ThumbDownAltOutlinedIcon onClick={toggleThumbDown} style={{color: "#FF9240"}}/></Tooltip>}
                <div className="rightAnswerActions">
                    <div className="commentsIconWrapper">
                        <Tooltip title="comment"><AddCommentOutlinedIcon onClick={() => setCommentMode(!commentMode)}/></Tooltip>
                        <span>{answer.comments.length}</span>
                    </div>
                    <Tooltip title="share">
                        <ShareRoundedIcon onClick={() => {
                            setShare(!share)
                        }}/>
                    </Tooltip>
                    {share && <SharePopup url={window.location.href}/>}
                    {bookmarkedIcon &&
                    <Tooltip title="unbookmark answer"><BookmarkRoundedIcon onClick={unBookmarkAnswer}
                                                                            style={{color: "#FF9240"}}/></Tooltip>}
                    {!bookmarkedIcon &&
                    <Tooltip title="bookmark answer"><BookmarkBorderOutlinedIcon onClick={bookmarkAnswer}/></Tooltip>}
                </div>
            </div>
            {commentMode &&
            <div className="commentInputArea" contentEditable="true">
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

            {comments && comments.length >= 1 && (
                <div className="commentsForAnswer">
                    {comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <CommentCard comment={comment}/>
                        </div>)
                    )}
                </div>
            )}
        </div>
    );
};

export default AnswerWithCommentsCard