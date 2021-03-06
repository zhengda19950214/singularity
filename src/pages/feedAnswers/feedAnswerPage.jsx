import React, {useEffect, useRef, useState} from 'react'
import './feedAnswerPage.css'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "../topic/topicWrapper";
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_ANSWERS, GET_FEED_ANSWERS} from '../graphQL/query'

const FeedAnswerPage = ({setSelectedPage, me, setPopUpWindowType}) => {
    const [answers, setAnswers] = useState([]);
    const [loadingMoreData, setLoadingMoreData] = useState(true);
    const [noMoreFeed, setNoMoreFeed] = useState(false);
    const [nonFeedAnswersIndex,setNonFeedAnswersIndex] = useState(0);
    const [noMoreFetching,setNoMoreFetching] = useState(false);
    const wrapperRef = useRef(null);

    const [fetchAnswersQuery, {data:fetchedQuestions}] = useLazyQuery(GET_ANSWERS,{
        fetchPolicy:"network-only",
        onCompleted: ()=>{
            setLoadingMoreData(false);
            const {answers:answerFeed} = fetchedQuestions;
            setAnswers([...answers,...answerFeed]);
            setNonFeedAnswersIndex(nonFeedAnswersIndex+10);
            if (answerFeed.length<10){
                setNoMoreFetching(true);
            }
        }
    });
    const [getFeedAnswerQuery, {error, data}] = useLazyQuery(GET_FEED_ANSWERS,{
        fetchPolicy: "network-only",
        onCompleted: ()=>{
            setLoadingMoreData(false);
            const {ratingFeed,recentFeed} = data;
            setAnswers([...answers,...ratingFeed,...recentFeed]);
            if(ratingFeed.length+recentFeed.length < 10) {
                setNoMoreFeed(true);
                fetchAnswersQuery({variables:{lastOffset:0}})
            }

        }
    });


    useEffect(() => {
        getFeedAnswerQuery();
        const doNotShowTopicSetUpPopup = localStorage.getItem("doNotShowTopicSetUp")
        if(!doNotShowTopicSetUpPopup){
            setPopUpWindowType('topicSetUpPopup');
            localStorage.setItem("doNotShowTopicSetUp","yes");
        }
    }, []);

    setSelectedPage("Home");
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[answers]);
    if (error) return <div/>;


    const getMoreAnswers = () => {
        if(loadingMoreData||noMoreFetching){
            return ;
        }
        setLoadingMoreData(true);
        if(noMoreFeed){
            fetchAnswersQuery({variables:{lastOffset:nonFeedAnswersIndex}});
        }
        else{
            getFeedAnswerQuery({variables:{ratingLastOffset:Math.ceil(answers.length*0.2),recentLastOffset:Math.ceil(answers.length*0.8)}});
        }

    };
    const handleScroll = ({srcElement:{scrollingElement}}) => {
        if (scrollingElement.scrollHeight - scrollingElement.scrollTop - scrollingElement.clientHeight > 0) return;
        getMoreAnswers()
    };


    return (
        <div className="homePage" ref={wrapperRef} onScroll={handleScroll}>
            <div className="homePageContent" >
                <div className="feedAnswers">
                    {answers.map(answer => {
                            return (
                                <div key={answer.id} className="feedAnswer">
                                    <FeedAnswerCard bookmarked={me.bookmarkedAnswers.some((b)=>{return b.id === answer.id})}
                                                    key={answer.id} question={answer.question} answer={answer} profileBookmarkAnswer={false} showAction={true}/>
                                </div>
                            )
                    })}
                    <div style={{position:'relative',height:'100px',paddingTop:'35px'}}>
                        {loadingMoreData ? <img style={{marginLeft:'320px',height:'50px'}} src={require('../../resource/singularityLoading.gif')}/> :
                            <span style={{position:'relative',marginLeft:'250px',fontSize:'18px'}} >-- No more answers --</span>}
                    </div>
                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Followed Topics</p>
                    </div>
                    {me.followedTopics.length>0?
                    <TopicWrapper topics={me.followedTopics}/>:
                        <span style={{fontSize:'15px', color:'grey'}}>Try to follow some topics!</span>
                    }
                </div>
            </div>
        </div>

    )
};

export default FeedAnswerPage;