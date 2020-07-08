
import React, {useEffect, useState} from "react";
import './profileBookmark.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {useLazyQuery} from "@apollo/react-hooks";
import FeedAnswerCard from "../cards/feedAnswerCard";
import {USER_BOOKMARKED_ANSWERS} from "../graphQL/userQuery";
const ProfileBookmarkPage = () => {
    const [bookmarkedAnswers,setBookmarkedAnswer] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [userBookmarkAnswerQuery,{loading, error, data}] = useLazyQuery(USER_BOOKMARKED_ANSWERS,{
        onCompleted: ()=>{
            const {me} = data;
            setBookmarkedAnswer(me.bookmarkedAnswers);
        },
        fetchPolicy: "network-only"
    });
    useEffect(()=>{
        userBookmarkAnswerQuery()

    },[]);

    if (loading) return <div/>;
    if (error) return <div/>;
    const unBookmark = (removedId) => {
        const newAnswers = bookmarkedAnswers.filter(answer => {
            return answer.id !== removedId
        });
        setBookmarkedAnswer(newAnswers);
    };

    const search = (input) => {
        const {me} = data;
        setSearchInput(input);
        const updatedAnswers = me.bookmarkedAnswers.filter(answer=>(answer.question.title.includes(input)));
        setBookmarkedAnswer(updatedAnswers);
    };
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input value={searchInput} onChange={e=>search(e.target.value)} placeholder="search"/>
            </div>
            <div className="profileRightPartContent">
                {bookmarkedAnswers.map(bookmarkAnswer => {
                    const {question} = bookmarkAnswer;
                    return (
                        <div key={bookmarkAnswer.id} className="feedAnswer">
                            <FeedAnswerCard
                                bookmarked={true}
                                key={bookmarkAnswer.id}
                                question={question}
                                answer={bookmarkAnswer}
                                profileBookmarkAnswer={true}
                                showAction={false}
                                callback={()=>unBookmark(bookmarkAnswer.id)}/>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default ProfileBookmarkPage;