import React from 'react'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
const SchoolCard = ({university}) => {
    return (

        <div className="schoolCard">
            <div className="schoolIntroductionContent">
                <div className="schoolName">
                    <h1>{university.name}</h1>
                </div>
                <div className="schoolMember">
                    <PersonRoundedIcon/>
                    <span>{university.numberOfStudents}</span>
                </div>
            </div>
        </div>
    );
};


export default SchoolCard;