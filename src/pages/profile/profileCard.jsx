
import React, {useState} from "react";
import './profilePage.css'
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SendIcon from '@material-ui/icons/Send';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";
import {useMutation} from "@apollo/react-hooks";
import {FOLLOW_USER, UN_FOLLOW_USER, UPDATE_THUMBNAIL} from "../graphQL/userMutation";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DoneIcon from '@material-ui/icons/Done';
const ProfileCard = ({userInformation,isMe,toggleVisitorMode,visitorMode,createOverviewMessage,openMessageMenu}) => {
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);
    const [updateThumbnailMutation] = useMutation(UPDATE_THUMBNAIL);
    const [userThumbnail,setUserThumbnail] = useState(userInformation.thumbnail);
    const [followed,setFollowed] = useState(userInformation.followed);
    const [followMutation] = useMutation(FOLLOW_USER);
    const [unFollowMutation] = useMutation(UN_FOLLOW_USER);
    const [followNumber,setFollowNumber] = useState(userInformation.numberOfFollowers);
    const updateThumbnail = (pictureUrl) =>{
        updateThumbnailMutation({variables: {thumbnail:pictureUrl}}).then(() =>{
            setUserThumbnail(pictureUrl);
            toggleUploadImageWindow(false)
        })
    };
    const toggleFollow = () =>{
        if(followed){
            unFollowMutation({variables: {followedUserID:userInformation.id}}).then(()=>{
                setFollowed(false);
                setFollowNumber(followNumber-1);
            }).catch((err)=>{console.log(err)})
        }
        else{
            followMutation({variables: {userIDToFollow:userInformation.id}}).then(()=>{
                setFollowed(true);
                setFollowNumber(followNumber+1);
            }).catch((err)=>{console.log(err)})
        }
    };
    const sendMessage = () => {
        createOverviewMessage(userInformation);
        openMessageMenu(true);
    };
    return (
        <div className="card">
            {uploadImageWindow &&
                <UploadImageWindow
                    fileName={userInformation.id}
                    closeWindow={()=>toggleUploadImageWindow(false)}
                    callback={pictureUrl=>updateThumbnail(pictureUrl)}
                    type={"profileThumbnail"}/>
            }
            <div className="profileCardTop">
                <div className="profileThumbnail" onMouseEnter={()=>{setCursorOn(true)}}
                     onMouseLeave={() => {setCursorOn(false)}}>
                    {isMe&&<div className="profileThumbnailCover" onClick={() => toggleUploadImageWindow(true)}>
                        {cursorOn&&<AddAPhotoIcon/>}
                    </div>}
                    <img height="130px" width="130px" src={userThumbnail}/>
                </div>
                <div className="profileName">
                    <h1>{userInformation.firstName+' '+ userInformation.lastName}</h1>
                </div>
                <div className="profileHeaderAction">
                    {isMe&& <div id="MyFollowNumber" > <PersonIcon/><span>{followNumber}</span></div>}
                    {!isMe&& <Button id="followNumber" onClick={()=>{toggleFollow()}}> {followed && <DoneIcon/>}{!followed && <PersonAddIcon/>}<span>{followNumber}</span></Button>}
                    {!isMe&&<Button id="message" onClick={()=>sendMessage()}><SendIcon/> <span>Message</span></Button>}
                    {isMe &&<Button id="preview" onClick={toggleVisitorMode}>{!visitorMode&&<VisibilityIcon/>}{visitorMode&&<VisibilityOffIcon/>} <span style={{textDecoration:'none'}}>Preview</span></Button>}
                </div>
            </div>
            <div className="profileCardBottom">
                <div className="profileUniversityIntro">
                    <ul>
                        <li>{userInformation.university.name}</li>
                        <li>{userInformation.major}</li>
                        <li>{userInformation.year}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default ProfileCard