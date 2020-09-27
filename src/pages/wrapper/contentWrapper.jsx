import React, {useState} from "react";
import {Route} from "react-router-dom";
import FeedAnswerPage from "../feedAnswers/feedAnswerPage";
import QuestionAnswers from "../questionAnswersPage/questionAnswers";
import SearchPage from "../search/searchPage";
import {AddArticle} from "../article/addArticle";
import ArticlePage from "../article/articlePage";
import TopicPage from "../topic/topicPage";
import ProfilePage from "../profile/profilePage";
import MessageBlock from "../messageSystem/messageBlock";
import Navigator from "./navigator";
import MySchoolPage from "../myschoolPage/mySchoolPage";
import Questions from "../questionsPage/questions";
import PostPage from "../posts/postPage";
import {useQuery} from "@apollo/react-hooks";
import {ME} from "../graphQL/userQuery";
import ChangePasswordPage from "../Auth/changePasswordPage";
import TutorialPage from "../tutorialPages/TutorialPage";
import NeedTutoringPopUpPage from "../tutorialPages/popUps/NeedTutoringPopUpPage";
import ICanTeachPopUpPage from "../tutorialPages/popUps/ICanTeachPopUpPage";
import TutoringApplicationPopUp from "../tutorialPages/popUps/TutoringApplicationPopUp";
import MySchoolTutorial from "../tutorial/mySchoolTutorial";
import TutoringTutorial from "../tutorial/tutoringTutorial";

const ContentWrapper = () => {
    const [selectedPage, setSelectedPage] = useState("Home");
    const {loading, error, data, refetch} = useQuery(ME,{fetchPolicy: "network-only"});

    const [messageWindows, setMessageWindows] = useState([]);
    const [popUpWindow, setPopUpWindow] = useState(undefined);
    const [setGreyCover] = useState(false);
    const [applyTutorPost, setApplyTutorPost] = useState();
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || []);
    const [isMessageMenuOpen, openMessageMenu] = useState(false);
    const [popUpCallBackFunction, setPopUpCallBackFunction] = useState();

    const setPopUpWindowType = (type) => {
        if(popUpWindow === type){
            setPopUpWindow(undefined);
        }
        else{
            if(popUpWindow){
                setPopUpWindow(undefined);
            }
            else{
                setPopUpWindow(type);
            }
        }
    };
    if (loading) return <div/>;

    if (error) {

        return <div/>}


    const createOverviewMessage = (user) => {
        if(messages.some(message=>(message.user.id === user.id))){
            return;
        }
        const updatedMessage = [{user, overviewMessage: "", unread: 0},...messages];
        setMessages(updatedMessage);

        localStorage.setItem("messages", JSON.stringify(updatedMessage));
    };

    const openSpecificUserWindow = user => {
        createOverviewMessage(user);
        if (!messageWindows.some(window => window.user.id === user.id)) {
            setMessageWindows([...messageWindows, {user}])
        }
        openMessageMenu(true)
    };

    const {me} = data;
    return (
        <div>
            {popUpWindow &&
            <div>
                <div onClick={()=>setPopUpWindowType(undefined)} className="greyOutCoverBackground">
                </div>
                {
                    (popUpWindow === "postQuestion") &&
                    <PostPage
                        setPopUpWindowType={setPopUpWindowType}
                        universityId={me.university.id}
                        type="question"
                    />
                }
                {
                    (popUpWindow === "iNeedTutoring") &&
                    <NeedTutoringPopUpPage  setPopUpWindow={setPopUpWindow}/>
                }
                {
                    (popUpWindow === "iCanTeach") &&
                    <ICanTeachPopUpPage tutorCard={me.tutorCard}/>
                }
                {
                    (popUpWindow === "applyTutoringPost") &&
                    <TutoringApplicationPopUp setPopUpWindow={setPopUpWindow} tutorPost={applyTutorPost} tutorCard={me.tutorCard} popUpCallBackFunction={popUpCallBackFunction}/>
                }
                {
                    (popUpWindow === "schoolTutorial") &&
                    <MySchoolTutorial/>
                }
                {
                    (popUpWindow === "tutoringTutorialPopup") &&
                    <TutoringTutorial/>
                }
            </div>
            }


            <Navigator me={me} setPopUpWindow={setPopUpWindowType} selectedPage={selectedPage} greyOutCover={popUpWindow}/>
            <div className="contentWrapper">


                <Route exact path="/">
                    <FeedAnswerPage bookMarkedAnswers={me.bookmarkedAnswers} setSelectedPage={setSelectedPage} me={me}/>
                </Route>
                <Route exact path="/Tutoring">
                    <TutorialPage
                        setSelectedPage={setSelectedPage}
                        setPopUpWindowType={setPopUpWindowType}
                        setApplyTutorPost={setApplyTutorPost}
                        me={me}
                        openSpecificUserWindow={openSpecificUserWindow}
                        setPopUpCallBackFunction={setPopUpCallBackFunction}
                    />
                </Route>
                <Route path="/MySchool">
                    <MySchoolPage setSelectedPage={setSelectedPage} bookMarkedAnswers={me.bookmarkedAnswers} setPopUpWindowType={setPopUpWindowType}/>
                </Route>
                <Route path="/answer">
                    <Questions setGreyCover={setGreyCover} followedQuestions={me.followedQuestions} setSelectedPage={setSelectedPage} me={me}/>
                </Route>
                <Route
                    path="/question/:id"
                    render={(props) => <QuestionAnswers {...props} me={me} setGreyCover={setGreyCover} setSelectedPage={setSelectedPage}/>} />
                <Route
                    path="/searchPage/:searchString"
                    render={(props) => <SearchPage {...props} setSelectedPage={setSelectedPage}  bookMarkedAnswers={me.bookmarkedAnswers}/>} />
                <Route
                    path="/addArticle"
                    render={(props) => <AddArticle {...props} university={me.university.id}/>} />
                <Route
                    path="/article/:id"
                    render={(props) => <ArticlePage {...props} bookMarkedAnswers={me.bookmarkedAnswers} />}/>
                <Route
                    path="/Topic/:topicName"
                    render={(props) => <TopicPage {...props}  bookMarkedAnswers={me.bookmarkedAnswers} />} />
                <Route
                  path="/Profile/:userId"
                  render={(props) => <ProfilePage {...props} me={me} refetchMe={refetch} createOverviewMessage={createOverviewMessage} openMessageMenu={openMessageMenu}/>} />
                <Route exact path="/Home">
                    <FeedAnswerPage bookMarkedAnswers={me.bookmarkedAnswers} setSelectedPage={setSelectedPage} me={me}/>
                </Route>
                <Route exact path="/ChangePassword">
                    <ChangePasswordPage  setSelectedPage={setSelectedPage}/>
                </Route>
                <div className="messageWrapper">
                    <MessageBlock
                        me={me}
                        messages={messages}
                        setMessages={setMessages}
                        isMessageMenuOpen={isMessageMenuOpen}
                        openMessageMenu={openMessageMenu }
                        createOverviewMessage={createOverviewMessage}
                        messageWindows={messageWindows}
                        setMessageWindows={setMessageWindows}
                    />
                </div>
            </div>
        </div>
    )
};
export default ContentWrapper;