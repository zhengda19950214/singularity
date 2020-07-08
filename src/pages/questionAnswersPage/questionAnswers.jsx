import React, {useEffect, useRef, useState} from 'react'
import './questionAnswers.css'
import QuestionCard from "../cards/questionCard";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import AnswerWithCommentsCard from "../cards/answerWithCommentsCard";
import SortMethodButton from "../sortButton/sortMethodButton";
import {FETCH_MORE_ANSWER_FOR_QUESTION, GET_QUESTION} from "../graphQL/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import {DELETE_MY_QUESTION} from "../graphQL/mutations";

const QuestionAnswers = props => {
    let id = props.match.params.id;
    props.setSelectedPage("");
    const {setGreyCover,me} =props;
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState();
    const [loadingMoreData, setLoadingMoreData] = useState(false);
    const [noMoreFetching, setNoMoreFetching] = useState(false);
    const {followedQuestions,bookmarkedAnswers:bookMarkedAnswers} = me;
    const ref = useRef(null);
    const [deletePopupWindow, setDeletePopupWindow] = useState(false);
    const [deleteMyQuestion] = useMutation(DELETE_MY_QUESTION);


    let [getQuestionQuery,{data}] = useLazyQuery(GET_QUESTION,{
        fetchPolicy:"network-only",
        onCompleted: () =>{
            const {getQuestion} = data;
            const {answers:fetchedAnswers} = getQuestion;
            if(fetchedAnswers.length < 10){
                setNoMoreFetching(true);
            }
            setAnswers(fetchedAnswers);
            setQuestion(getQuestion)
        }});
    let [fetchMoreQuestionQuery,{data:answersData}] = useLazyQuery(FETCH_MORE_ANSWER_FOR_QUESTION,{
        fetchPolicy:"network-only",
        onCompleted: () =>{
            setLoadingMoreData(false);
            const {getQuestion:{answers:newAnswers}} = answersData;
            if(newAnswers.length< 10){
                setNoMoreFetching(true)
            }
            setAnswers(answers.concat(newAnswers));
        }});
    useEffect(()=>{
        getQuestionQuery({variables: { id,orderBy:"RECENT" }});
    },[]);
    const [selectedSortingMethod, setSelectedSortingMethod] = useState('Auto');
    const getMoreQuestions = () => {
        if(loadingMoreData){
            return;
        }
        setLoadingMoreData(true);
        fetchMoreQuestionQuery({variables:{ id,orderBy:sortingMethodToTypeMap[selectedSortingMethod],lastOffset:answers.length }});
    };
    const handleScroll = () => {
        if(noMoreFetching){
            return;
        }
        if (ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight !== 0) return;
        getMoreQuestions()
    };
    const sortingMethodToTypeMap = {
        'Auto':"RECENT",
        'Recent': "RECENT",
        "Rating": "RATING"
    };
    if(!question) return <div/>;

    const deleteQuestion = () => {
        deleteMyQuestion({variables: {questionID: id}}).then(
            () => {
                setDeletePopupWindow(false);
            }
        )
    };


    return (
        <div className="questionAnswerWrapper" ref={ref} onScroll={()=>{handleScroll();}}>
            <div className="questionAnswerContent">
                <div className="question">
                    <QuestionCard setGreyCover={setGreyCover} question={question} addAnswer={(newAnswer)=>{setAnswers([newAnswer,...answers])}} me={me} followed={followedQuestions.some((q)=>{return q.id === question.id})}/>
                </div>
                <div className="questionAnswerGap">
                    <p>
                        The question has {answers.length} answers
                    </p>
                    <SortMethodButton  selectedSortingMethod={selectedSortingMethod} setSelectedSortingMethod={setSelectedSortingMethod} refetch={(orderType)=>getQuestionQuery({variables: {id,orderBy:orderType}})}/>
                </div>
                <div className="answers">
                    {answers.map((answer) => (
                        <div className="answer" key={answer.id}>
                            <AnswerWithCommentsCard questionId={question.id} key={answer.id} answer={answer} bookmarked={bookMarkedAnswers.some((b)=>{return b.id === answer.id})}/>
                        </div>)
                    )}
                    {loadingMoreData && <CircularProgress id="loadingCircle"/>}
                </div>

            </div>
        </div>
    );
};



export default QuestionAnswers;