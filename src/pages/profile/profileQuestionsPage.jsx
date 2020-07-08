import React, {useState} from "react";
import './profileHomePage.css'
import './profileQuestion.css'
import ProfileQuestionCard from "../cards/profileQuestionCard";

const ProfileQuestionsPage = ({type, data}) => {
    const [posts, setPosts] = useState(data);
    const [searchInput, setSearchInput] = useState('');

    const search = (input) => {
        setSearchInput(input);
        let updatedAnswers = [];
        if(type === "question"){
            updatedAnswers = data.filter(question=>(question.title.includes(input)));
        }
        else if (type === "answer"){
            updatedAnswers = data.filter(answer=>(answer.question.title.includes(input)));
        }
        setPosts(updatedAnswers);
    };
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <input value={searchInput} onChange={e=>search(e.target.value)} placeholder="search"/>
            </div>
            {type === "question" &&
            posts.map(post => (
                !post.isArticle &&
                <div className="profileQuestion">
                    <ProfileQuestionCard post={post} content={post.description} type={"questions"} topics={post.topics}/>
                </div>
            ))
            }
            {type === "answer" &&
            posts.map(answer => (
                !answer.isArticle &&
                <div className="profileQuestion">
                    <ProfileQuestionCard post={answer.question} content={answer.content} type={"answer"} topics={answer.question.topics}/>
                </div>
            ))
            }
            {type === "article" &&
            posts.map(post => (
                post.isArticle &&
                <div className="profileQuestion">
                    <ProfileQuestionCard post={post} content={post.content} type={"article"} topics={[]}/>
                </div>
            ))
            }

        </div>
    )
};
export default ProfileQuestionsPage;