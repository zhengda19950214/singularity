import React, {useState} from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import {useVotesState} from "../hooks/answerStates";
import Button from "@material-ui/core/Button";
import {useCommentState} from "../hooks/commentStates";
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import './commentCard.css'
import {useMutation} from "@apollo/react-hooks";
import {CREATE_REPLY} from "../graphQL/mutations";
import TimeAgo from "react-timeago";
import ReplyContent from "./replyContent";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReportWindow from "../utils/reportWindow";
import ReactHtmlParser from "react-html-parser";

const CommentCard = ({comment}) => {
    const [replies, setReplies] = useState(comment.replies);
    const {user, upvote, downvote, id, upvoteStatus} = comment;
    const {thumbUp, thumbDown, toggleThumbDown, toggleThumbUp, upVotes} = useVotesState({
        upvote,
        downvote,
        id,
        upvoteStatus
    });
    const [commentHeight, setCommentHeight] = useState('30px');
    const [repliesExpanded, setRepliesExpanded] = useState(false);
    const [createReply] = useMutation(CREATE_REPLY);
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const {commentContent, commentMode, setCommentContent, setCommentMode, emptyCommentError, setEmptyCommentError} = useCommentState();
    const [report, setReport] = useState(false);
    const sendReply = () => {
        if (commentContent === '') {
            setEmptyCommentError(true)
        } else {
            createReply({variables: {commentID: comment.id, content: commentContent, replyTo: null}}).then(
                (result) => {
                    const {data: {createReply}} = result;
                    setReplies([createReply, ...replies]);
                    setRepliesExpanded(true);
                    setCommentContent('');
                    setCommentMode(false);

                }
            )
        }

    };
    comment.content.replace('\n', '<br/>');
    return (
        <div>
            <div className="answerUserInformation">
                <img height="40px" width="50px" src={user.thumbnail || require('../../resource/ted.jpg')}/>
                <div className="answerUserDetail">
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <h2><TimeAgo date={comment.dateCommented} live={false}/></h2>

                    {!user.hideUniversity && <h3>{user.university.name}</h3>}
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
                        {report && <ReportWindow
                            reportContent={`We have received a report on comment with id ${comment.id}`}
                            reportType='Comment'
                            user={user} closeWindow={() => {
                            setReport(false)
                        }}/>}
                    </div>}
                </div>
            </div>
            <div className="commentContent">
                <p>{ReactHtmlParser(comment.content.replace(/\n/g, ' <br/>'))} </p>
            </div>
            <div className="answerActions">
                <div className="thumbWrapper">
                    {!thumbUp && <ThumbUpAltOutlinedIcon onClick={toggleThumbUp}/>}
                    {thumbUp && <ThumbUpIcon onClick={toggleThumbUp} style={{color: "#FF9240"}}/>}
                    <span>{upVotes}</span>
                </div>
                {!thumbDown && <ThumbDownAltOutlinedIcon onClick={() => toggleThumbDown(id)}/>}
                {thumbDown &&
                <ThumbDownAltOutlinedIcon onClick={() => toggleThumbDown(id)} style={{color: "#FF9240"}}/>}
                <div className="rightCommentActions">
                    <ReplyRoundedIcon onClick={() => setCommentMode(!commentMode)}/>
                </div>
            </div>
            {commentMode &&
            <div className="commentInputArea">
                <textarea style={{height: commentHeight}} onChange={
                    e => {
                        setCommentContent(e.target.value);
                        setCommentHeight(e.target.scrollHeight + 2 + 'px')
                    }
                } placeholder="Write your reply"/>
                <Button
                    onClick={sendReply}
                >
                    <span>{"Send"}</span>
                </Button>
                {emptyCommentError && <h2>Please enter reply before send.</h2>}
            </div>}
            {replies.length > 0 &&
            <div className="repliesWrapper">
                {!repliesExpanded && <div className="expandRepliesButton">
                    <p onClick={() => setRepliesExpanded(true)}>view all the replies</p>
                </div>}
                {repliesExpanded &&
                <div className="repliesContent">
                    {replies.map(reply => (
                        <ReplyContent key={reply.id} commentId={comment.id} reply={reply} addReply={(newReply) => {
                            setReplies([newReply, ...replies])
                        }}/>
                    ))}
                </div>}
            </div>}
        </div>
    );
};

export default CommentCard;