import React, {useState} from 'react'
import './registerPage.css'
import Button from "@material-ui/core/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadImageWindow from "../uploadImageWindow/uploadImageWindow";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_THUMBNAIL} from "../graphQL/userMutation";

/* 
    The page for user to upload thumbnail and finish registration.
*/
const RegisterConfirmationPage = ({submit,currentUserId,goToSign,client}) => {
    const [cursorOn, setCursorOn] = useState(false);
    const [uploadImageWindow, toggleUploadImageWindow] = useState(false);
    const [updateThumbnailMutation] = useMutation(UPDATE_THUMBNAIL,{client});
    const [userThumbnail,setUserThumbnail] = useState();

    const updateThumbnail = async (pictureUrl) =>{
        updateThumbnailMutation({variables: {thumbnail:pictureUrl}}).then((result) =>{
            setUserThumbnail(pictureUrl);
            toggleUploadImageWindow(false)
        })
    };
    return (
        <div className="registerForm">
            <div className="authWrapperHeader">
                <span onClick={goToSign}>singularity</span>
            </div>
            {uploadImageWindow &&
            <div className="registerUploadThumbnailWrapper">
            <UploadImageWindow
                closeWindow={()=>toggleUploadImageWindow(false)}
                fileName={currentUserId.id}
                callback={pictureUrl=>updateThumbnail(pictureUrl)}
                type={"profileThumbnail"}
                customizedClient={client}/>
            </div>
            }

            <div className="addProfileRegister">
                <h1>Add profile picture</h1>
                <div className="registerThumbnail" onMouseEnter={()=>{setCursorOn(true)}}
                     onMouseLeave={() => {setCursorOn(false)}}>
                    {userThumbnail&&
                    <div>
                        <img src={userThumbnail}/>
                    </div>}
                    {
                        !userThumbnail&&
                        <div>
                            <div className="registerThumbnailCover" onClick={() => toggleUploadImageWindow(true)}>
                                {cursorOn&&<AddAPhotoIcon/>}
                            </div>
                            <AccountCircleIcon/>
                        </div>
                    }

                </div>

            </div>
            <div className="nextSignUpPageButton">
                <Button onClick={submit} type="submit">Finish</Button>
            </div>
        </div>

    );
};

export default RegisterConfirmationPage;