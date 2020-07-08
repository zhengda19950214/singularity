
import {useState} from "react";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {SEARCH_TOPIC_BY_NAME} from "../graphQL/topicQuery";
import {CREATE_TOPIC} from "../graphQL/mutations";

export const useTopic = ()=>{
    const [topicEmptyError, showEmptyTopicError] = useState(false);
    const [currentTopicValue,setCurrentTopicValue] = useState("");
    const [createTopic] = useMutation(CREATE_TOPIC);
    const [topics, setTopics] = useState([]);

    const addNewTopic = (topic) => {
        checkTopicName(
            {
                variables:{topicName:topic}
            });
    };
    const chooseTopic = (topicName,topicId) => {
        const topic = {topicName,topicId};
        if(!topics.some(i => (i.topicName === topicName))){
            const newTopicList = topics.concat(topic);
            setTopics(newTopicList);
        }
        showEmptyTopicError(false);
        setCurrentTopicValue("");
    };
    const [checkTopicName, { data }] = useLazyQuery(SEARCH_TOPIC_BY_NAME,
        {
            onCompleted: () => {
                const topic = data.getTopicByName;
                if(topic){
                    chooseTopic(topic.name,topic.id);
                }
                else{
                    createTopic({variables: {topicName:currentTopicValue}}).then(
                        (result)=>{
                            const {createTopic} = result.data;
                            chooseTopic(createTopic.name,createTopic.id);
                        }
                    )
                }
            },
            fetchPolicy:"network-only"
        });

    return {topics, currentTopicValue, setCurrentTopicValue, chooseTopic, addNewTopic,topicEmptyError, showEmptyTopicError}
};
