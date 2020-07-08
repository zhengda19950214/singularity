import React, {useState} from 'react'
import './NeedTutoringPopUpPage.css'
import Button from "@material-ui/core/Button";
import NeedTutoringPageTwo from "./NeedTutoringPageTwo";
import NeedTutoringPageThree from "./NeedTutoringPageThree";
import {useMutation} from "@apollo/react-hooks";
import {POST_TUTORING_POST} from "../../graphQL/tutoringMutation";

const NeedTutoringPopUpPage = ({setPopUpWindow}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [tutorPostValues, setTutorPostValues] = useState();
    const [postTutoringPost] = useMutation(POST_TUTORING_POST);

    const submitSecondPage = (values) => {
        setTutorPostValues(values);
        setPageNumber(3);
    };

    const submitTutoringPost =  (values) => {
        const tutoringFormFields =  {...tutorPostValues, ...values };
        postTutoringPost({ variables:tutoringFormFields}).then(()=>{
            setPopUpWindow(undefined)
        })
    };
    return (
        <div className="TutoringPopUpWrapper">
            {pageNumber === 1 &&
                <div className="TutorialPopUpPageOneWrapper">
                    <h1>Great!</h1>
                    <p>It is often a good idea to look for someone to teach you if you don’t understand something. We hope to provide easy accessibility to peer-to-peer learning by providing this platform where you can find a tutor that you are satisfied with. </p>
                    <p>We encourage you to:</p>
                        <ul>
                            <li>Ask the questions that you have while reading a textbook</li>
                            <li>Provide precise details of your problem in the description and describe your problems clearly</li>
                            <li>Offer an appropiate amount of compensation for the tutor to obtain the best tutor suited for your needs</li>
                        </ul>
                    <p>However, posts having following contents are strongly <span style={{color:"red"}}>FORBIDDEN</span>:</p>
                    <ul>
                        <li> Looking for someone to help you cheat/plagiarize</li>
                        <li> Expecting your tutor to do your assignment for you</li>
                    </ul>
                        <p>Now, let's get started!</p>
                    <Button onClick={()=>{setPageNumber(2)}}>Next</Button>
                </div>
            }
            {
                pageNumber === 2 &&
                <div className="NeedTutorialPageTwoWrapper">
                    <NeedTutoringPageTwo submitForm={submitSecondPage}/>
                </div>
            }
            {
                pageNumber === 3 &&
                <div className="NeedTutorialPageTwoWrapper">
                    <NeedTutoringPageThree submitForm={submitTutoringPost}/>
                </div>
            }
        </div>
    )
};

export default NeedTutoringPopUpPage;