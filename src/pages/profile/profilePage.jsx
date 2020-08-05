import React, {useState} from "react";
import './profilePage.css'
import ProfileCard from "./profileCard";
import ProfileHomePage from "./profileHomePage";
import ProfileBookmarkPage from "./profileBookmarkPage";
import ProfileFollowingPage from "./profileFollowingPage";
import ProfileFollowingTopic from "./propfileFollowingTopic";
import ProfileEducationPage from "./profileEducationPage";
import ProfileQuestionsPage from "./profileQuestionsPage";
import ProfileSettingPage from "./profileSettingPage";
import {useQuery} from "@apollo/react-hooks";
import {USER_INFORMATION} from "../graphQL/userQuery";
const ProfilePage = props => {
    let userID = props.match.params.userId;
    const {me,refetchMe,createOverviewMessage,openMessageMenu} = props;
    const [visitorMode,setVisitorMode] = useState(userID !== me.id);
    const [selectedTopic, setSelectedTopic] = useState("Profile");
    const {loading, error, data,refetch} = useQuery(USER_INFORMATION,{variables:{userID},fetchPolicy: "network-only"});

    if(loading) return <div/>;
    if(error) return <div/>;
    const {getUser:user} = data;
    const selectTopic = (topic) => {
        setSelectedTopic(topic);
    };

    return (
        <div className="profilePageWrapper">
            <div className="profileWrapper">
                <div className="profileHeader">
                    <ProfileCard
                        userInformation={user}
                        isMe={userID === me.id}
                        toggleVisitorMode={()=>{setVisitorMode(!visitorMode);setSelectedTopic('Profile')}}
                        visitorMode={visitorMode}
                        refetchMe={refetchMe}
                        createOverviewMessage={createOverviewMessage}
                        openMessageMenu={openMessageMenu}
                    />
                </div>
                <div className="profileContent">
                    <div className="profileNavigator">
                        <ul>
                            <li style={{background:selectedTopic==="Profile"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("Profile")}}>Profile</li>
                            <li style={{background:selectedTopic==="Education"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("Education")}}>Education</li>
                            { !visitorMode &&<li style={{background:selectedTopic==="My bookmarks"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("My bookmarks")}}>My bookmarks</li>}
                            { !visitorMode &&<li style={{background:selectedTopic==="My following"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("My following")}}>My following</li>}
                            { !visitorMode &&<li style={{background:selectedTopic==="My topics"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("My topics")}}>My topics</li>}
                            <li style={{background:selectedTopic==="My questions"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("My questions")}}>My questions</li>
                            <li style={{background:selectedTopic==="My answers"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("My answers")}}>My answers</li>
                            <li style={{background:selectedTopic==="My articles"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("My articles")}}>My articles</li>
                            { !visitorMode &&<li style={{background:selectedTopic==="Settings"?"rgba(255, 146, 64, 0.2)":"white"}} onClick={()=>{selectTopic("Settings")}}>Settings</li>}
                        </ul>
                    </div>
                    <div className="profileSection">
                        {(selectedTopic === 'Profile') && (<ProfileHomePage profileQuestions={user.profileQuestions} visitorMode={visitorMode} />)}
                        {(selectedTopic === 'Education') && <ProfileEducationPage pastEducation={user.pastEducation} visitorMode={visitorMode}/>}
                        {(selectedTopic === 'My bookmarks'  && !visitorMode) && <ProfileBookmarkPage/>}
                        {(selectedTopic === 'My following' && !visitorMode) && <ProfileFollowingPage/>}
                        {(selectedTopic === 'My topics'  && !visitorMode) && <ProfileFollowingTopic />}
                        {(selectedTopic === 'My questions') && <ProfileQuestionsPage type={"question"} data={user.questions}/>}
                        {(selectedTopic === 'My answers') && <ProfileQuestionsPage type={"answer"} data={user.answers}/>}
                        {(selectedTopic === 'My articles') && <ProfileQuestionsPage type={"article"} data={user.answers}/>}
                        {(selectedTopic === 'Settings'  && !visitorMode) && <ProfileSettingPage user={user} refetch={refetch}/>}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ProfilePage;