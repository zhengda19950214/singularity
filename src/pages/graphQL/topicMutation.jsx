import {gql} from "apollo-boost";

export const ADD_TOPIC_RELATIONSHIP = gql`mutation($parentID:GUID!,$childID:GUID!){
    addTopicRelationship(parentID:$parentID, childID:$childID)
}`;

export const REMOVE_TOPIC_RELATIONSHIP = gql`mutation($parentID:GUID!,$childID:GUID!){
    removeTopicRelationship(parentID:$parentID, childID:$childID)
}`;
export const UPDATE_TOPIC = gql`mutation($topicID:GUID!,$topicName :String, $topicDescription :String,$topicThumbnail:String){
    updateTopic(topicID:$topicID,input:{name:$topicName, description:$topicDescription, thumbnail:$topicThumbnail}){
        id
    }
}`;

export const FOLLOW_TOPIC = gql`mutation($topicID:GUID!){
    followTopic(topicID:$topicID)
}`;

export const UN_FOLLOW_TOPIC = gql`mutation($topicID:GUID!){
    unFollowTopic(topicID:$topicID)
}`;