import React, {} from 'react'
import './topicSetUp.css'
import '../profile/profileFollowing.css'
import {Link} from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import TopicSetUpBox from "./topicSetUpBox";

const topicSetUp = ()=>{
    const topics = [
        '202eab06-2f2a-4bf1-bdc4-82ec57ae74f1',
        '02bd6e99-d7d9-449a-b3e6-bf0a8efc1dba',
        '11537178-fdc2-4cd4-a756-ebc7a71b61cc',
        'b238892f-5a48-4a3a-97ad-4021aff93308',
        '2c6f6b8e-3aaf-4739-b023-b3d67af2eb9a',
        '2be3b791-9f1e-47cc-bb0b-97ec6e6773e6',
        '4509b610-68f3-4ea9-a3b1-79f2c751959f',
        '4e25e4cb-2d48-4734-b97b-e7d4e51ddf70',
        '8d023eca-1741-4a38-baeb-66d7584ecdea',
        '9de587e2-d862-489c-963c-dc63fcf17e38',
        'd1c2e302-e83f-4568-8c66-ec09bb7723c5',
        'fab685cf-ba49-4cae-9e5d-302bc6033c5e'
    ];

    return (
        <div className='topicSetUpContainer'>
            <h1>Set up your topics!</h1>
            <span style={{marginTop:'10px'}}>Topics can improve quality of your feed and personalise your browse.</span>


            <div className='topicSetUpBox'>
                {topics.map(topic =>(
                        <TopicSetUpBox topicID={topic}/>
                ))}
            </div>


        </div>
    )

};

export default topicSetUp;