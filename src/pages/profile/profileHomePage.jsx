import React, {useState} from "react";
import './profileHomePage.css'
import DraggableList from "./DraggableList";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_PROFILE_QUESTIONS} from "../graphQL/userMutation";

const ProfileHomePage = ({visitorMode,profileQuestions}) => {
    let processedData;
    if(profileQuestions){
        processedData =profileQuestions.map((question,index)=>(
             {...question,id:`${index}`})
        );
    }
    else{
        processedData = []
    }

    return (<ProfileQuestions visitorMode={visitorMode} processedData={processedData}/>);
};
export default ProfileHomePage;

const ProfileQuestions = ({visitorMode,processedData}) => {
    const [addMode, setAddMode] = useState(false);
    const [updateProfileQuestions] = useMutation(UPDATE_PROFILE_QUESTIONS);
    const [items, setItems] = useState( processedData);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const updateItems = (newItems)=>{
        const updateItem = newItems.map(item=>{
            return {question:item.question,answer:item.answer};
        });
        updateProfileQuestions({variables:{questions:updateItem}}).then(()=>{
        })
    };

    const handleAddNewItem = () => {
        if(question === '' || answer === ''){

        }
        else{
            const newItems = [...items,{...{question,answer},id:`${items.length}`,isSelected:false}];
            setItems(newItems);
            setAddMode(false);
            setItems(newItems);
            setAddMode(false);
            setQuestion('');
            setAnswer('');
            updateItems(newItems);
        }
    };
    return (
        <div className="profileHomePageWrapper">{!visitorMode &&
        <div>
            <div className="profileHomePageHeader">
                <h1>Define yourself:</h1>
                <p>Everyone is unique here is your chance to stand out. Write your own prompt and then share your
                    thought about it.</p>
            </div>
            <div className="profileHomePageContent">
                <div className="addListElementSection">
                    {!addMode && <div className="addListElement" onClick={() => setAddMode(true)}>
                        <AddCircleOutlineIcon/>
                        <span>Add</span>
                    </div>}
                    {addMode &&
                        <form onSubmit={handleAddNewItem}>
                            <div className="addListArea" style={{height:"210px"}}>
                                <CloseIcon className="closeAddProfilePrompt" onClick={() => {
                                    setAddMode(false)
                                }}/>
                                <div className="profileInputArea">
                                    <h1>Prompt:</h1>
                                    <input placeholder="e.g. dog or cat?"
                                           value={question}
                                           onChange={e=>setQuestion(e.target.value)}
                                           name="question"/>
                                </div>

                                <div className="profileInputArea">
                                    <h1>Response:</h1>
                                    <input placeholder="e.g. dog"
                                           value={answer}
                                           onChange={e=>setAnswer((e.target.value))}
                                           name="answer"/>
                                </div>
                                <div className="addProfilePrompt">
                                    <Button type="submit"><span>Save</span></Button>
                                </div>
                            </div>
                        </form>}
                </div>
                <DraggableList items={items} setItems={setItems} updateItems={updateItems}/>
            </div>
        </div>
        }
            {
                visitorMode &&
                <div className="ProfileContentList">
                    {items.map((item) => (
                        <div
                            className="ProfileListItem"
                        >

                            <div className="unDragContent">
                                <h1>{item.question}</h1>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
};