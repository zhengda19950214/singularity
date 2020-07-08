import React, {useState} from 'react'
import '../feedAnswers/feedAnswerPage.css'
import {Link} from 'react-router-dom'
import './topicWrapper.css'
import SearchTopicDropDown from "../search/searchTopicDropDown";
import ClearIcon from '@material-ui/icons/Clear';
const TopicWrapper = ({topics,editMode=false,chooseTopic,removeTopic}) => {
    const [enteredTopic,setEnteredTopic] = useState('');
    return (
        <div className="topicsWrapper">
            {
                topics.map(topic => {
                    const thumbnail = topic.thumbnail||require('../../resource/default_topic_image.png');
                    return (<li key={topic.id}>
                        <div className="topicNameAndThumbnail"><img alt="topicPicture" height="20px" width="20px" src={thumbnail}/>
                                <Link to={`/Topic/${topic.id}`}><span> #{topic.name.length>17?topic.name.substring(0,14)+"...":topic.name}</span></Link>
                        </div> {editMode&&<ClearIcon onClick={()=>removeTopic(topic.id)}/>} </li>)
                })
            }
            {editMode &&<div className="topicWrapperEnterTopic"><li>
                <input value={enteredTopic} onChange={(e)=>setEnteredTopic(e.target.value)} placeholder="Press Enter to add"/></li>
                {enteredTopic.length>0 &&
                <div className="topicWrapperSearchDropdown">
                    <SearchTopicDropDown enteredTopic={enteredTopic}
                                         chooseTopic={(topicName,topicId)=>{
                                             setEnteredTopic('');
                                             chooseTopic(topicId)}}
                                         allowCreate = {false}
                    />
                </div>}
            </div>}
        </div>
    );
};

export default TopicWrapper;