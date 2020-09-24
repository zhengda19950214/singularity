import React, {useState} from 'react'
import './tutorial.css'

const mySchoolTutorial = () =>{

    return (
        <div className="tutorialContainer">
            <h1>Welcome to My School!</h1>
            <div className='mySchoolContent'>
                <div style={{animationDelay:'0.5s'}} className='mySchoolWordContent'>
                    <span>
                        In my school page, posts are only available for you and your schoolmates. Sometimes, others can never understand.
                    </span>

                </div>
                <img style={{animationDelay:'1s',float:'right'}} src={require('../../resource/mySchoolTutorial1.png')}/>
            </div>
            <div className='mySchoolContent'>
                <img style={{animationDelay:'2s'}}  src={require('../../resource/mySchoolTutorial2.png')}/>
                <div  style={{animationDelay:'2.5s',float:'right'}} className='mySchoolWordContent'>
                    <span>
                        You can post my-school posts in any post form. Just remember to check the box.
                    </span>

                </div>

            </div>
            <div className='mySchoolContent'>
                <div style={{animationDelay:'3.5s'}} className='mySchoolWordContent'>
                    <span>
                        In the future, we will introduce many more services just for you. And your schoolmates.
                    </span>

                </div>
                <img style={{animationDelay:'4s',float:'right'}} src={require('../../resource/mySchoolTutorial3.png')}/>
            </div>


        </div>

    )

};
export default mySchoolTutorial;