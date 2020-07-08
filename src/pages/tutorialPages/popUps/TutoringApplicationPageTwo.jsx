import React, {useState} from 'react'
import {Formik} from "formik";
import Dropdown from "react-dropdown";
import {degreeYearRange} from "../../utility/dateFixture";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {APPLY_TUTORING_POST} from "../../graphQL/tutoringMutation";
import validateTutorCardForm from "../../utils/validation";

const TutoringApplicationPageTwo = ({goToNextPage, post, tutorCard, popUpCallBackFunction}) => {
    const {year, major, skills, timeAvailability, preferredSoftware, details} = tutorCard;
    const [degreeYear, setDegreeYear] = useState({value: year, label: year});
    const [applyTutoringPost] = useMutation(APPLY_TUTORING_POST);

    return (
        <div className="tutoringApplicationWrapper">
            <h1>Apply for {post.title}</h1>
            <Formik
                initialValues={{major, skills, timeAvailability, preferredSoftware, details, timeNeeded: ''}}
                onSubmit={(values) => {
                    applyTutoringPost({variables: {...values, year: degreeYear.value, postID: post.id}}).then(() => {
                        popUpCallBackFunction({variables: {lastOffset: 0}});
                        goToNextPage();
                    });
                }}
                validate={validateTutorCardForm}
            >{({
                   values,
                   handleChange,
                   handleSubmit,
                   errors,
               }) => (
                <form onSubmit={handleSubmit} autocomplete="off">
                    <h2>What year are you in? *</h2>
                    <Dropdown required options={degreeYearRange}
                              value={degreeYear} onChange={(data) => {
                        setDegreeYear(data)
                    }}
                              id="majorYearPicker" placeholder={degreeYearRange[0]}/>
                    <h2>What's your major/research direction?*</h2>
                    <input
                        required
                        onChange={handleChange}
                        value={values.major}
                        name="major"
                        id="majorInput"/>
                    {errors.major && <span id='errorMessage'> {errors.major} </span>}
                    <h2>Skills and abilities*</h2>
                    <textarea
                        required
                        onChange={handleChange}
                        value={values.skills}
                        name="skills"
                        id="skillsInput"/>
                    {errors.skills && <span id='errorMessage'> {errors.skills} </span>}
                    <h2>Time availability*</h2>
                    <input
                        required
                        onChange={handleChange}
                        value={values.timeAvailability}
                        name="timeAvailability"
                        id="timeAvailabilityInput"/>
                    {errors.timeAvailability && <span id='errorMessage'> {errors.timeAvailability} </span>}
                    <h2>What software do you prefer to use?</h2>
                    <input
                        onChange={handleChange}
                        value={values.preferredSoftware}
                        name="preferredSoftware"
                        placeholder=" eg. Skype or Zoom"
                        id="preferredSoftwareInput"/>
                    {errors.preferredSoftware && <span id='errorMessage'> {errors.preferredSoftware} </span>}
                    <h2>More details</h2>
                    <textarea
                        onChange={handleChange}
                        value={values.details}
                        name="details"
                        id="detailsInput"/>
                    {errors.details && <span id='errorMessage'> {errors.details} </span>}
                    <h2>Estimated time needed for this tutoring</h2>
                    <input
                        onChange={handleChange}
                        value={values.timeNeeded}
                        name="timeNeeded"
                        id="timeNeededInput"/>
                    <Button type="submit" style={{margin: '10px auto 10px auto'}}>Next</Button>
                </form>
            )}
            </Formik>

        </div>)
};

export default TutoringApplicationPageTwo;