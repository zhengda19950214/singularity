import React from 'react'
import TutoringApplicationContent from "./TutoringApplicationContent";

const MyTaskCard = ({post}) => {
    return (
        <div className="MyTutorPostCardWrapper">
            <TutoringApplicationContent tutorPost={post} myTasksContent={true}/>
        </div>
    )
};

export default MyTaskCard;