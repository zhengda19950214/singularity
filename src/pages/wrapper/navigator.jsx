import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import SearchInput from "./searchInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined';
import { Auth } from 'aws-amplify';

/* 
    Navigation bar for user to navgiate between three components: Home, question, School.
    Also provide the account icon for user to access the account management page and search ability.
*/

const Navigator = ({setPopUpWindow,selectedPage,me}) => {
    const [toolWindowOpen, setToolWindowOpen] = useState(false);
    const signOut = () => {
        Auth.signOut()
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="navBar">
                <nav>
                    <div className="logoArea">
                        <img className='logoIcon' width="20px" height="35px" src={require('../../resource/icon.png')}/>
                        <Link to={"/home"}><h1 className="logo">singularity</h1></Link>
                    </div>
                    <div className='navCenter'>
                        <div className="tags">
                            <ol>
                                <li className={selectedPage==="Home"?"activeLink":"unActiveLink"}><Link to='/Home'>Home</Link></li>
                                <li className={selectedPage==="Answer"?"activeLink":"unActiveLink"}><Link to='/Answer'>Answer</Link></li>
                                <li className={selectedPage==="MySchool"?"activeLink":"unActiveLink"}><Link to='/MySchool'>My school</Link></li>
                                <li className={selectedPage==="Tutoring"?"activeLink":"unActiveLink" }><Link to='/Tutoring'>Tutoring</Link></li>

                            </ol>
                        </div>
                        <SearchInput/>
                        <Button onClick={()=>setPopUpWindow("schoolTutorial")}>1</Button>
                        <Button onClick={()=>setPopUpWindow("tutoringTutorialPopup")}>2</Button>

                        <div className="askQuestionWrapper">
                            <Button id="askQuestionButton" onClick={()=>setPopUpWindow("postQuestion")}>
                                <AddBoxOutlined/><span>Question</span>
                            </Button>
                            <Link to='/addArticle'>
                                <Button id="postArticleButton">
                                    <AddBoxOutlined/><span>Article</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="accountArea">
                        <div className="accountIcon" onClick={()=>{setToolWindowOpen(!toolWindowOpen)}}>
                            {me.thumbnail?<img src={me.thumbnail}/>:<AccountCircleIcon/>}
                            {toolWindowOpen &&
                            <div className="wrapperToolWindow">
                                <a href={'/Profile/'+me.id}>
                                <div className="wrapperToolWindowSubSection">
                                   <span>{me.firstName + me.lastName}</span>
                                </div></a>
                                <div className="wrapperToolWindowSubSection">
                                    <span>Notification</span>
                                </div>
                                <div onClick={signOut} className="wrapperToolWindowSubSection">
                                    <span style={{color: "#FF9240"}}>Logout</span>
                                </div>
                            </div>}
                        </div>
                    </div>
                </nav>
            </div>
        </div>)
};
export default Navigator;