import React, {Fragment, useState} from 'react'
import Rating from "@material-ui/lab/Rating/Rating";
import {Formik} from "formik";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_TUTORING_CARD} from "../graphQL/tutoringMutation";
import Dropdown from "react-dropdown";
import {degreeYearRange} from "../utility/dateFixture";
import validateTutorCardForm from "../utils/validation";

const TutorCardSettingField = ({user, refetch}) => {
    const {tutorCard:{id, year, major, skills, timeAvailability, preferredSoftware, details},tutorRating, ratingCount} = user;

    const [expand, setExpand] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [degreeYear, setDegreeYear] = useState({value: year, label: year});
    const [updateApplication] = useMutation(UPDATE_TUTORING_CARD);

    return (
        <Formik
            initialValues={{major, skills, timeAvailability, preferredSoftware, details}}
            validate={validateTutorCardForm}
            onSubmit={(values) => {
                updateApplication({variables: {...values, year: degreeYear.value, cardID: id}}).then(() => {
                    setEditMode(false);
                    refetch();
                });
            }}
        >{({
               values,
               handleChange,
               handleSubmit,
               resetForm,
               errors,
           }) => (
            <div className="ProfileSettingListItem">
                <div className="TutorCardCollapsed">
                    <div className="ProfileSettingListName">
                        <p>Tutor Card:</p>
                    </div>
                    <div className="TutorCardSettingListContent">
                        {!expand && <div id="tutorCardSettingHeader" style={{display: 'flex'}}>
                            <Rating name="disabled" value={tutorRating} disabled id="rating"/>
                            <p id="ratingNumber">({ratingCount})</p>
                        </div>}

                    </div>
                    <div className="ProfileSettingChange" style={{width: "50%"}}>
                        {!expand && <p onClick={() => setExpand(true)}>Expand</p>}
                        {expand &&
                        <Fragment>
                            {editMode &&
                            <Fragment>
                                <p onClick={() => handleSubmit()}>Save</p>
                                <p onClick={() => {
                                    setEditMode(false);
                                    resetForm()
                                }}>Cancel</p>
                            </Fragment>
                            }
                            {!editMode && <p onClick={() => setEditMode(true)}>Edit</p>}
                            <p onClick={() => setExpand(false)}>Collapse</p>
                        </Fragment>
                        }
                    </div>
                </div>
                {expand &&
                <div className="TutorCardSettingExpanded">
                    <div className="tutoringApplicationBottomPart">
                        <div className="tutoringDetailItem">
                            <h3>Rating:</h3>
                            <Rating name="disabled" value={tutorRating} disabled id="rating" style={{marginRight:"1%"}}/>
                        </div>
                        <div className="tutoringDetailItem">
                            <h3>What year are you in?</h3>
                            {!editMode && <p>{year}</p>}
                            {editMode && <Dropdown required options={degreeYearRange}
                                                   value={degreeYear}
                                                   onChange={(data) => {
                                                       setDegreeYear(data)
                                                   }}
                                                   id="majorYearPicker"
                                                   placeholder={degreeYearRange[0]}/>}
                        </div>
                        <div className="tutoringDetailItem">
                            <h3>What's your major/research direction?</h3>
                            {!editMode && <p>{major}</p>}
                            {editMode &&
                            <input
                                required
                                onChange={handleChange}
                                value={values.major}
                                name="major"
                                id="majorInput"/>}
                        </div>
                        {errors.major && <span id='errorMessage'> {errors.major} </span>}


                        <div className="tutoringDetailItem">
                            <h3>Skills and abilities:</h3>
                            {!editMode && <p>{skills}</p>}
                            {editMode &&
                            <textarea
                                required
                                onChange={handleChange}
                                value={values.skills}
                                name="skills"
                                id="skillsInput"/>}

                        </div>
                        {errors.skills && <span id='errorMessage'> {errors.skills} </span>}
                        <div className="tutoringDetailItem">
                            <h3>Time availability:</h3>
                            {!editMode && <p>{timeAvailability}</p>}
                            {editMode &&
                            <input
                                required
                                onChange={handleChange}
                                value={values.timeAvailability}
                                name="timeAvailability"
                                id="timeAvailabilityInput"/>}

                        </div>
                        {errors.timeAvailability && <span id='errorMessage'> {errors.timeAvailability} </span>}
                        <div className="tutoringDetailItem">
                            <h3>What software do you prefer to use?</h3>
                            {!editMode && <p>{preferredSoftware}</p>}
                            {editMode &&
                            <input
                                onChange={handleChange}
                                value={values.preferredSoftware}
                                name="preferredSoftware"
                                placeholder=" eg. Skype or Zoom"
                                id="preferredSoftwareInput"/>}
                        </div>
                        {errors.preferredSoftware && <span id='errorMessage'> {errors.preferredSoftware} </span>}
                        <div className="tutoringDetailItem">
                            <h3>More details:</h3>
                            {!editMode && <p>{details}</p>}
                            {editMode &&
                            <textarea
                                onChange={handleChange}
                                value={values.details}
                                name="details"
                                id="detailsInput"/>}
                        </div>
                        {errors.details && <span id='errorMessage'> {errors.details} </span>}
                    </div>
                </div>}
            </div>)}
        </Formik>
    )
};

export default TutorCardSettingField;