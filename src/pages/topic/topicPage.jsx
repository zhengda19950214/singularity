import React, { useState} from 'react'
import TopicWrapper from "./topicWrapper";
import './topicPage.css'
import { useMutation, useQuery} from "@apollo/react-hooks";
import TopicCard from "../cards/topicCard";
import AddAliasesCard from "../cards/addAliasesCard";
import Button from "@material-ui/core/Button";
import {TOPIC_PAGE_QUERY} from "../graphQL/topicQuery";
import {ADD_TOPIC_RELATIONSHIP, REMOVE_TOPIC_RELATIONSHIP} from "../graphQL/topicMutation";
import TopicQuestions from "./topicQuestions";
const TopicPage = props => {
    const topicID = props.match.params.topicName;
    const {bookMarkedAnswers} = props;
    const {loading,error,data,refetch}= useQuery(TOPIC_PAGE_QUERY,{
        variables:{topicID},fetchPolicy: "network-only"});
    const [addTopicRelationshipMutation] = useMutation(ADD_TOPIC_RELATIONSHIP);
    const [removeTopicRelationshipMutation] = useMutation(REMOVE_TOPIC_RELATIONSHIP);
    const [editMode,setEditMode] = useState(false);


    if(loading) return <div/>;
    if(error) return <div/>;

    const {getTopic:topic,getTopic:{children,parent,id},me:{followedTopics}} = data;

    const addParent = (parentID) => {
        if(children.some(child =>{ return child.id === parentID})){
            alert("You can not add child as parent.");
            return
        }
        if(parentID === id){
            alert("You can not add yourself as parent.");
            return
        }
        addTopicRelationship(parentID,id);
    };

    const addChild = (childID) => {
        if(parent.some(p =>{ return p.id === childID})){
            alert("You can not add parent as child.");
            return
        }
        if(childID === id){
            alert("You can not add yourself as child.");
            return
        }
        addTopicRelationship(id,childID);
    };
    const addTopicRelationship = (parentID, childID) =>{
        addTopicRelationshipMutation({variables: {parentID,childID}}).then((result)=>{
            if(result){
                refetch();
            }
        })
    };

    const removeTopicRelationship = (parentID,childID)=>{
        removeTopicRelationshipMutation({variables: {parentID,childID}}).then((result)=>{
            if(result){
                refetch();
            }
        })
    };
    return (
        <div className="topicPageWrapper">
            <div className="homePageContent" >
                <div className="topicLeftContent">
                    <div className="topicCard">
                        <TopicCard topic={topic} editMode={editMode} setEditMode={setEditMode} topicFollowed={followedTopics.some((b)=>{return b.id === topic.id})}/>
                    </div>
                    {editMode &&
                    <div className="editPart">
                        <div className="topicCard">
                            <AddAliasesCard/>
                        </div>
                            <Button>Submit Changes</Button>
                    </div>}
                    {!editMode&&<TopicQuestions bookMarkedAnswers={bookMarkedAnswers} topic={topic}/>}
                </div>

                <div className="topics">
                    <div className="topicHeader">
                        <p>Parent topics</p>
                    </div>
                    {parent.length>0?
                    <TopicWrapper editMode={editMode}
                                  chooseTopic={addParent}
                                  topics={parent}
                                  removeTopic={(parentID)=>removeTopicRelationship(parentID,id)}/>:
                    <span style={{fontSize:'15px', color:'grey'}}>this topic has no parent topic</span>}
                </div>
                <div className="topics">
                    <div className="topicHeader">
                        <p>Child topics</p>
                    </div>
                    {children.length>0?
                    <TopicWrapper editMode={editMode}
                                  chooseTopic={addChild}
                                  topics={children}
                                  removeTopic={(childID)=>removeTopicRelationship(id,childID)}/>:
                        <span style={{fontSize:'15px', color:'grey'}}>this topic has no child topic</span>}
                </div>
            </div>
        </div>
    )
};

export default TopicPage