import React, { useState} from 'react'
import {TOPIC_PAGE_QUERY} from "../graphQL/topicQuery";
import { useMutation, useQuery} from "@apollo/react-hooks";
import {
    ADD_TOPIC_RELATIONSHIP,
    FOLLOW_TOPIC,
    REMOVE_TOPIC_RELATIONSHIP,
    UN_FOLLOW_TOPIC
} from "../graphQL/topicMutation";
import "./topicSetUp.css";
import AddRounded from '@material-ui/icons/AddRounded';
import DoneRounded from '@material-ui/icons/DoneRounded'


const TopicSetUpBox = ({topicID}) => {
    const [followTopicMutation] = useMutation(FOLLOW_TOPIC);
    const [unFollowTopicMutation] = useMutation(UN_FOLLOW_TOPIC);
    const [followed, setFollowed] = useState(false);
    const {loading,error,data}= useQuery(TOPIC_PAGE_QUERY,{
        variables:{topicID},fetchPolicy: "network-only"});
    const [addTopicRelationshipMutation] = useMutation(ADD_TOPIC_RELATIONSHIP);
    const [removeTopicRelationshipMutation] = useMutation(REMOVE_TOPIC_RELATIONSHIP);

    if(loading) return <div/>;
    if(error) return <div/>;


    const {getTopic:topic,getTopic:{children,parent,id},me:{followedTopics}} = data;



    const followTopic = () => {
        followTopicMutation({variables: {topicID: topic.id}}).then(result => {
            if (!result.data.followTopic) {
                alert("something went wrong");
            } else {
                setFollowed(true);
            }
        })
    };
    const unFollowTopic = () => {
        unFollowTopicMutation({variables: {topicID: topic.id}}).then(result => {
            if (!result.data.unFollowTopic) {
                alert("something went wrong");
            } else {
                setFollowed(false);
            }
        })
    };



    return (
        <div className='topicBox' onClick={followed ? unFollowTopic : followTopic}>
            <img src={topic.thumbnail || require('../../resource/default_topic_image.png')} />
            <span>#{topic.name}</span>
            {
                followed ? <DoneRounded style={{color:'#e36100',fontSize:'30px',float:'right',marginTop:'20px',marginRight:'15px'}}/> : <AddRounded style={{color:'#e36100',fontSize:'30px',float:'right',marginTop:'20px',marginRight:'15px'}}/>
            }

        </div>
    )



};

export default TopicSetUpBox;