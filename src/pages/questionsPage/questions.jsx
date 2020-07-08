import React, {useEffect, useRef, useState} from 'react'
import {useLazyQuery} from "@apollo/react-hooks";
import QuestionCard from "../cards/questionCard";
import './questions.css';
import TopicWrapper from "../topic/topicWrapper";
import {FEED_QUESTIONS, GET_QUESTIONS} from "../graphQL/query";
/* This is the Answer page that feed question to user to answer, bad name*/
const Questions = ({setSelectedPage,setGreyCover,me}) => {
    const [questions,setQuestions] = useState([]);
    const [followedTopics, setFollowedTopics] = useState([]);
    const [followedQuestions, setFollowedQuestions] = useState([]);
    const [loadingMoreData, setLoadingMoreData] = useState(false);
    const [noMoreFeed, setNoMoreFeed] = useState(false);
    const [nonFeedQuestionsIndex,setNonFeedQuestionsIndex] = useState(0);
    const wrapperRef = useRef(null);
    const [fetchQuestionsQuery, {data:fetchedQuestions}] = useLazyQuery(GET_QUESTIONS,{
        fetchPolicy:"network-only",
        onCompleted: ()=>{
            setLoadingMoreData(false);
            const {questions:questionFeed} = fetchedQuestions;
            setQuestions([...questions,...questionFeed]);
            setNonFeedQuestionsIndex(nonFeedQuestionsIndex+10);
        }
    });

    const [getFeedQuestionsQuery, { error, data}] = useLazyQuery(FEED_QUESTIONS,{
        fetchPolicy:"network-only",
        onCompleted: ()=>{
            setLoadingMoreData(false);
            const {questionFeed,me:{followedTopics:fetchedTopics,followedQuestions:fetchedFollowedQuestion}} = data;
            if(questions.length === 0){
                setFollowedQuestions(fetchedFollowedQuestion);
                setFollowedTopics(fetchedTopics);
            }
            setQuestions([...questions,...questionFeed]);
            if(questionFeed.length < 10) {
                setNoMoreFeed(true);
                fetchQuestionsQuery({variables:{lastOffset:0,limit:10-questionFeed.length}})
            }
        }
    });


    useEffect(()=>{
        getFeedQuestionsQuery({variables:{lastOffset:0}})
    },[]);

    if (error) return <div/>;
    setSelectedPage("Answer");
    const getMoreQuestions = () => {
        if(loadingMoreData){
            return;
        }
        setLoadingMoreData(true);
        if(noMoreFeed){
            fetchQuestionsQuery({variables:{lastOffset:nonFeedQuestionsIndex,limit:10}})
        }
        else{
            getFeedQuestionsQuery({variables:{lastOffset:questions.length}});
        }
    };
    const handleScroll = () => {
        if (wrapperRef.current.scrollHeight - wrapperRef.current.scrollTop - wrapperRef.current.clientHeight > 0) return;

        getMoreQuestions()
    };
    return (
        <div className="homePage"  ref={wrapperRef} onScroll={handleScroll}>
            <div className="homePageContent">
                <div className="feedQuestions">
                    {questions.map((question)=>(
                        <div className="feedQuestion"><QuestionCard me={me} question={question} feedCard={true} setGreyCover={setGreyCover}
                                                                    followed={followedQuestions.some((q)=>{return q.id === question.id})}/></div>
                        ))}
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
};

export default Questions;