import React, {Fragment, useState} from 'react'
import {Link} from "react-router-dom";
import './TutoringApplicationContent.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {DELETE_TUTOR_POST} from "../graphQL/tutoringMutation";
import ReportWindow from "../utils/reportWindow";

const TutoringApplicationContent = ({tutorPost, myTasksContent = false, myPostsContent = false, refetch}) => {
    const {user} = tutorPost;
    const {deal, title, description, fee, keyConcepts, timeAvailability, finishBy, preferredSoftware, materials} = tutorPost;
    const [showDetail, setShowDetail] = useState((!deal || myTasksContent));
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const [deletePopupWindow, setDeletePopupWindow] = useState(false);
    const [deleteTutorPost] = useMutation(DELETE_TUTOR_POST);
    const [report, setReport] = useState(false);

    const deleteMyPost = () => {
        deleteTutorPost({variables: {postID: tutorPost.id}}).then(
            () => {
                setDeletePopupWindow(false);
                refetch();
            }
        )
    };
    return (
        <Fragment>
            {report && <ReportWindow user={user}
                                     reportContent={`We have received a report on tutor post, tutor post id is ${tutorPost.id}`}
                                     closeWindow={() => {
                                         setReport(false)
                                     }}
                                     tutorPostReport={true}
                                     reportType="Tutor Post"
            />}
            <div className="tutoringApplicationWrapper">
                {
                    deletePopupWindow &&
                    <div className="tutorPostConfirmationPopUpWindow">
                        <h3>Delete?</h3>
                        <p style={{height: "40px"}}>Are you sure you want to delete this? <span
                            style={{fontWeight: "bold"}}>This action cannot be undone.</span></p>
                        <div className="dealPopupWindowActions">
                            <Button id="popUpSecondaryButton" onClick={() => {
                                setDeletePopupWindow(false)
                            }}>Cancel</Button>
                            <Button id="popUpPrimaryButton" onClick={deleteMyPost}>Delete</Button>
                        </div>
                    </div>
                }
                <div className="tutoringApplicationHeader">
                    <div className="tutorialTopics">
                        {tutorPost.topics.map(topic => {
                            return (
                                <Link key={topic.id} to={"/topic/" + topic.id}><span>#{topic.name}</span></Link>)
                        })}
                    </div>

                    <div className="tutorialTitle">
                        <h1>{title}</h1>
                        {(deal && !myTasksContent) && <div className="showTutoringPostDetail">
                            <span>(Details)</span>
                            <ArrowDropDownIcon onClick={() => setShowDetail(!showDetail)}/>
                        </div>}
                        {(myPostsContent && !deal) && <div className="showTutoringPostDetail" style={{width: "25px"}}>
                            <MoreHorizIcon onClick={() => setToolWindowOpen(!toolWindowOpen)}/>
                            {toolWindowOpen &&
                            <div className="cardToolWindow" style={{position: "absolute"}}>
                                <div onClick={() => {
                                    setDeletePopupWindow(true);
                                }} className="topicToolWindowSubSection">
                                    <p style={{margin: 0}}>Delete</p>
                                </div>
                            </div>}
                        </div>}
                        {myTasksContent && <div className="showTutoringPostDetail" style={{width: "25px"}}>
                            <MoreHorizIcon onClick={() => setToolWindowOpen(!toolWindowOpen)}/>
                            {toolWindowOpen &&
                            <div className="cardToolWindow" style={{position: "absolute"}}>
                                <div onClick={() => {
                                    setReport(true);
                                }} className="topicToolWindowSubSection">
                                    <p style={{margin: 0}}>Report</p>
                                </div>

                            </div>}
                        </div>}

                    </div>
                    {
                        myTasksContent &&
                        <div className="tutorialPostUser" style={{width: "100%"}}>
                            <img src={user.thumbnail || require('../../resource/ted.jpg')}/>
                            <div className="tutorialPostUserDetail" style={{width: "85%"}}>
                                <span>{`${user.firstName} ${user.lastName}`}</span>
                                <h2 id="education">{`${user.university.name} ${user.major} ${user.year}`}</h2>
                            </div>
                        </div>
                    }

                    {showDetail && <p>
                        {description}
                    </p>}
                </div>
                {showDetail &&
                <div className="tutoringApplicationBottomPart">
                    <div id="lineBreak"/>
                    <h2>Details: </h2>
                    <div className="tutoringDetailItem">
                        <h3>Tutoring fee</h3>
                        <p> {fee}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Key concepts</h3>
                        <p>{keyConcepts}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Time availability:</h3>
                        <p>{timeAvailability}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Finish by</h3>
                        <p>{finishBy}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>What software do you prefer?</h3>
                        <p>{preferredSoftware}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Will you provide any materials?</h3>
                        <p>{materials ? "Yes" : "No"}</p>
                    </div>
                </div>
                }
            </div>
        </Fragment>

    )
};

export default TutoringApplicationContent;