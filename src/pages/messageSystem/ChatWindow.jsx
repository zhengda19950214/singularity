import React, {useEffect, useRef, useState, Fragment} from 'react'
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {GET_MESSAGES, GET_USER_FOR_MESSAGE} from "../graphQL/messageQuery";
import {
    BLOCK_USER,
    MUTE_USER,
    SEND_MESSAGE,
    UNBLOCK_USER,
    UNMUTE_USER,
    UPDATE_MESSAGE
} from "../graphQL/messageMutation";
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReportWindow from "../utils/reportWindow";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const leftStyle = {float: "left", position: "relative", left: "20px", background: "#bcbcbc"};

const rightStyle = {float: "right", position: "relative", right: "10px", background: "rgba(255, 146, 64, 0.21)"};
const ChatWindow = ({user, myId, updateOverviewMessage, closeWindow, deleteWindow}) => {
    const [isMessageBlockOpen, openMessageBlock] = useState(true);
    const [updateMessage] = useMutation(UPDATE_MESSAGE);
    const [sendMessageMutation] = useMutation(SEND_MESSAGE);
    const [muteUser] = useMutation(MUTE_USER);
    const [unMuteUser] = useMutation(UNMUTE_USER);
    const [blockUser] = useMutation(BLOCK_USER);
    const [unBlockUser] = useMutation(UNBLOCK_USER);
    const [messages, setMessage] = useState(JSON.parse(localStorage.getItem(`message_${user.id}`)) || []);
    const [newMessage, setNewMessage] = useState("");
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const [report, setReport] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);
    let timer;
    const [getUserQuery, {data: user_data}] = useLazyQuery(GET_USER_FOR_MESSAGE, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            if (user_data) {
                setUpdatedUser(user_data.getUser);
            }
        }
    });
    const dummyBottomRef = useRef(null);
    const [getMessageQuery, {data}] = useLazyQuery(GET_MESSAGES, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            const {getMessages} = data;
            if (getMessages.length === 0) {
                return;
            }

            getMessages.map(
                // eslint-disable-next-line array-callback-return
                message => {
                    updateMessage({variables: {messageID: message.id}}).then(
                        res => {
                            if (res) {
                                return {...message, myMessage: false}
                            } else {
                                alert("something went wrong");
                            }
                        }
                    )
                }
            );
            const updatedMessage = messages.concat(getMessages);
            updateOverviewMessage(user.id, getMessages[0].content);
            setMessage(updatedMessage);
            localStorage.setItem(`message_${user.id}`, JSON.stringify(updatedMessage));
        }
    });
    useEffect(() => {
        getMessageQuery({variables: {from: user.id}});
        dummyBottomRef.current.scrollIntoView({behavior: "smooth"});
        getUserQuery({variables: {userID: user.id}});
        timer = setInterval(() => {
            getMessageQuery({variables: {from: user.id}});
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    useEffect(
        () => {
            dummyBottomRef.current.scrollIntoView({behavior: "smooth"});
        }, [messages]
    );
    const sendMessage = (e) => {
        if (e.keyCode === 13 && newMessage.length !== 0) {
            sendMessageMutation({variables: {from: myId, to: user.id, content: newMessage}}).then(
                res => {
                    if (res.data) {
                        setNewMessage("");
                        const updatedMessage = [...messages, {content: newMessage, myMessage: true}];
                        updateOverviewMessage(user.id, newMessage);
                        setMessage(updatedMessage);
                        localStorage.setItem(`message_${user.id}`, JSON.stringify(updatedMessage));
                    }
                }
            )
        }
    };
    const toggleMute = () => {
        if (updatedUser.muted) {
            unMuteUser({variables: {mutedUserID: user.id}}).then(
                (res) => {
                    if (res) {
                        setUpdatedUser({...updatedUser, muted: false});
                    }
                }
            )
        } else {
            muteUser({variables: {userIDToMute: user.id}}).then(
                (res) => {
                    if (res) {
                        setUpdatedUser({...updatedUser, muted: true});
                    }
                }
            )

        }
    };

    const toggleBlock = () => {
        if (updatedUser.blocked) {
            unBlockUser({variables: {blockedUserID: user.id}}).then(
                (res) => {
                    if (res) {
                        setUpdatedUser({...updatedUser, beingBlocked: false});
                    }
                }
            )
        } else {
            blockUser({variables: {userIDToBlock: user.id}}).then(
                (res) => {
                    if (res) {
                        setUpdatedUser({...updatedUser, beingBlocked: true});
                    }
                }
            )

        }
    };
    return (
        <Fragment>
            {report && <ReportWindow
                reportContent={`We have received an report about a user for sending message, userId is ${user.id}`}
                user={user}
                closeWindow={() => {
                    setReport(false)
                }}/>}
        <div style={{bottom: isMessageBlockOpen ? "250px" : "0px"}} className="messageWindow">
            <div className="messageWindowHeader">
                <div onClick={() => {
                    openMessageBlock(!isMessageBlockOpen);

                    setToolWindowOpen(false);
                }} style={{width: "75%", float: "left", height: "100%"}}>
                    <p>{user.firstName} {user.lastName}</p>
                </div>
                <MoreVertIcon onClick={() => {
                    openMessageBlock(true);
                    setToolWindowOpen(!toolWindowOpen)
                }} id="toolIcon"/>

                <CloseIcon id="close" onClick={() => {
                    closeWindow(user.id)
                }}/>
                {toolWindowOpen &&
                <div className="cardToolWindow" style={{left: "100px", top: "5px"}}>
                    <div onClick={() => {
                        setReport(true)
                    }} className="topicToolWindowSubSection">
                        <p>Report</p>
                    </div>
                    <div onClick={toggleMute} className="topicToolWindowSubSection">
                        <p>{updatedUser.muted ? "Unmute" : "Mute"}</p>
                    </div>
                    <div onClick={toggleBlock} className="topicToolWindowSubSection">
                        <p>{updatedUser.beingBlocked ? "Unblock" : "Block"}</p>
                    </div>
                    <div onClick={() => {
                        deleteWindow(user.id)
                    }} className="topicToolWindowSubSection">
                        <p>Delete</p>
                    </div>

                </div>}
            </div>
            <div className="chatWindowContentWrapper">
                <div style={{minHeight: "85%", display: "block", overflow: "auto"}}>
                    {messages.map(message => (
                        <div className="messageContentWrapper" style={{float: message.myMessage ? "right" : "left"}}>
                            {!message.myMessage &&
                            <a href={"/Profile/" + user.id}>{user.thumbnail ? <img src={user.thumbnail}/> :
                                <AccountCircleIcon/>}</a>}
                            <div className="messageContent" style={message.myMessage ? rightStyle : leftStyle}>
                                <p>{message.content}</p></div>
                        </div>
                    ))}</div>
                <div ref={dummyBottomRef}/>
            </div>
            <div className="messageInputWrapper">
                <input placeholder={updatedUser.blocked ? "You have been blocked" : "Type your message"}
                       disabled={updatedUser.blocked} value={newMessage} onChange={e => setNewMessage(e.target.value)}
                       onKeyDown={sendMessage}>
                </input>
            </div>
        </div>
        </Fragment>
    )
};
export default ChatWindow;