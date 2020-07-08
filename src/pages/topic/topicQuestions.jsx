import React, {useState} from 'react'
import FeedAnswerCard from "../cards/feedAnswerCard";
import {useQuery} from "@apollo/react-hooks";
import {SEARCH_ANSWER} from "../graphQL/query";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const TopicQuestions = ({topic, bookMarkedAnswers}) => {
    const {loading,data,refetch} = useQuery(SEARCH_ANSWER,{
        variables:{topicIDs:[topic.id]},fetchPolicy: "network-only"});
    const [searchedValue,setSearchedValue] = useState('');
    if(loading) return <div/>;
    const {search:searchResult} = data;
    const filteredOutQuestions = searchResult.filter(question => question.answers.length > 0);

    const searchWithTopic = (searchString) => {
        setSearchedValue(searchString);
        refetch({searchString,topicIDs:[topic.id]})
    };
    return (
        <div>
            <div className="topicContentSearch">
                <SearchOutlinedIcon />
                <input placeholder="search" value={searchedValue} onChange={(e)=>searchWithTopic(e.target.value)}/>
            </div>
        {filteredOutQuestions.map(question => {
                const answer = question.answers[0];
                return (
                    <div className="feedAnswer">
                        <FeedAnswerCard key={question.id} answer={answer} bookmarked={bookMarkedAnswers.some(bookMarkedAnswer=>bookMarkedAnswer.id === answer.id)} question={question} showAction={true}/>
                    </div>
                )
            })}
        </div>
    )
};

export default TopicQuestions;