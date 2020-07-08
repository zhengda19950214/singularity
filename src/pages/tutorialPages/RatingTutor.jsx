import React, {Fragment, useState} from 'react'
import './RatingTutor.css'
import Rating from "@material-ui/lab/Rating/Rating";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import {RATE_TUTOR} from "../graphQL/tutoringMutation";
import {Link} from "react-router-dom";

const RatingTutor = ({refetch, post}) => {
    const [rating, setRating] = useState(0);
    const [ratingError, setRatingError] = useState(false);
    const [detail, setDetail] = useState('');
    const [rateTutor] = useMutation(RATE_TUTOR);

    const {tutor, rating: postRating} = post;
    const submitRate = () => {
        if (rating === 0) {
            setRatingError(true);
            return;
        }
        rateTutor({variables: {postID: post.id, to: tutor.id, rating, detail}}).then(() => {
            refetch();
        })
    };
    return (
        <div className="RatingTutorWrapper">
            {
                postRating ?
                    <Fragment>
                        <h1 style={{marginTop: '20px'}}>Review:</h1>
                        <div className="RatingTutorInfo">
                            <Link to={"/Profile/" + tutor.id}><img
                                src={tutor.thumbnail || require('../../resource/ted.jpg')}/></Link>
                            <Link to={"/Profile/" + tutor.id}><h3>{`${tutor.firstName} ${tutor.lastName}`}</h3></Link>
                            <Rating name="disabled" value={postRating.rating} disabled/>
                        </div>
                        <h1 >Details:</h1>
                        <p>{postRating.detail}</p>
                    </Fragment> :
                    <Fragment>
                        <p>Don't forget to rate <span>{`${tutor.firstName} ${tutor.lastName}`}</span> after your tutoring, thank you!</p>
                        <div className="RatingTutorInfo">
                            <Link to={"/Profile/" + tutor.id}><img
                                src={tutor.thumbnail || require('../../resource/ted.jpg')}/></Link>
                            <Link to={"/Profile/" + tutor.id}><h3>{`${tutor.firstName} ${tutor.lastName}`}</h3></Link>
                            <Rating value={rating} onChange={(event, newValue) => {
                                setRating(newValue)
                            }}/>
                            {ratingError && <p>Please rate your tutor</p>}
                        </div>
                        <h1 style={{fontSize: '15px'}}>Details(optional):</h1>
                        <textarea value={detail} onChange={e => {
                            setDetail(e.target.value)
                        }}/>
                        <Button onClick={() => submitRate()}> Submit </Button>
                    </Fragment>
            }

        </div>
    )
};

export default RatingTutor;