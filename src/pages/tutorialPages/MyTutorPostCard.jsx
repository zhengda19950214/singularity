import React, {Fragment} from 'react'
import TutoringApplicationContent from "./TutoringApplicationContent";
import TutorApplicationCard from "./TutorApplicationCard";
import RatingTutor from "./RatingTutor";

const MyTutorPostCard = ({post, refetch, openSpecificUserWindow}) => {
    const {deal, applications} = post;
    return (
        <div className="MyTutorPostCardWrapper">
            <TutoringApplicationContent tutorPost={post} myPostsContent={true} refetch={refetch}/>
            <div className="tutorsApplicationWrapper">
                <div id="lineBreak"/>
                {deal ? <RatingTutor refetch={refetch} post={post}/> :
                    <Fragment>
                        {(applications.length > 0) ?
                        <Fragment>
                            <h1>Tutors:</h1>
                            {post.applications.map(
                                application => (
                                    <TutorApplicationCard application={application} postID={post.id} refetch={refetch}
                                                          openSpecificUserWindow={openSpecificUserWindow}/>
                                )
                            )}
                        </Fragment>
                        :
                        <Fragment>
                            <h1>Tutors:</h1>
                            <span style={{fontSize: '15px', color: "#797979"}}>(No tutor has applied yet.)</span>
                        </Fragment>}
                    </Fragment>}
            </div>
        </div>
    )
};

export default MyTutorPostCard;