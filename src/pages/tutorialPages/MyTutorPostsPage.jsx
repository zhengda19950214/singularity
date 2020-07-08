import React, {useEffect, useState} from 'react'
import MyTutorPostCard from "./MyTutorPostCard";
import './MyTutorPosts.css'
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_MY_TUTORING_POSTS} from "../graphQL/tutoringQuery";

const MyTutorPostsPage = ({openSpecificUserWindow}) => {
    const [myPosts, setMyPosts] = useState([]);
    const [getMyPosts, {error, data}] = useLazyQuery(GET_MY_TUTORING_POSTS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            const {me: {myTutorPosts}} = data;
            setMyPosts(myTutorPosts);
        }
    });


    useEffect(() => {
        getMyPosts();
    }, []);
    if (error) return <div/>;
    return (
        <div className="MyTutorPostsWrapper">
            {
                myPosts.map(post =>
                    (<MyTutorPostCard key={post.id} post={post} refetch={getMyPosts}
                                      openSpecificUserWindow={openSpecificUserWindow}/>)
                )
            }

        </div>
    )
};

export default MyTutorPostsPage;