import React, {useState} from "react";
import './uploadImageWindow.css'
import ImageUploader from 'react-images-upload';
import {useMutation} from "@apollo/react-hooks";
import {UPLOAD_IMAGE} from "../graphQL/mutations";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import Resizer from 'react-image-file-resizer';

const UploadImageWindow = ({closeWindow, fileName, maxWidth, maxHeight,callback,type,customizedClient}) => {
    const [uploadImageMutation] = useMutation(UPLOAD_IMAGE,customizedClient?{client:customizedClient}:{});
    const [pictureUrl, setPictureUrl] = useState();


    const generateThumbnailName = () => {
        return fileName + ' '+Date.now();
    };
    const onDrop = (file) => {
        if(file.length>0){
            let reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = function () {
                Resizer.imageFileResizer(
                    file[0],
                    maxWidth || 200,
                    maxHeight || 200,
                    'PNG',
                    100,
                    0,
                    uri => {
                            uploadImageMutation({variables: {fileName:generateThumbnailName(),type,base64:uri}}).then ((result) => {
                                setPictureUrl(result.data.uploadImage)
                            })
                    },
                    'base64'
            );
        };
            reader.onerror = function (error) {
            };
        }
    };
    const updateThumbnail = () =>{
        callback(pictureUrl)
    };
    return (
        <div>
            <div className="uploadImageWindowCover">

            </div>
            <div className="uploadImageWindowWrapper">
                <h1> upload image</h1>
                <CloseIcon  onClick={() => closeWindow(false)} className="askQuestionFormClose"/>
                <div className="uploadContainer">
                    {!pictureUrl &&
                    <ImageUploader
                        fileContainerStyle={{background: "white", boxShadow: "0 0 0 0", border: "0 white",width:"100%"}}
                        buttonStyles={{background: "rgba(255, 146, 64, 0.27)", borderRadius: "6px", color: "#FF9240"}}
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                        style={{background: "white"}}
                    />}
                </div>
                {pictureUrl &&
                <div className="uploadedImageContainer">
                    <div>
                        <img width="160px" height="160px" src={pictureUrl} />
                    </div>
                    <Button onClick={updateThumbnail}>Save</Button>
                    <Button onClick={()=>{setPictureUrl()}}>Cancel</Button>
                </div>}
            </div>
        </div>
    )
};
export default UploadImageWindow;