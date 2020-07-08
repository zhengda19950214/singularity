import {gql} from "apollo-boost";

export const SEARCH_TOPIC = gql`query($topicName:String!)
{
    searchTopic(searchString:$topicName){
        id
        name
        thumbnail
    }
}
`;

export const SEARCH_TOPIC_BY_NAME = gql`query($topicName:String!)
{
    getTopicByName(name:$topicName){
        id
        name
    }
}
`;

export const GET_QUESTION_BY_TOPIC = gql`query($topicName:String!){
    questions(topics:[$topicName]) {
        id
        title
        answers(orderBy: RECENT, limit:1){
            content
            id
            comments{
                id
            }
            user {
                id
                firstName
                lastName
                university{
                    name
                }
                major
                year
            }
        }
        topics{
            id
            name
            thumbnail
        }
        lastUpdated
        user {
            id
            firstName
            lastName
            major
            year

        }
    }
}`;
export const TOPIC_PAGE_QUERY = gql`query($topicID:GUID!)
{

    getTopic(topicID:$topicID){
        id
        name
        parent{
            name
            id
            thumbnail
        }
        children{
            name
            id
            thumbnail
        }
        thumbnail
        description
    }

    me{
        id
        followedTopics{
            id
        }
    }
}
`;

export const MY_FOLLOW_TOPICS = gql`
    {
        me{
            id
            followedTopics{
                id
                name
                thumbnail
            }
        }

    }
`;