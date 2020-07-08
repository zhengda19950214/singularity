import React, {useEffect, useState} from "react";
import './profileFollowing.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {USER_FOLLOWED_TOPICS} from "../graphQL/userQuery";
import {UN_FOLLOW_TOPIC} from "../graphQL/topicMutation";
import {Link} from "react-router-dom";

const ProfileFollowingTopic = () => {
    const [unFollowTopicMutation] = useMutation(UN_FOLLOW_TOPIC);
    const [topics, setTopics] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [profileFollowQuery, {data}] = useLazyQuery(USER_FOLLOWED_TOPICS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            const {followedTopics} = data.me;
            setTopics(followedTopics);
        }
    });

    useEffect(() => {
        profileFollowQuery();
    },[]);


    const search = (input) => {
        const {me} = data;
        setSearchInput(input);
        const updatedTopic = me.followedTopics.filter(topic=>(topic.name.includes(input)));
        setTopics(updatedTopic);
    };
    const unFollow = (topicId) =>{
        unFollowTopicMutation({variables: {topicID: topicId}}).then(result => {
            if (!result.data.unFollowTopic) {
                alert("something went wrong");
            } else {
                const newFollowedTopics = topics.filter(topic => {
                    return topic.id !== topicId
                });
                setTopics(newFollowedTopics);
            }
        })
    };

    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon/>
                <input value={searchInput} onChange={e=>search(e.target.value)} placeholder="search"/>
            </div>
            <div className="profileRightPartContent">
                {topics.map(topic => (
                    <div key={topic.id} className="followingContent">
                        <img height="40px" width="50px" src={topic.thumbnail || require('../../resource/topic.svg')}/>
                        <div className="followingTopicName">
                            <Link to={"/topic/" + topic.id}><h1>#{topic.name}</h1></Link>
                        </div>
                        <DeleteOutlineOutlinedIcon onClick={() => {
                            unFollow(topic.id)
                        }}/>
                    </div>
                ))
                }
            </div>
        </div>
    );


};
export default ProfileFollowingTopic;