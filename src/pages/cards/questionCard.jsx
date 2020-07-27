import React, {useState} from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import {ANSWER_QUESTION, DELETE_MY_QUESTION} from "../graphQL/mutations";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import Button from '@material-ui/core/Button';
import {FOLLOW_QUESTION, UNFOLLOW_QUESTION} from "../graphQL/userMutation";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";
import ReportWindow from "../utils/reportWindow";
import SearchIcon from '@material-ui/icons/Search';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import ReactHtmlParser from "react-html-parser";
import TextInputArea from "../posts/textInputArea";
import Tooltip from "@material-ui/core/Tooltip";
import {SEARCH_USER} from "../graphQL/messageQuery";
import {SEND_MESSAGE} from "../graphQL/messageMutation";
import '../tutorialPages/TutoringApplicationContent.css'
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {ME} from "../graphQL/userQuery";
import './answerCard.css'
import DeleteOutlineRounded from "@material-ui/icons/DeleteOutlineRounded";

const QuestionCard = ({question, addAnswer, feedCard, followed,me}) => {
    const {user} = question;
    const [answerMode, toggleAnswerButton] = useState(false);
    const [highLightFollowIcon, setHighLightFollowIcon] = useState(followed);
    const [editorState, setEditorState] = useState("");
    const [answerQuestion] = useMutation(ANSWER_QUESTION);
    const [followQuestionMutation] = useMutation(FOLLOW_QUESTION);
    const [unFollowQuestionMutation] = useMutation(UNFOLLOW_QUESTION);
    const [sendMessageMutation] = useMutation(SEND_MESSAGE);
    const [postExpanded,setExpanded] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [searchedUser, setSearchedUser] = useState([]);
    const [inviteUserMode, setInviteUserMode] = useState(false);

    const [deletePopupWindow, setDeletePopupWindow] = useState(false);
    const meMe = useQuery(ME);
    const myID = meMe.data.me.id;
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const [deleteMyQuestion] = useMutation(DELETE_MY_QUESTION);
    const deleteQuestion = () => {
        deleteMyQuestion({variables: {questionID: question.id}}).then(
            () => {
                setDeletePopupWindow(false);
                window.open('/home','_self')
            }
        )
    };

    const [searchUserQuery, {data:userData}] = useLazyQuery(SEARCH_USER, {
        onCompleted: () => {
            const {searchUser} = userData;
            setSearchedUser(searchUser)
        }
    });
    const [report, setReport] = useState(false);


    const followQuestion = () => {
        followQuestionMutation({variables: {questionID: question.id}}).then(() => {
            setHighLightFollowIcon(true);
        })
    };
    const unFollowQuestion = () => {
        unFollowQuestionMutation({variables: {questionID: question.id}}).then(() => {
            setHighLightFollowIcon(false);})
    };
    const expand = ()=>{
        setExpanded(true);
    };
    const searchUser = (input) => {
        if(input.length === ""){
            setSearchedUser([]);
        }
        else{
            searchUserQuery({variables:{name:input}});
        }

    };
    const invitationMessage = `${me.firstName} ${me.lastName} has invited you to answer this question: \n 
    ${window.location.hostname}/question/${question.id}`;
    const sendInvitation = (userId) => {
        sendMessageMutation({variables: {from: me.id, to: userId, content: invitationMessage}}).then(
            res => {
                if (res.data) {
                    setInviteUserMode(false);
                }
            }
        )
    };

    const onPost = () => {
        if (answerMode) {
            if (editorState === "") {
                setShowWarning(true);
            } else {
                answerQuestion({variables: {questionId: question.id, answerContent: editorState}}).then((result) => {
                    setEditorState('');
                    addAnswer(result.data.createAnswer)
                });
                toggleAnswerButton(!answerMode);
                setShowWarning(false);

            }
        } else {
            toggleAnswerButton(!answerMode);
        }
    };


    return (
        <div className="card">
            <div className="questionHeader">
                {
                    deletePopupWindow &&
                    <div className="tutorPostConfirmationPopUpWindow" style={{display:"block"}}>
                        <h3 style={{height:'22px'}}>Delete?</h3>
                        <p style={{height: "40px", marginTop:'15px',marginBottom:'15px'}}>Are you sure you want to delete this? <span
                            style={{fontWeight: "bold"}}>This action cannot be undone.</span></p>
                        <div className="dealPopupWindowActions" style={{width:'341px'}}>
                            <Button id="popUpSecondaryButton" onClick={() => {
                                setDeletePopupWindow(false)
                            }}>Cancel</Button>
                            <Button id="popUpPrimaryButton" onClick={deleteQuestion}>Delete</Button>
                        </div>
                    </div>
                }
                <div className="questionTopics">
                    {question.topics.map(topic => {
                        return (<Link key={topic.id} to={"/topic/"+topic.id}><span>#{topic.name}</span></Link>)
                    })}
                </div>
                <div className="tutorialTitle">
                   <h3>{question.title}</h3>
                    {(question.user.id == myID) && (<div className="cardToolWrapper">
                        <DeleteOutlineRounded onClick={() => setDeletePopupWindow(true)} className="cardToolIcon"/>
                    </div>)

                    }
                </div>
                {user && <div><p>post by</p>
                    {question.anonymous ?<p style={{color: '#FF9240', marginLeft: '0.5%'}}>Anonymous user</p>
                        : <Link to={"/Profile/"+ user.id}><p style={{color: '#FF9240', marginLeft: '0.5%'}}>{user.firstName + ' ' + user.lastName}</p></Link>}
                    <p style={{marginLeft: '0.5%'}}><TimeAgo date={question.lastUpdated} live={false}/></p>
                </div>}

            </div>
            <div className="questionDescription">
                {postExpanded && <div>{ReactHtmlParser(question.description)}</div>}
                {!postExpanded &&<HTMLEllipsis onClick={expand} unsafeHTML={question.description} maxLine ='5' basedOn='letters' expand={expand} ellipsisHTML='...<a id="expandPostButton"> (expand)</a>'/>}
            </div>
            {answerMode &&
            <div className="answerInputArea">
                <TextInputArea postContent={editorState} setPostContent={(e)=>{setEditorState(e)}}/>
                {showWarning && <h2>Please enter your answer</h2>}
            </div>}
            <div className='questionActions'>
                {!highLightFollowIcon && <Tooltip title="follow question"><StarBorderIcon onClick={followQuestion}/></Tooltip>}
                {highLightFollowIcon && <Tooltip title="unfollow question"><StarRoundedIcon onClick={unFollowQuestion} style={{color: "#FF9240"}}/></Tooltip>}
                <Tooltip title="invite friend"><EmojiPeopleIcon id="inviteIcon" onClick={()=>{setInviteUserMode(!inviteUserMode)}}/></Tooltip>
                {
                    inviteUserMode &&
                    <div className="inviteFriendWrapper">
                        <div className="searchUsersWrapper">
                            <input placeholder={"Search user"} onChange={(e)=>searchUser(e.target.value)}/>
                            <SearchIcon/>
                            <div className="searchUsersResults">
                                {searchedUser.map(
                                    user=>(
                                        <div key={user.id} onClick={()=>sendInvitation(user.id)} className="briefMessageContent">
                                            <img src={user.thumbnail}/>
                                            <div id="text">
                                                <h1>{user.firstName} {user.lastName}</h1>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                }
                <Tooltip title="report"><FlagOutlinedIcon onClick={() => {
                    setReport(true);
                }}/></Tooltip>
                {report &&

                    <ReportWindow user={user} reportContent={`We have received a report on this question /question/${question.id}`} closeWindow={() => {
                    setReport(false)
                }}/>}
                <div className="postButton">
                    {feedCard &&
                    <Link to={`/question/${question.id}`}><Button onClick={onPost}>
                        <span style={{textDecoration: "none"}}>Answer</span>
                    </Button> </Link>}
                    {!feedCard && <Button onClick={onPost}>
                        <span>{answerMode ? "Post" : "Answer"}</span>
                    </Button>}

                </div>
                {answerMode && <p onClick={() => toggleAnswerButton(!answerMode)}>cancel</p>}
            </div>
        </div>
    );
};


export default QuestionCard;