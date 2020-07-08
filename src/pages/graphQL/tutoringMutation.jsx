import {gql} from "apollo-boost";

export const POST_TUTORING_POST = gql`mutation(
    $title:String,
    $description:String,
    $topics:[String],
    $fee:String,
    $keyConcepts:String,
    $timeAvailability:String,
    $finishBy:String,
    $preferredSoftware:String,
    $materials:Boolean){
    createTutorPost(
        input:{
            title:$title,
            description:$description,
            topics:$topics,
            fee:$fee,
            keyConcepts:$keyConcepts,
            timeAvailability:$timeAvailability,
            finishBy:$finishBy,
            preferredSoftware:$preferredSoftware,
            materials:$materials
        })
    {
        id
    }
}`;

export const CREATE_TUTORING_CARD = gql`mutation(
    $year:String,
    $major:String,
    $skills:String,
    $timeAvailability:String,
    $preferredSoftware:String,
    $details:String){
    createTutorCard(
        input:{
            year:$year,
            major:$major,
            skills:$skills,
            timeAvailability:$timeAvailability,
            preferredSoftware:$preferredSoftware,
            details:$details
        })
    {
        id
    }
}`;

export const UPDATE_TUTORING_CARD = gql`mutation(
    $cardID:GUID!
    $year:String,
    $major:String,
    $skills:String,
    $timeAvailability:String,
    $preferredSoftware:String,
    $details:String){
    updateTutorCard(
        cardID:$cardID
        input:{
            year:$year,
            major:$major,
            skills:$skills,
            timeAvailability:$timeAvailability,
            preferredSoftware:$preferredSoftware,
            details:$details
        })
    {
        id
    }
}`;

export const APPLY_TUTORING_POST= gql`mutation(
    $postID:GUID!,
    $year:String,
    $major:String,
    $skills:String,
    $timeAvailability:String,
    $preferredSoftware:String,
    $details:String,
    $timeNeeded:String
){
    createTutorApplication(
        input:{
            postID:$postID
            year:$year,
            major:$major,
            skills:$skills,
            timeAvailability:$timeAvailability,
            preferredSoftware:$preferredSoftware,
            details:$details
            timeNeeded:$timeNeeded

        }
    )
}`;


export const DEAL_TUTORING_APPLICATION= gql`mutation(
    $tutorID:GUID!,$postID:GUID!){
    dealTutorPost(tutorID:$tutorID,postID:$postID)
}`;

export const RATE_TUTOR= gql`mutation(
    $postID:GUID!,
    $rating:Int!,
    $detail:String,
    $to:GUID!,
){
    rateTutor(
        input:{to:$to,postID:$postID,rating:$rating,detail:$detail}
    )
}`;

export const DELETE_TUTOR_POST= gql`mutation(
    $postID:GUID!){
    deleteTutorPost(postID:$postID)
}`;

export const CLEAR_POST_NOTIFICATION= gql`mutation{
    clearTutorNotification
}`;
