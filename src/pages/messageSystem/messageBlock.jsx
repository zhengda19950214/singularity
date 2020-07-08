import React, {useEffect, useState} from "react";
import './messageMenu.css'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_MESSAGE_OVERVIEW, SEARCH_USER} from "../graphQL/messageQuery";
import ChatWindow from "./ChatWindow";
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

const MessageBlock = ({me, messages, setMessages, isMessageMenuOpen, openMessageMenu, createOverviewMessage, messageWindows, setMessageWindows}) => {
    let timer;

    const [unReadAmount, setUnreadAmount] = useState(0);
    const [searchUserMode, setSearchUserMode] = useState(false);
    const [searchedUser, setSearchedUser] = useState([]);
    const [getMessageOverviewQuery, {data}] = useLazyQuery(GET_MESSAGE_OVERVIEW, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            const {getMessageOverview} = data;
            if (getMessageOverview.length === 0) {
                return;
            }
            let unReads = 0;
            let updatedOldMessage = messages;
            getMessageOverview.map(newMessagesOverview => {
                const {count, message} = newMessagesOverview;
                const {from: user, content} = message;
                let isNew = true;

                if (messages) {
                    updatedOldMessage = updatedOldMessage.map(oldMessageOverview => {
                        if (oldMessageOverview.user.id === user.id) {
                            isNew = false;

                            return {
                                ...oldMessageOverview,
                                overviewMessage: content,
                                user,
                                unread: user.muted ? 0 : count
                            }
                        }
                        return oldMessageOverview;
                    });
                }
                if (isNew) {
                    updatedOldMessage = [...updatedOldMessage, {
                        user,
                        overviewMessage: content,
                        unread: user.muted ? 0 : count
                    }];
                }
                if (!user.muted) {
                    unReads += count;
                }

                setMessages(updatedOldMessage);
                localStorage.setItem("messages", JSON.stringify(updatedOldMessage));
            });
            setUnreadAmount(unReads);
        }
    });

    const [searchUserQuery, {data: userData}] = useLazyQuery(SEARCH_USER, {
        onCompleted: () => {
            const {searchUser} = userData;
            setSearchedUser(searchUser)
        }
    });
    const searchUser = (input) => {
        if (input.length === "") {
            setSearchedUser([]);
        } else {
            searchUserQuery({variables: {name: input}});
        }

    };

    useEffect(() => {
        getMessageOverviewQuery();
        timer = setInterval(() => {
            getMessageOverviewQuery();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const createMessageWindow = (user) => {
        if (!messageWindows.some(window => window.user.id === user.id)) {
            setMessageWindows([...messageWindows, {user}])
        }
    };
    const updateOverviewMessage = (userId, content) => {
        const updatedMessage = messages.map(message => {
            if (message.user.id === userId) {
                setUnreadAmount(unReadAmount - message.unread);
                return {...message, overviewMessage: content, unread: 0}
            }
            return message;
        });
        setMessages(updatedMessage);

        localStorage.setItem("messages", JSON.stringify(updatedMessage));
    };

    const closeWindow = (userId) => {
        const updateMessage = messageWindows.filter(
            message => message.user.id !== userId
        );
        setMessageWindows(updateMessage);
    };

    const deleteWindow = (userId) => {
        //close window
        closeWindow(userId);
        //delete message in local storage
        localStorage.removeItem(`message_${userId}`);
        //delete messageOverview
        const updateMessage = messages.filter(
            message => message.user.id !== userId
        );
        setMessages(updateMessage);
        localStorage.setItem("messages", JSON.stringify(updateMessage));
    };

    const toggleSearchUser = () => {
        if (!isMessageMenuOpen) {
            openMessageMenu(true);
        }
        setSearchUserMode(true);
    };
    return (
        <div className="messageBlock">
            <div style={{bottom: isMessageMenuOpen ? "250px" : "0px"}} className="messageWindow">
                <div className="messageWindowHeader">
                    {!searchUserMode ?
                        <div onClick={() => {
                            openMessageMenu(!isMessageMenuOpen);
                        }} id="toggleWindowPart">
                            <p>Message</p>
                            {
                                (unReadAmount > 0 && !isMessageMenuOpen) &&
                                <div id="unread">
                                    {unReadAmount}
                                </div>}
                        </div> :
                        <div id="toggleWindowPart">
                            <input placeholder={"Search user"} onChange={(e) => searchUser(e.target.value)}/>
                            <SearchIcon/>
                        </div>
                    }
                    {!searchUserMode && <AddCircleOutlineIcon onClick={() => {
                        toggleSearchUser()
                    }}/>}
                    {searchUserMode && <CloseIcon onClick={() => {
                        setSearchUserMode(false);
                        setSearchedUser([]);
                    }}/>}

                </div>

                <div className="messageWindowContentWrapper">
                    {searchUserMode &&
                    <div className="messageSearchUsersWrapper">
                        <div className="messageWindowSearchModeBackground" style={{opacity: "60%"}}/>
                        <div className="messageSearchUsersResults">
                            {searchedUser.map(user => (
                                <div key={user.id} className="briefMessageContent"
                                     onClick={() => {
                                         createMessageWindow(user);
                                         createOverviewMessage(user)
                                     }}>
                                    <img src={user.thumbnail}></img>
                                    <div id="text">
                                        <h1>{user.firstName} {user.lastName}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
                    <div className="messageBriefWrapper">
                        {messages.map((messageBrief, id) => {
                                const {unread, user} = messageBrief;
                                return (
                                    <div key={id} className="briefMessageContent"
                                         onClick={() => createMessageWindow(user)}>
                                        {user.thumbnail && <img src={user.thumbnail}></img>}
                                        {!user.thumbnail && <AccountCircleIcon/>}
                                        <div id="text">
                                            <h1>{user.firstName} {user.lastName}</h1>
                                            <p>{messageBrief.overviewMessage}</p>
                                        </div>
                                        {unread !== 0 &&
                                        <div id="unread">
                                            {unread}
                                        </div>
                                        }
                                    </div>)
                            }
                        )}</div>
                </div>
            </div>
            {messageWindows.map(
                messageWindow => {
                    return (
                        <ChatWindow key={messageWindow.user.id} myId={me.id} user={messageWindow.user}
                                    updateOverviewMessage={updateOverviewMessage} deleteWindow={deleteWindow}
                                    closeWindow={closeWindow}/>
                    )
                }
            )}


        </div>
    )
};
export default MessageBlock