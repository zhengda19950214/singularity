import {gql} from "apollo-boost";

export const FOLLOW_QUESTION = gql`mutation($questionID:GUID!){
    followQuestion(questionID:$questionID)
}`;
export const UNFOLLOW_QUESTION = gql`mutation($questionID:GUID!){
    unFollowQuestion(questionID:$questionID)
}`;
export const BOOKMARK_ANSWER = gql`mutation($answerID:GUID!){
    bookmarkAnswer(answerID:$answerID)
}`;

export const UN_BOOKMARK_ANSWER = gql`mutation($answerID:GUID!){
    unBookmarkAnswer(answerID:$answerID)
}`;

export const UPDATE_THUMBNAIL = gql`mutation($thumbnail:String){
    updateSelf(input:{thumbnail:$thumbnail}){
        id
    }
}`;
export const FOLLOW_USER = gql`mutation($userIDToFollow:String!){
    followUser(userIDToFollow:$userIDToFollow)
}`;

export const UN_FOLLOW_USER = gql`mutation($followedUserID:String!){
    unFollowUser(followedUserID:$followedUserID)
}`;

export const UPDATE_SELF = gql`mutation($major:String,$year:String,$phoneNumber:String,$firstName:String,
    $lastName:String,$secondEmail:EmailAddress,$hideUniversity:Boolean){
    updateSelf(input:{major:$major,year:$year,phone:$phoneNumber,firstName:$firstName,lastName:$lastName,secondEmail:$secondEmail,hideUniversity:$hideUniversity}){
        id
    }
}`;


export const UPDATE_PROFILE_QUESTIONS =  gql`mutation($questions:[profileInput]){
    updateProfileQuestions(questions:$questions)
}`;


export const UPDATE_PAST_EDUCATIONS =  gql`mutation($schools:[pastEducationInput]){
    updatePastEducation(schools:$schools)
}`;
