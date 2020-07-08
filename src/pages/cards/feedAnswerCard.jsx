import React, {Fragment, useState} from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import './answerCard.css'

import {Link} from 'react-router-dom'
import {useVotesState} from "../hooks/answerStates";
import {useMutation} from "@apollo/react-hooks";
import {BOOKMARK_ANSWER, UN_BOOKMARK_ANSWER} from "../graphQL/userMutation";
import CloseIcon from '@material-ui/icons/Close';
import TimeAgo from 'react-timeago'
import ReactHtmlParser from 'react-html-parser';
import SharePopup from "../utils/sharePopup";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import Tooltip from "@material-ui/core/Tooltip";
import {fontSize} from "@material-ui/system";

const FeedAnswerCard = ({question, showAction, answer, profileBookmarkAnswer, bookmarked, callback}) => {
    // question is possible to be null, in that case this will be article feed card;
    const {upvote, downvote, id, upvoteStatus} = answer;
    const {thumbUp, thumbDown, toggleThumbDown, toggleThumbUp, upVotes} = useVotesState({
        upvote,
        downvote,
        id,
        upvoteStatus
    });
    const [share, setShare] = useState(false);
    const [bookmarkedIcon, setBookmarkedIcon] = useState(bookmarked);
    const [unBookmarkMutation] = useMutation(UN_BOOKMARK_ANSWER);
    const {user} = answer;
    const [postExpanded, setExpanded] = useState(false);
    const [bookmarkAnswerMutation] = useMutation(BOOKMARK_ANSWER);

    const unBookmarkAnswer = () => {
        unBookmarkMutation({variables: {answerID: answer.id}}).then(() => {
            setBookmarkedIcon(false);
            if (callback) {
                callback();
            }
        })
    };
    const bookmarkAnswer = () => {
        bookmarkAnswerMutation({variables: {answerID: answer.id}}).then(() => {
            setBookmarkedIcon(true)
        })
    };
    const expand = () => {
        setExpanded(true);
    };

    return (
        <div className="card">
            {profileBookmarkAnswer && <CloseIcon className="unBookmarkIcon" onClick={unBookmarkAnswer}/>}
            <div className="questionHeader">
                {question ?
                    <Fragment>
                        {question.topics &&
                        <div className="questionTopics">
                            {question.topics.map(topic => {
                                return (
                                    <Link key={topic.id} to={"/topic/" + topic.id}><span>#{topic.name}</span></Link>)
                            })}
                        </div>}
                        <Tooltip title={question.title}>
                          <Link to={`/question/${question.id}`} ><h3 style={{fontSize:'20px'}}>{question.title.length>70?question.title.substring(0,67)+"...":question.title}</h3></Link>
                        </Tooltip>
                        {question.school && <img id="mySchoolLabel" src={require("../../resource/my_school_label.png")}/>}
                    </Fragment> :
                    <Fragment>
                        <div className="questionTopics"/>
                        <Link to={`/article/${answer.id}`}><h3 style={{fontSize:'20px'}}>{answer.title}</h3></Link>
                    </Fragment>
                }

            </div>
            <div className="answerUserInformation">
                {user &&
                <div>
                    <Link to={"/Profile/" + user.id}><img height="40px" width="50px"
                                                          src={(user && user.thumbnail) || require('../../resource/ted.jpg')}/></Link>
                    <div className="answerUserDetail">
                        <Link to={"/Profile/" + user.id}><span>{user.firstName + ' ' + user.lastName}</span></Link>
                        {question ? <h2><TimeAgo date={answer.lastUpdated} live={false}/></h2> :
                            <h2><TimeAgo date={answer.lastUpdated} live={false}/></h2>}
                        {!user.hideUniversity && <h3>{user.university.name}</h3>}
                    </div>
                </div>
                }
            </div>
            <div className="answerContents">
                <Typography variant="body2" color="textSecondary">
                    {postExpanded && <div>{ReactHtmlParser(answer.content)}</div>}
                    {!postExpanded &&
                    <HTMLEllipsis onClick={expand} unsafeHTML={answer.content} maxLine='5' basedOn='letters'
                                  expand={expand} ellipsisHTML='...<a id="expandPostButton"> (expand)</a>'/>}
                </Typography>
            </div>
            {showAction &&
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
                        <Tooltip title="comment">
                            {question ? <Link to={`/question/${question.id}`}><TextsmsOutlinedIcon/></Link>
                                : <Link to={`/article/${answer.id}`}><TextsmsOutlinedIcon/></Link>
                            }

                        </Tooltip>
                        <span>{answer.comments.length}</span>
                    </div>
                    <Tooltip title="share">
                        <ShareRoundedIcon onClick={() => {
                            setShare(!share)
                        }}/>
                    </Tooltip>
                    {share && <SharePopup
                        url={window.location.hostname + `${question ? "/question/" + question.id : "/article/" + answer.id}`}/>}
                    {bookmarkedIcon &&
                    <Tooltip title="unbookmark answer"><BookmarkRoundedIcon onClick={unBookmarkAnswer}
                                                                            style={{color: "#FF9240"}}/></Tooltip>}
                    {!bookmarkedIcon &&
                    <Tooltip title="bookmark answer"><BookmarkBorderOutlinedIcon onClick={bookmarkAnswer}/></Tooltip>}
                </div>
            </div>
            }

        </div>
    )
};
export default FeedAnswerCard;