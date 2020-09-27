import React, {useState} from 'react'
import './tutorial.css'

const tutoringTutorial = () =>{

    return (
        <div className="tutorialContainer">
            <h1>Welcome to Tutoring!</h1>
            <div className='mySchoolContent'>
                <div style={{animationDelay:'0.5s'}} className='mySchoolWordContent'>
                    <span>
                        In the Tutoring page, you can either learn what you want to know or teach what you are good at. Or both.
                    </span>

                </div>
                <img style={{animationDelay:'1s',float:'right'}} src={require('../../resource/tutoringTutorial2.png')}/>
            </div>
            <div className='mySchoolContent'>
                <img style={{animationDelay:'2s'}}  src={require('../../resource/tutoringTutorial3.png')}/>
                <div  style={{animationDelay:'2.5s',float:'right'}} className='mySchoolWordContent'>
                    <span>
                        As a tutee, you can pick your own tutor. Don't forget to rate your tutor afterward.
                    </span>

                </div>

            </div>
            <div className='mySchoolContent'>
                <div style={{animationDelay:'3.5s'}} className='mySchoolWordContent'>
                    <span>
                        As a tutor, teaching your peers can help you solidify your knowledge on the subject. It is also a nice way to earn some tips.
                    </span>

                </div>
                <img style={{animationDelay:'4s',float:'right'}} src={require('../../resource/tutoringTutorial1.png')}/>
            </div>


        </div>

    )

};
export default tutoringTutorial;