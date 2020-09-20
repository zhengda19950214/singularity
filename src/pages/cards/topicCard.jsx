import React, {useState} from 'react'
import './topicCard.css'
import Button from "@material-ui/core/Button";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useMutation} from "@apollo/react-hooks";
import {FOLLOW_TOPIC, UN_FOLLOW_TOPIC, UPDATE_TOPIC} from "../graphQL/topicMutation";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";
import ReportWindow from "../utils/reportWindow";

const TopicCard = ({topic, editMode, setEditMode, topicFollowed}) => {
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const [editTopicName, setEditTopicName] = useState(false);
    const [followed, setFollowed] = useState(topicFollowed);
    const [editTopicDescription, setEditTopicDescription] = useState(false);
    const [topicName, setTopicName] = useState(topic.name);
    const [topicDescription, setTopicDescription] = useState(topic.description);
    const [topicThumbnail, setTopicThumbnail] = useState(topic.thumbnail || require('../../resource/default_topic_image.png'));
    const [updateTopicMutation] = useMutation(UPDATE_TOPIC);
    const [followTopicMutation] = useMutation(FOLLOW_TOPIC);
    const [unFollowTopicMutation] = useMutation(UN_FOLLOW_TOPIC);
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);
    const [report, setReport] = useState(false);

    const followTopic = () => {
        followTopicMutation({variables: {topicID: topic.id}}).then(result => {
            if (!result.data.followTopic) {
                alert("something went wrong");
            } else {
                setFollowed(true);
            }
        })
    };
    const unFollowTopic = () => {
        unFollowTopicMutation({variables: {topicID: topic.id}}).then(result => {
            if (!result.data.unFollowTopic) {
                alert("something went wrong");
            } else {
                setFollowed(false);
            }
        })
    };
    const updateThumbnail = (pictureUrl) => {
        updateTopicMutation({
            variables: {
                topicID: topic.id,
                topicName,
                topicDescription,
                topicThumbnail: pictureUrl
            }
        }).then(result => {
            if (result.data) {
                setTopicThumbnail(pictureUrl);
                toggleUploadImageWindow(false)
            }

        });
    };
    const updateTopicDescription = () => {
        if (editTopicDescription) {
            updateTopicMutation({
                variables: {
                    topicID: topic.id,
                    topicName,
                    topicDescription,
                    topicThumbnail
                }
            }).then(result => {
                if (result.data) {
                    setEditTopicDescription(false)
                }

            })
        } else {
            setEditTopicDescription(true)
        }
    };
    const updateTopicName = () => {
        if (editTopicName) {
            updateTopicMutation({
                variables: {
                    topicID: topic.id,
                    topicName,
                    topicDescription,
                    topicThumbnail
                }
            }).then(result => {
                if (result) {
                    setEditTopicName(false)
                }
            })
        } else {
            setEditTopicName(true)
        }
    };
    const resetEverything = () => {
        setToolWindowOpen(false);
        setEditTopicDescription(false);
        setEditTopicName(false);
    };
    return (
        <div className="card">
            {report && <ReportWindow
                reportContent={`We have received a report on topic tutor post id is ${topic.id}`}
                closeWindow={() => {
                    setReport(false)
                }}
                reportType='Topic'
            />}
            {uploadImageWindow &&
            <UploadImageWindow
                fileName={topic}
                closeWindow={() => toggleUploadImageWindow(false)}
                callback={pictureUrl => updateThumbnail(pictureUrl)}
                type={"topicThumbnail"}/>
            }
            <div className="topicLeftDiv">
                <div className="topicThumbnail" onMouseEnter={() => {
                    setCursorOn(true)
                }}
                     onMouseLeave={() => {
                         setCursorOn(false)
                     }}>
                    {editMode && <div className="topicThumbnailCover" onClick={() => toggleUploadImageWindow(true)}>
                        {cursorOn && <AddAPhotoIcon/>}
                    </div>}
                    <img src={topicThumbnail}/>
                </div>
                {(!editMode && !followed) && <Button onClick={followTopic}><p>+ follow</p></Button>}
                {(!editMode && followed) && <Button onClick={unFollowTopic}><p>Followed</p></Button>}
                {editMode &&
                <div className="lastUpdateInformation">


                </div>}
            </div>

            <div className="topicRightDiv">
                <div className="topicToolButton">
                    <MoreVertIcon onClick={() => {
                        setToolWindowOpen(!toolWindowOpen)
                    }}/>
                    {toolWindowOpen &&
                    <div className="topicToolWindow">
                        <div className="topicToolWindowSubSection" onClick={() => setReport(true)}>
                            <p>Report</p>
                        </div>
                        <div onClick={() => {
                            setEditMode(!editMode);
                            resetEverything()
                        }} className="topicToolWindowSubSection">
                            <p>Manage</p>
                        </div>
                    </div>}
                </div>
                <div className="topicCardHeader">
                    {editTopicName && <input value={topicName} onChange={(e) => {
                        setTopicName(e.target.value)
                    }}/>}
                    {!editTopicName && <h1>#{topicName}</h1>}
                    {editMode && <p style={{color: "#169BD5", textAlign: "center"}}
                                    onClick={updateTopicName}>{!editTopicName ? "Edit" : "Save"}</p>}
                </div>
                <div className="topicDescription">
                    {editTopicDescription && <textarea value={topicDescription} onChange={(e) => {
                        setTopicDescription(e.target.value)
                    }}/>}
                    {!editTopicDescription && <p> {topicDescription}</p>}
                    {editMode && <span style={{color: "#169BD5", textAlign: "center"}}
                                       onClick={updateTopicDescription}
                    >{!editTopicDescription ? "Edit" : "Save"}</span>}
                </div>
            </div>
        </div>
    );
};


export default TopicCard;