import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import ICanTeachPageTwo from "./ICanTeachPageTwo";
import './ICanTeachPopUpPage.css'

const ICanTeachPopUpPage = ({tutorCard}) => {
    const [pageNumber, setPageNumber] = useState(tutorCard ? 3 : 1);
    const [windowTopPosition, setWindowTopPosition] = useState('100px');
    return (
        <div className="TutoringPopUpWrapper" style={{width: "345px", top: windowTopPosition}}>
            {pageNumber === 1 &&
            <div className="ICanTeachPageOneWrapper">
                <h1>Great!</h1>
                <p>We welcome everyone to pass on their knowlege here. It doesn't matter if you are junior or senior,
                    you can become a good tutor as long as you do the following:</p>
                <ul>
                    <li>Fully master the subject you plan to teach</li>
                    <li>Able to make a tutoring plan</li>
                    <li>Exhibit patience and able to breakdown difficult things in a clear and concise way</li>
                </ul>
                <p>If you can do all this, there are only a few more steps and then you can start! Happy tutoring!</p>
                <Button onClick={() => {
                    setPageNumber(2);
                    setWindowTopPosition('100px')
                }} style={{marginLeft: '0'}}>Next</Button>
            </div>
            }
            {
                pageNumber === 2 &&
                <div className="ICanTeachPageTwoWrapper">
                    <ICanTeachPageTwo goToNextPage={() => {
                        setPageNumber(3);
                        setWindowTopPosition('250px')
                    }}/>
                </div>
            }
            {
                pageNumber === 3 &&
                <div className="ICanTeachPageThreeWrapper">
                    <h1>You are all set!</h1>
                    <p>Now you can start your tutoring, good luck!</p>
                </div>
            }
        </div>
    )
};

export default ICanTeachPopUpPage;