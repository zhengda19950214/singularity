import React, {useEffect, useRef, useState} from 'react'
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicWrapper from "../topic/topicWrapper";
import {useLazyQuery} from "@apollo/react-hooks";
import SchoolCard from "./schoolCard";
import './mySchoolPage.css'
import {GET_MORE_MY_SCHOOL, GET_MY_SCHOOL} from "../graphQL/questionQuery";

const MySchoolPage = ({setSelectedPage,bookMarkedAnswers}) => {
    const [ questions,setQuestions] = useState([]);
    const [ getMySchool, setGetMySchool] = useState({});
    const [ followedTopics, setTopics] = useState([]);
    const [loadingMoreData, setLoadingMoreData] = useState(true);
    const [noMoreFetching,setNoMoreFetching] = useState(false);
    const wrapperRef = useRef(null);
    const [ fetchingMySchoolQuery,{loading, error, data}] = useLazyQuery(GET_MY_SCHOOL, {
        fetchPolicy:"network-only",
        onCompleted: ()=>{
            setGetMySchool(data.getMySchool);
            setQuestions(data.getMySchool.questions);
            setTopics(data.me.followedTopics);
        }
    });
    const [ fetchingMoreSchoolQuery,{data:moreQuestions}] = useLazyQuery(GET_MORE_MY_SCHOOL, {
        fetchPolicy:"network-only",
        onCompleted: ()=>{
            setLoadingMoreData(false);
            setQuestions([...questions,...moreQuestions.getMySchool.questions]);
            if (moreQuestions.getMySchool.questions.length<10){
                setNoMoreFetching(true);
            }
        }
    });
    useEffect(()=>{
        fetchingMySchoolQuery({variables:{limit:5,lastOffset:0}})
    },[]);
    setSelectedPage("MySchool");
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[questions]);
    if (loading) return <div/>;
    if (error) return <div/>;
    const getMoreQuestions = () => {
        if(loadingMoreData||noMoreFetching){
            return;
        }
        setLoadingMoreData(true);
        fetchingMoreSchoolQuery({variables:{limit:5,lastOffset:questions.length}});
    };
    const handleScroll = ({srcElement:{scrollingElement}}) => {
        if (scrollingElement.scrollHeight - scrollingElement.scrollTop - scrollingElement.clientHeight > 0) return;
        getMoreQuestions()
    };
    return (
        <div className="homePage" ref={wrapperRef} onScroll={handleScroll}>
            <div className="homePageContent" >
                <div className="feedAnswers">
                    <div className="schoolIntroduction">
                    <SchoolCard university={getMySchool}/>
                    </div>
                    {questions.map(question => {
                        const {answers} = question;
                        if(answers.length >= 1){
                            return (
                                <div className="feedAnswer">
                                    <FeedAnswerCard bookmarked={bookMarkedAnswers.some((b)=>{return b.id === answers[0].id})}
                                                    key={question.id} question={question} answer={answers[0]} profileBookmarkAnswer={false} showAction={true}/>

                                </div>
                            )
                        }
                        return null;
                    })}

                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Followed Topics</p>
                    </div>
                    {followedTopics.length>0?
                        <TopicWrapper topics={followedTopics}/>:
                        <span style={{fontSize:'15px', color:'grey'}}>Try to follow some topics!</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default MySchoolPage;