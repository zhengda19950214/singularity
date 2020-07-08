import React, {Fragment, useState} from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {DEAL_TUTORING_APPLICATION} from "../graphQL/tutoringMutation";
import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import databaseTimeZoneSuffix from "../utils/constants";

const TutorApplicationCard = ({application, postID, refetch, openSpecificUserWindow}) => {
    const [showDetail, setShowDetail] = useState(true);
    const [dealPopupWindow, setDealPopupWindow] = useState(false);
    const [dealTutorPostMutation] = useMutation(DEAL_TUTORING_APPLICATION);

    const dealTutorPost = () => {
        dealTutorPostMutation({variables: {tutorID: user.id, postID}}).then(
            () => {
                refetch();
                setDealPopupWindow(false);
            }
        )
    };
    const {user, lastUpdated} = application;
    return (
        <Fragment>
            <div className="tutorApplicationCardHeader">
                <div className="tutorialPostUser" style={{width: "100%"}}>
                    <Link to={"/Profile/" + user.id}>
                        <img src={user.thumbnail || require('../../resource/ted.jpg')}/></Link>
                    <div className="tutorialPostUserDetail" style={{width: "85%"}}>
                        <Link to={"/Profile/" + user.id}><span
                            style={{float: "left"}}>{`${user.firstName} ${user.lastName}`}</span></Link>
                        <p> {<TimeAgo date={lastUpdated+databaseTimeZoneSuffix} live={false}/>}</p>
                        <h2 id="education">{`${user.university.name} ${user.major} ${user.year}`}</h2>
                    </div>
                    <ArrowDropDownIcon onClick={() => setShowDetail(!showDetail)}/>
                </div>
            </div>
            {
                showDetail &&
                <div className="tutoringApplicationBottomPart">
                    {
                        dealPopupWindow &&
                        <div className="tutorPostConfirmationPopUpWindow">
                            <h3>Are you sure?</h3>
                            <p>Make sure you have discussed before making this deal. This action cannot be undone. </p>
                            <div className="dealPopupWindowActions">
                                <Button id="popUpSecondaryButton" onClick={() => {
                                    setDealPopupWindow(false)
                                }}>Cancel</Button>
                                <Button id="popUpPrimaryButton" onClick={dealTutorPost}>Deal</Button>
                            </div>
                        </div>
                    }
                    <div className="tutoringDetailItem">
                        <h3>Rating:</h3>
                        <div id="tutorCardSettingHeader" style={{display: 'flex'}}>
                            <Rating name="disabled" value={user.tutorRating} disabled id="rating"/>
                            <p id="ratingNumber" style={{marginTop: "2px"}}>({user.ratingCount})</p>
                        </div>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>What year are you in?</h3>
                        <p>{application.year}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>What's your major/research direction?</h3>
                        <p>{application.major}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Skills and abilities:</h3>
                        <p>{application.skills}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Time availability:</h3>
                        <p>{application.timeAvailability}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>What software do you prefer to use?</h3>
                        <p>{application.preferredSoftware}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>More details:</h3>
                        <p>{application.details}</p>
                    </div>
                    <div className="tutoringDetailItem">
                        <h3>Estimated time needed:</h3>
                        <p>{application.timeNeeded}</p>
                    </div>
                    <div className="tutoringApplicationCardFooter">
                        <Button id="message" onClick={() => openSpecificUserWindow(user)}>Message</Button>
                        <Button id="deal" onClick={() => {
                            setDealPopupWindow(true)
                        }}>Deal!</Button>
                    </div>
                </div>
            }

        </Fragment>
    )
};

export default TutorApplicationCard;
