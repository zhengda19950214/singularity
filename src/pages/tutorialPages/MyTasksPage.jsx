import React, {useEffect, useState} from 'react'
import MyTaskCard from "./MyTaskCard";
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_MY_TUTORING_TASKS} from "../graphQL/tutoringQuery";

const MyTasksPage = () => {
    const [myTasks, setMyTasks] = useState([]);

    const [getMyTasks, {error, data}] = useLazyQuery(GET_MY_TUTORING_TASKS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            const {me: {myTutorTasks}} = data;
            setMyTasks(myTutorTasks);
        }
    });

    useEffect(() => {
        getMyTasks();
    }, []);
    if (error) return <div/>;
    return (
        <div className="MyTutorPostsWrapper">
            {
                myTasks.map(post =>
                    (<MyTaskCard key={post.id} post={post}/>)
                )
            }

        </div>
    )
};

export default MyTasksPage;