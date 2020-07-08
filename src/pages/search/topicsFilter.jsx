import React, {useState} from 'react'
import SearchTopicDropDown from "./searchTopicDropDown";
import {useQuery} from "@apollo/react-hooks";
import {MY_FOLLOW_TOPICS} from "../graphQL/topicQuery";
const TopicsFilter = ({filterTopic}) => {
    const {loading,error,data} = useQuery(MY_FOLLOW_TOPICS);
    if(loading) return <div/>;
    if(error) return <div/>;
    const {me:{followedTopics}}= data;
    return (
        <TopicsWrapper followedTopics={followedTopics} filterTopic={filterTopic}/>
    )
};
const TopicsWrapper = ({followedTopics,filterTopic}) => {

    const [enteredTopic,setEnteredTopic] = useState('');
    const [topics,setTopics] = useState(followedTopics);
    const selectTopic = (selectedTopic) => {
        const newTopics = topics.map(topic => {
            if(selectedTopic.id === topic.id){
                topic.selected = true;
            }
            return topic;
        });
        setTopics(newTopics);
        searchWithTopics();
    };
    const unSelectTopic = (selectedTopic)=>{
        const newTopics = topics.map(topic => {
            if(selectedTopic.id === topic.id){
                topic.selected = false;
            }
            return topic;
        });
        setTopics(newTopics);
        searchWithTopics();
    };
    const chooseTopic = (topicName,topicId) => {
        const topic = {name:topicName,id:topicId};
        if(!topics.some(i => (i.name === topicName))){
            const newTopicList = [...topics,topic];
            setTopics(newTopicList);
        }
        setEnteredTopic("");

    };

    const searchWithTopics = ()=>{
        if(!topics.some(topic=>{
            return topic.selected
        })){
            filterTopic(null);
            return;
        }


        const filteredTopic = topics.map(topic=>{
            if(topic.selected){
                return topic.id;
            }
            else{
                return null;
            }
        });
        filterTopic(filteredTopic)
    };

    return (
        <div className="filterWrapper">
            <div className="topicFilterHeader">
                <h1>Filter by topics:</h1>
                <div className="addNewTopicArea">
                    <input type="search"
                           value={enteredTopic}
                           onChange={(e) => {
                               setEnteredTopic(e.target.value)
                           }}
                           placeholder="Topics"
                           autoComplete="off"
                           id="topicInputArea"/>
                    {enteredTopic.length > 0 &&
                    <div className="topicSearchDropdown" style={{width: "114px"}}>
                        <SearchTopicDropDown chooseTopic={chooseTopic} enteredTopic={enteredTopic} allowCreate={false}/>
                    </div>}
                </div>
            </div>

            <div className="topicFilters">
                {topics.map( topic =>
                    (
                        <div key={topic.id} className="topicFilter" style={{boxShadow:topic.selected?"0 0 0 2px #ff9240":null }} onClick={()=>{
                            if(topic.selected){
                                unSelectTopic(topic);
                            }
                            else{
                                selectTopic(topic);
                            }
                        }}>
                            <span key={topic.id} style={{color:topic.selected?"#e36100":null}}>#{topic.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}
export default TopicsFilter;