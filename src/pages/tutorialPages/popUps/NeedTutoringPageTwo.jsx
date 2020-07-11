import React, {Fragment} from 'react'
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import SearchTopicDropDown from "../../search/searchTopicDropDown";
import {useTopic} from "../../hooks/searchTopicState";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {validateTutorPostPageOneForm} from "../../utils/validation";

const NeedTutoringPageTwo = ({submitForm}) => {
    const {topics, currentTopicValue, setCurrentTopicValue, chooseTopic, addNewTopic, topicEmptyError, showEmptyTopicError} = useTopic();

    return (
        <Fragment>
            <h1>Tutoring Post</h1>
            <Formik

                initialValues={{title: '', description: ''}}
                onSubmit={(values) => {
                    if (topics.length === 0) {
                        showEmptyTopicError(true);
                    } else {
                        submitForm({...values, topics: topics.map(topic => (topic.topicId))});
                    }
                }}
                validate={validateTutorPostPageOneForm}
            >{({
                   values,
                   handleChange,
                   handleSubmit,
                   errors,
               }) => (
                <form onSubmit={handleSubmit} autocomplete="off">
                    <h2>Title:</h2>
                    <input
                        placeholder='   What do you want for this tutoring?'
                        required
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        id="titleInput"/>
                    {errors.title && <p id='errorMessage'> {errors.title} </p>}
                    <h2>Description:</h2>
                    <textarea
                        placeholder='   Describe your problem in details.'
                        required
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        id="description"/>
                    {errors.description && <p id='errorMessage'> {errors.description} </p>}
                    <h2>Topics:</h2>
                    <input
                        placeholder='Topics help other find your posts.'
                        value={currentTopicValue}
                        onChange={(e) => {
                            setCurrentTopicValue(e.target.value)
                        }}
                        id="topicInput"/>
                    {topicEmptyError && <p style={{color: 'red'}}>Please enter a topic</p>}
                    {currentTopicValue.length > 0 &&
                    <div className="topicSearchDropdown" style={{width: "144px"}}>
                        <SearchTopicDropDown chooseTopic={chooseTopic} enteredTopic={currentTopicValue}
                                             addNewTopic={addNewTopic} allowCreate={true}/>
                    </div>}
                    <div id="topicsArea" style={{marginTop:'8px',marginBottom:'20px'}}>
                        {topics.map(topic => (
                            <div className="enteredTopic">
                                #{topic.topicName}
                                <CloseIcon className="enteredTopicClose" style={{width: "13px", height: "13px"}}/>
                            </div>
                        ))}
                    </div>
                    <Button type="submit">Next</Button>
                </form>
            )}
            </Formik>

        </Fragment>)
};

export default NeedTutoringPageTwo;