import React, {useState} from "react";
import './profileHomePage.css'
import DraggableList from "./DraggableList";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import  {educationDegree, educationToYearRangeOption, educationFromYearRangeOption} from "../utility/dateFixture";
import Dropdown from "react-dropdown";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_PAST_EDUCATIONS} from "../graphQL/userMutation";

const ProfileEducationPage = ({visitorMode,pastEducation}) => {
    const processedData =pastEducation.map((education,index)=>{
        return {...education,id:`${index}`};
    });

    return (
        <PastEducations visitorMode={visitorMode} pastEducation={processedData}/>
    )
};

const PastEducations = ({visitorMode, pastEducation}) => {
    const [addMode, setAddMode] = useState(false);
    const [items, setItems] = useState(pastEducation);
    const [school, setSchool] = useState();
    const [major, setMajor] = useState();
    const [educationFromYearRange, setFromYear] = useState('');
    const [educationToYearRange, setToYear] = useState('');
    const [educationDegreeValue, setEducationDegree] = useState('');
    const [updatePastEducations] = useMutation(UPDATE_PAST_EDUCATIONS);
    const updateItems = (newItems)=>{
        const updateItem = newItems.map(item=>{

            return {school:item.school,degree:item.degree,from:item.from,to:item.to,major:item.major};
        });
        updatePastEducations({variables:{schools:updateItem}}).then(()=>{

        })

    };
    const handleAddNewItem = () => {
        if(educationFromYearRange === '' || educationToYearRange === ''||educationDegreeValue===''||school===''||educationDegree===''){
            alert('Please enter required value');
        }
        else{
            const newItems = [...items,{...{school,from:educationFromYearRange.value.toString(),to:educationToYearRange.value.toString(),major,degree:educationDegreeValue.value},id:`${items.length}`,isSelected:false}];
            setItems(newItems);
            setAddMode(false);
            setSchool('');
            setMajor('');
            setFromYear('');
            setToYear('');
            setEducationDegree('');
            updateItems(newItems);
        }
    };
    return (
        <div className="profileHomePageWrapper">
            {!visitorMode &&
            <div>
                <div className="profileHomePageHeader">
                    <h1>Past education:</h1>
                    <p>I think you know what goes here. No need for further description.</p>
                </div>
                <div className="profileHomePageContent">
                    <div className="addListElementSection">
                        {!addMode && <div className="addListElement" onClick={() => setAddMode(true)}>
                            <AddCircleOutlineIcon/>
                            <span>Add</span>
                        </div>}
                        {addMode &&
                            <form onSubmit={handleAddNewItem}>
                                <div className="addListArea" style={{height:"280px"}}>
                                    <CloseIcon className="closeAddProfilePrompt" onClick={() => {
                                        setAddMode(false)
                                    }}/>
                                    <div className="profileInputArea">
                                        <h1>School:</h1>
                                        <input value={school} onChange={e=>{setSchool(e.target.value)}}/>
                                    </div>
                                    <div className="educationInputArea">
                                        <div className="degree">
                                            <h1>Degree:</h1>
                                            <Dropdown required options={educationDegree} onChange={setEducationDegree} value={educationDegreeValue}
                                                      className="educationYearPicker" id="educationYearPicker" placeholder="Choose Degree"/>
                                        </div>
                                        <div className="year">
                                            <h1>To:</h1>
                                            <Dropdown required options={educationToYearRangeOption} onChange={setToYear} value={educationToYearRange}
                                                      className="educationYearPicker" id="educationYearPicker" placeholder="Year"/>
                                        </div>
                                        <div className="year">
                                            <h1>From:</h1>

                                            <Dropdown required options={educationFromYearRangeOption} onChange={setFromYear} value={educationFromYearRange}
                                                      className="educationYearPicker" id="educationYearPicker" placeholder="Year"/>
                                        </div>

                                    </div>
                                    <div className="profileInputArea">
                                        <h1>Major (Optional) :</h1>
                                        <input value={major} onChange={e=>{setMajor(e.target.value)}} placeholder="e.g. Mathematics"/>
                                    </div>
                                    <div className="addProfilePrompt">
                                        <Button type="submit"><span>Save</span></Button>
                                    </div>
                                </div>
                            </form>}
                    </div>
                    <DraggableList items={items} setItems={setItems} updateItems={updateItems} educationList={true}/>
                </div>
            </div>}

            {
                visitorMode &&
                <div className="ProfileContentList">
                    {items.map((item) => (
                        <div className="ProfileListItem">
                            <div className="unDragContent">
                                <div className="dragEducationIntro">
                                    <h1>{item.school}</h1>
                                    <h2>{item.degree}</h2>
                                </div>
                                <div  className="dragEducationYear">
                                    <h1>{item.from}-{item.to}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
};
export default ProfileEducationPage;