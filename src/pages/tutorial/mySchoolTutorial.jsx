import React, {useState} from 'react'
import './tutorial.css'

const mySchoolTutorial = () =>{

    return (
        <div className="tutorialContainer">
            <h1>Welcome to My School!</h1>
            <div className='mySchoolContent'>
                <div style={{animationDelay:'0.5s'}} className='mySchoolWordContent'>
                    <span>
                        In the My school page, posts are only available for you and your schoolmates. Sometimes,the questions you want to ask are only relevant to your campus.
                    </span>

                </div>
                <img style={{animationDelay:'1s',float:'right'}} src={require('../../resource/mySchoolTutorial1.png')}/>
            </div>
            <div className='mySchoolContent'>
                <img style={{animationDelay:'2s'}}  src={require('../../resource/mySchoolTutorial2.png')}/>
                <div  style={{animationDelay:'2.5s',float:'right'}} className='mySchoolWordContent'>
                    <span>
                        You can choose to post any of your questions and articles to My school by simply checking a box. 
                    </span>

                </div>

            </div>
            <div className='mySchoolContent'>
                <div style={{animationDelay:'3.5s'}} className='mySchoolWordContent'>
                    <span>
                        In the future, we will introduce many more services for you and your schoolmates to get the full college experience.
                    </span>

                </div>
                <img style={{animationDelay:'4s',float:'right'}} src={require('../../resource/mySchoolTutorial3.png')}/>
            </div>


        </div>

    )

};
export default mySchoolTutorial;