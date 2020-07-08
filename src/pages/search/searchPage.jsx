import React, {useEffect, useRef, useState} from 'react'
import './searchPage.css'
import TopicWrapper from "../topic/topicWrapper";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {SEARCH_ANSWER, SEARCH_MORE_ANSWER} from "../graphQL/query";
import FeedAnswerCard from "../cards/feedAnswerCard";
import TopicsFilter from "./topicsFilter";
import {SEARCH_TOPIC} from "../graphQL/topicQuery";

const SearchPage = props => {
    const searchString = props.match.params.searchString;
    props.setSelectedPage("");
    const {bookMarkedAnswers} = props;
    const wrapperRef = useRef(null);
    const [searchedTopic, setSearchedTopic] = useState([]);
    const {loading, error, data} = useQuery(SEARCH_TOPIC,{
        variables:{topicName:searchString},
        fetchPolicy:"network-only"
    });
    const [searchResult,setSearchResult] = useState([]);
    const [loadingMoreData, setLoadingMoreData] = useState(false);
    const [noMoreFetching] = useState(false);
    const [searchAnswerQuery,{data:searchData}] = useLazyQuery(SEARCH_ANSWER, {
        onCompleted: () => {
            const { search} = searchData;
            setLoadingMoreData(false);
            setSearchResult(search);
        },
        fetchPolicy:"network-only"});
    const [fetchMoreAnswerQuery,{data:moreData}] = useLazyQuery(SEARCH_MORE_ANSWER, {
        onCompleted: () => {
            const { search} = moreData;
            setLoadingMoreData(false);
            setSearchResult([...searchResult,...search]);
        },
        fetchPolicy:"network-only"});
    const [refetchQuestionQuery,{data:refetchedData}] = useLazyQuery(SEARCH_ANSWER, {
        onCompleted: () => {
            const { search} = refetchedData;
            setSearchResult(search);
        },
        fetchPolicy:"network-only"});
    useEffect(() => {
        searchAnswerQuery({variables: {searchString, searchedTopic,lastOffset: 0,limit:5}})
    },[searchString]);

    if (loading) return <div/>;
    if (error) return <div/>;

    const {searchTopic} =data;
    const filterTopic = (topicIDs) => {
        setSearchedTopic(topicIDs);
        refetchQuestionQuery({variables: {searchString, topicIDs:topicIDs,lastOffset: 0,limit:5}})
    };
    const searchMore = () => {
        if(loadingMoreData){
            return;
        }
        setLoadingMoreData(true);
        fetchMoreAnswerQuery({variables: {searchString, searchedTopic:searchedTopic,lastOffset: searchResult.length,limit:5}})
    };
    const handleScroll = () => {
        if(noMoreFetching){
            return;
        }

        if (wrapperRef.current.scrollHeight - wrapperRef.current.scrollTop - wrapperRef.current.clientHeight > 0) return;
        searchMore()
    };
    const filteredOutQuestions = searchResult.filter(question => question.answers.length > 0);

    return (
        <div className="searchPageWrapper" ref={wrapperRef} onScroll={handleScroll}>
            <div className="searchPageContent">
                <div className="searchResultAndFilter">
                    <TopicsFilter filterTopic={filterTopic}/>
                    <div className="questionAnswerGap">
                        <p>
                            {filteredOutQuestions.length} relevant results
                        </p>
                    </div>
                    <div className="searchResultWrapper" >
                        {filteredOutQuestions.map(question => {
                            const {answers} = question;
                            if (answers.length > 0) {
                                return (
                                    <div className="feedAnswer">
                                        <FeedAnswerCard key={question.id} question={question} answer={answers[0]} bookmarked={bookMarkedAnswers.some(answer=>answer.id === answers[0].id)} showAction={true}/>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Relevant Topics</p>
                    </div>
                    <TopicWrapper topics={searchTopic}/>
                </div>
            </div>
        </div>
    )
};

export default SearchPage;