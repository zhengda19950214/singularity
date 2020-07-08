import React  from "react";
import './sharePopup.css'
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon, LinkedinShareButton,
    TumblrIcon, TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";
import {CopyToClipboard} from "react-copy-to-clipboard";
const SharePopup = ({url="www.singularity.com"}) => {
    return (
        <div className="sharePopupWrapper">
            <div className="topPart">
                <span> Share to: </span>
                <TwitterShareButton className="shareButton" style={{float:"left"}} url={url}><TwitterIcon size={20} round={true} /></TwitterShareButton>
                <FacebookShareButton className="shareButton" style={{float:"left"}} url={url}><FacebookIcon size={20} round={true} /></FacebookShareButton>
                <LinkedinShareButton className="shareButton" style={{float:"left"}} url={url}><LinkedinIcon size={20} round={true} /></LinkedinShareButton>
                <TumblrShareButton className="shareButton" style={{float:"left"}} url={url}><TumblrIcon size={20} round={true} /></TumblrShareButton>
            </div>
            <div style={{borderBottom:"1px solid #BCBCBC" ,width:"90%",position:"relative",left:"10px"}}/>
            <div className="bottomPart">
                <div className="shareUrlArea"><p>{url}</p></div>
                <CopyToClipboard  text={url}><span>copy</span></CopyToClipboard>
            </div>
        </div>
    )
};
export default SharePopup;