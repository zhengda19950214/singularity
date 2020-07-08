import React from 'react'
import './searchTopicDropDown.css'
import AddIcon from '@material-ui/icons/Add';
import {useQuery} from "@apollo/react-hooks";
import {SEARCH_TOPIC} from "../graphQL/topicQuery";

const SearchTopicDropDown = ({enteredTopic, chooseTopic, addNewTopic,allowCreate}) => {
    const {loading, error, data} = useQuery(SEARCH_TOPIC, {
        variables: {topicName: enteredTopic},
        fetchPolicy: "network-only"
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <div/>;
    const {searchTopic} = data;
    console.log(data);
    return (
        <div className="searchDropDown">
            <ul>
                {searchTopic.map(topic => (
                    <li id="searchResult" onClick={() => chooseTopic(topic.name,topic.id)}> {topic.name} </li>
                ))}
                {allowCreate&&<li id="addNewTopic" onClick={() => addNewTopic(enteredTopic)}><AddIcon/>
                <span>Add new topic</span>
                </li>}
            </ul>
        </div>
    )
};

export default SearchTopicDropDown;