import React, {Fragment, useState} from 'react'
import './TutorialPostCard.css'
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TimeAgo from "react-timeago";
import databaseTimeZoneSuffix from "../utils/constants";
import ReportWindow from "../utils/reportWindow";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const TutorialPostCard = ({setPopUpWindowType, post, myPost, setPopUpCallBackFunction}) => {
    const {topics, title, fee, description, lastUpdated, user} = post;
    const [applied, setApplied] = useState(post.applied);
    const [report, setReport] = useState(false);
    const [toolWindowOpen, setToolWindowOpen] = useState(false);

    return (
        <Fragment>
            {report && <ReportWindow user={user}
                                     reportContent={`We have received a report on tutor post, tutor post id is ${post.id}`}
                                     closeWindow={() => {
                                         setReport(false)
                                     }}
                                     tutorPostReport={true}
                                     reportType="Tutor Post"
            />}
        <div className="tutorialCard">
            <div className="tutorialPostCardHeader">
                <div className="tutorialTopics">
                    {topics.map(topic => {
                        return (
                            <Link key={topic.id} to={"/topic/" + topic.id}><span>#{topic.name}</span></Link>)
                    })}
                </div>
                <div className="showTutoringPostDetail" style={{width: "25px"}}>
                    <MoreHorizIcon onClick={() => setToolWindowOpen(!toolWindowOpen)}/>
                    {toolWindowOpen &&
                    <div className="cardToolWindow" style={{position: "absolute"}}>
                        <div onClick={() => {
                            setReport(true);
                        }} className="topicToolWindowSubSection">
                            <p style={{margin: 0}}>Report</p>
                        </div>

                    </div>}
                </div>
            </div>
            <div className="tutorialPostHeader">
                <h1>{title}</h1>
                <div className="tutorialPriceTag">
                    {fee}
                </div>
            </div>
            <div className="tutorialPostDescription">
                <p>
                    {description}
                </p>
            </div>
            <div className="tutorialPostTime">
                {<TimeAgo date={lastUpdated+databaseTimeZoneSuffix} live={false}/>}
            </div>
            <div className="tutorialPostFooter">
                <div className="tutorialPostUser">
                    <Link to={"/Profile/" + user.id}>
                        <img src={user.thumbnail || require('../../resource/ted.jpg')}/></Link>
                    <div className="tutorialPostUserDetail">
                        <Link to={"/Profile/" + user.id}><span>{`${user.firstName} ${user.lastName}`}</span></Link>
                        <h2 id="education">{`${user.year} ${user.major}`}</h2>
                    </div>

                </div>
                {!myPost && (applied ? <Button style={{background: "#dcdcdc"}} disabled={applied}> <span style={{textDecoration: "none", color:"grey"}}>Applied</span></Button>:
                <Button onClick={
                    () => {
                        setPopUpCallBackFunction(() => () => setApplied(true));
                        setPopUpWindowType(post)
                    }
                } disabled={applied} > <span style={{textDecoration: "none"}}>Apply</span></Button>)}
            </div>
        </div>
        </Fragment>
    )
};
export default TutorialPostCard;