import React, {useEffect, useRef, useState} from 'react'
import './TutorialPage.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from "@material-ui/core/Button";
import NewTutorialPostsPage from "./NewTutorialPostsPage";
import Checkbox from '@material-ui/core/Checkbox';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {GET_TUTORING_POSTS, SEARCH_TUTORING_POSTS} from "../graphQL/tutoringQuery";
import MyTutorPostsPage from "./MyTutorPostsPage";
import MyTasksPage from "./MyTasksPage";
import {CLEAR_POST_NOTIFICATION} from "../graphQL/tutoringMutation";

const TutorialPage = ({setSelectedPage, setPopUpWindowType, setApplyTutorPost, me, openSpecificUserWindow, setPopUpCallBackFunction}) => {
    const [posts, setPosts] = useState([]);
    const [selectedSubPage, setSelectedSubPage] = useState('New');
    const [selectedTopic, setSelectTopic] = useState([]);
    const [renewPosts, setRenewPosts] = useState(true);
    const [loadingMoreData, setLoadingMoreData] = useState(false);
    const [searchString, setSearchString] = useState('');
    const wrapperRef = useRef(null);
    const [notifications, setNotifications] = useState(me.applicationNotifications);
    const [clearNotificationMutation] = useMutation(CLEAR_POST_NOTIFICATION);
    const [noMoreFetching,setNoMoreFetching] = useState(false);

    const getNavItemBackground = (tagName) => {
        return selectedSubPage === tagName ? {background: '#3F4951', color: "white"} : {}
    };
    const [getFeedTutoringPosts, {error, data}] = useLazyQuery(GET_TUTORING_POSTS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setLoadingMoreData(false);
            const {tutorPostFeed} = data;
            if (renewPosts) {
                setPosts(tutorPostFeed);
            } else {
                setPosts([...posts, ...tutorPostFeed]);
            }

        }
    });

    const [searchTutoringPostsQuery, {error: searchTutorError, data: searchTutorData}] = useLazyQuery(SEARCH_TUTORING_POSTS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setLoadingMoreData(false);
            const {searchTutorPost} = searchTutorData;
            if (renewPosts) {
                setPosts(searchTutorPost);
            } else {
                setPosts([...posts, ...searchTutorPost]);
            }
            if (searchTutorPost.length<10){
                setNoMoreFetching(true);
            }
        }
    });

    const resetStates = () => {
        setRenewPosts(true);
        setSelectTopic([]);
        setSearchString('');
        setPosts([]);
    };
    const applyTutoringPost = (post) => {
        if (me.tutorCard) {
            setPopUpWindowType('applyTutoringPost');
            setApplyTutorPost(post);
        } else {
            setPopUpWindowType("iCanTeach")
        }
    };

    const searchTutoringPosts = (input) => {
        setRenewPosts(true);
        setSearchString(input);
        const topics = selectedTopic.length === 0 ? null : selectedTopic;
        if (input.length === 0) {
            getFeedTutoringPosts({variables: {lastOffset: 0, topics}});
        } else {
            searchTutoringPostsQuery({variables: {searchString: input, lastOffset: 0, topics}})
        }
    };

    const selectTopic = (id) => {
        setRenewPosts(true);
        let topicsAfterSelection;
        if (!selectedTopic.find(topic => topic === id)) {
            topicsAfterSelection = [...selectedTopic, id]
        } else {
            topicsAfterSelection = selectedTopic.filter(topic => topic !== id)
        }
        const topics = topicsAfterSelection.length === 0 ? null : topicsAfterSelection;
        if (searchString.length > 0) {
            searchTutoringPostsQuery({variables: {searchString, lastOffset: 0, topics}})
        } else {
            getFeedTutoringPosts({variables: {lastOffset: 0, topics}})
        }
        setSelectTopic(topicsAfterSelection);
    };

    const getMoreTutorPosts = () => {
        setRenewPosts(false);
        if (loadingMoreData||noMoreFetching) {
            return;
        }
        const topics = selectedTopic.length === 0 ? null : selectedTopic;
        if (searchString.length > 0) {
            searchTutoringPostsQuery({variables: {searchString, lastOffset: posts.length, topics}})
        } else {
            getFeedTutoringPosts({variables: {lastOffset: posts.length, topics}})
        }
        setLoadingMoreData(true);


    };

    const handleScroll = ({srcElement:{scrollingElement}}) => {
        if (scrollingElement.scrollHeight - scrollingElement.scrollTop - scrollingElement.clientHeight > 0) return;
        getMoreTutorPosts()
    };

    const clearNotification = () => {
        clearNotificationMutation().then(
            ()=>{
                setNotifications(0);
            }
        )
    };

    useEffect(() => {
        getFeedTutoringPosts();
    }, []);
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[posts]);

    if (error || searchTutorError) return <div/>;
    setSelectedPage("Tutoring");

    return (
        <div className="homePage" ref={wrapperRef} onScroll={handleScroll}>
            <div className="homePageContent">
                <div className="feedAnswers">
                    <div className="tutorialPageHeader">
                        <ul className="tutorialNav">
                            <li style={getNavItemBackground('New')} onClick={() => {
                                setSelectedSubPage('New');
                                getFeedTutoringPosts();
                            }}>New
                            </li>
                            <li style={getNavItemBackground('My Posts')} onClick={() => {
                                setSelectedSubPage('My Posts');
                                clearNotification();
                                resetStates();
                            }}>My Posts
                                {notifications > 0 &&<div className="myTutorPostsNotification">
                                    <div id="notification">
                                        {notifications}
                                    </div>
                                </div>}
                            </li>

                            <li style={getNavItemBackground('My Tasks')} onClick={() => {
                                setSelectedSubPage('My Tasks');
                                resetStates();
                            }}>My Tasks
                            </li>
                        </ul>
                        {selectedSubPage === 'New' && <div className="tutorialSearch">
                            <input placeholder='Search posts' onChange={(e) => searchTutoringPosts(e.target.value)} value={searchString}/>
                        </div>}
                    </div>
                    {selectedSubPage === 'New' &&
                    <NewTutorialPostsPage posts={posts} setPopUpWindowType={applyTutoringPost} myId={me.id}
                                          setPopUpCallBackFunction={setPopUpCallBackFunction}/>
                    }
                    {selectedSubPage === 'My Posts' &&
                    <MyTutorPostsPage openSpecificUserWindow={openSpecificUserWindow}/>}
                    {selectedSubPage === 'My Tasks' && <MyTasksPage/>}
                </div>
                <div className="tutorialPageRightHandSide">
                    <div className="tutorialPageActions">
                        <Button id="iNeedTutorialButton" onClick={() => setPopUpWindowType("iNeedTutoring")}>I need
                            tutoring</Button>
                        <Button id="iCanTutorButton" onClick={() => setPopUpWindowType("iCanTeach")}>I can
                            teach</Button>
                    </div>
                    {selectedSubPage === 'New' && <div className="tutorialPagePostsTopicFilter">
                        <div className="tutorialPageTopicFilterHeader">
                            <h1>Filters</h1>
                        </div>
                        {(me.followedTopics.length >0)? <ul>
                            {me.followedTopics.map(topic => (
                                <li key={topic.id}><p>#{topic.name}</p> <Checkbox onClick={() => {
                                    selectTopic(topic.id)
                                }} id="topicFilterCheckBox"/></li>
                            ))}
                        </ul>:
                        <span style={{fontSize:'12px', color:'grey'}}>Go follow some topics!</span>}
                    </div>}
                </div>
            </div>
        </div>

    )
};

export default TutorialPage;