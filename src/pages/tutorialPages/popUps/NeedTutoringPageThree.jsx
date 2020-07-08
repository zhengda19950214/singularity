import React, {Fragment, useState} from 'react'
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import Dropdown from "react-dropdown";
import {tutorialPostPriceRange} from "../../utility/dateFixture";

const NeedTutoringPageThree = ({submitForm}) => {
    const [tutorPrice, setTutorPrice] = useState({label: tutorialPostPriceRange[0], value: tutorialPostPriceRange[0]});
    const [provideMaterial, setProvideMaterial] = useState({label: "Yes", value: "Yes"});

    return (
        <Fragment>
            <h1>Tutoring Post</h1>
            <Formik
                initialValues={{keyConcepts: '', timeAvailability: '', finishBy: '', preferredSoftware: ''}}
                onSubmit={(values) => {
                    submitForm({...values, fee: tutorPrice.value, materials: provideMaterial.value === "Yes"});
                }}
            >{({
                   values,
                   handleChange,
                   handleSubmit,
               }) => (
                <form onSubmit={handleSubmit} autocomplete="off">
                    <h2>Tutoring fee*</h2>
                    <Dropdown required options={tutorialPostPriceRange}
                              id="majorYearPicker" value={tutorPrice} onChange={(data) => {
                        setTutorPrice(data)
                    }}/>
                    <h2>Key concepts*</h2>
                    <input
                        placeholder='   eg.Pythagorean Theorem; Triangle Inequality'
                        required
                        onChange={handleChange}
                        value={values.keyConcepts}
                        name="keyConcepts"
                        id="keyConceptsInput"/>
                    <h2>Time availability*</h2>
                    <textarea
                        placeholder='   Briefly describe your time availability for tutoring.'
                        required
                        onChange={handleChange}
                        value={values.timeAvailability}
                        name="timeAvailability"
                        id="timeAvailabilityInput"/>
                    <h2>Finish by*</h2>
                    <input
                        placeholder="   When is your deadline?"
                        required
                        onChange={handleChange}
                        value={values.finishBy}
                        name="finishBy"
                        id="finishByInput"/>
                    <h2>What software do you prefer to use?</h2>
                    <input
                        onChange={handleChange}
                        value={values.preferredSoftware}
                        name="preferredSoftware"
                        placeholder="   eg. Skype or Zoom"
                        id="preferredSoftwareInput"/>
                    <h2>Will you provide any materials? (textbook, note slides etc)</h2>
                    <Dropdown style={{marginTop:'20px'}}required options={["Yes", "No"]}
                              value={provideMaterial} onChange={(data) => {
                        setProvideMaterial(data)
                    }}/>
                    <Button type="submit">Submit</Button>
                </form>
            )}
            </Formik>

        </Fragment>)
};

export default NeedTutoringPageThree;