import React from "react";
import Typography from "@material-ui/core/Typography";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const ProfileQuestionCard = ({post,content,type, topics}) => {
    const {user}=post;
    const link = type === "article" ? "/article/"+post.id : "/question/"+post.id;
    return (
        <div className="card">
            <div className="questionHeader">
                <div className="questionTopics">{
                    topics &&
                    topics.map(topic => {
                        return (<Link key={topic.id} to={"/topic/"+topic.id}><span>#{topic.name}</span></Link>)
                    })
                }
                </div>
                <Tooltip title={post.title}>
                    <Link to={link} ><h3>{post.title.length>60?post.title.substring(0,57)+"...":post.title}</h3></Link>
                </Tooltip>
                {user &&<div><p>{user.firstName+user.lastName} post on</p> </div>}
                <p style={{marginLeft:'0.5%'}}><TimeAgo date={post.lastUpdated} live={false}/></p>
            </div>
            <div className="questionDescription">
                <Typography variant="body2" color="textSecondary">
                    <div dangerouslySetInnerHTML={{ __html: content} } />
                </Typography>
            </div>
        </div>
    )
};
export default ProfileQuestionCard;