import React, {useState} from 'react'
import './topicCard.css'
const AddAliasesCard = () => {
    const [topics,addTopic] = useState([]);
    const [currentTopicValue,setCurrentTopicValue] = useState("");
    const [topicEmptyError] = useState(false);
    const enterTopic = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            if(currentTopicValue !== ""){
                const newTopicList = topics.concat(currentTopicValue);
                addTopic(newTopicList);
                setCurrentTopicValue("");
            }
        }
    };
    return (

        <div className="card">
            <div className="aliasesHeader">
                <h1>Aliases</h1>
                <p>Alternative names, abbreviations, and common misspellings</p>
            </div>
            <div className="topicInputArea">
                <input value={currentTopicValue} onChange={(e)=>{setCurrentTopicValue(e.target.value)}} onKeyDown={enterTopic} placeholder="Please Enter to add aliases"  id="topicInputArea"/>
                {topicEmptyError && <p>Please enter a topic</p>}
                <div className="topicsPresentArea">
                    {topics.map(topic => (
                        <div className="enteredTopic">
                            #{topic}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default AddAliasesCard;