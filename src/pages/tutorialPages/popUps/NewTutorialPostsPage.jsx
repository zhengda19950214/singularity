import React from 'react'
import TutorialPostCard from "../TutorialPostCard";

const NewTutorialPostsPage = () => {

    return (
        <div className="tutorialPosts">
        {[1,2,3,4,5].map(()=>(
            <TutorialPostCard/>
        ))}

    </div>)
}

export default NewTutorialPostsPage;