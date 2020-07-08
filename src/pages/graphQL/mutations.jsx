import { gql } from 'apollo-boost';


export const POST_QUESTION = gql`mutation($title:String,$description:String,$school:GUID,$anonymous:Boolean){
    createQuestion(
        input:{title:$title,description:$description,school:$school,anonymous:$anonymous}){
        id,
    }
}`;

export const POST_ARTICLE = gql`mutation($title:String,$content:String){
    createAnswer(
        input:{title:$title,content:$content,isArticle:true}){
        id,
    }
}`;
export const ANSWER_QUESTION = gql`mutation($questionId:GUID,$answerContent:String){
    createAnswer(input:{content:$answerContent,
        questionID:$questionId}){
        id
        content
        user {
            id
            firstName
            lastName
            thumbnail
            university{
                id
                name
            }
        }
        upvote
        downvote
        upvoteStatus
        lastUpdated
        comments{
            id
        }
        }
}`;

export const SEND_COMMENT = gql`mutation($answerId:GUID,$commentContent:String){
    createComment(input:
    {
        content:$commentContent,
        answerID:$answerId})
    {
        id
        dateCommented
        upvote
        downvote
        upvoteStatus
        user {
            id
            firstName
            thumbnail
            university{
                id
                name
            }
            major
            year
            lastName
        }
        content
        replies{
            id
        }
    }
}`;

export const CREATE_TOPIC = gql`mutation($topicName:String){
    createTopic(input:{name:$topicName}){
        id
        name
    }
}`;
export const ADD_TOPIC_TO_QUESTION = gql`mutation($questionID:GUID!,$topicID:GUID!){
    addTopicToQuestion(questionID:$questionID, topicID:$topicID)
}`;

export const CREATE_REPLY = gql`mutation($commentID:GUID!,$content:String!,$replyTo:GUID){
    createReply(
        input:{
            content:$content
            replyTo:$replyTo
            commentID:$commentID}){
        id
        user{
            firstName
            lastName
            thumbnail
            university{
                id
                name
            }
            major
            year
        }
        replyTo{
            id
            user{
                firstName
                lastName
            }
        }
        comment{
            user{
                firstName
                lastName
            }
        }
        dateReplied
        content
        upvote
        downvote
        upvoteStatus
    }
}`;

export const UPLOAD_IMAGE = gql`mutation($fileName:String!,$type:ImageType!,$base64:String!){
    uploadImage(
            fileName:$fileName,
            type:$type
            base64:$base64)
}`;


export const COMMENT_ARTICLE = gql`mutation($answerID:GUID,$commentContent:String){
    createComment(input:
    {
        content:$commentContent,
        answerID:$answerID
    })
    {
        id
    }
}`;

export const FOLLOW_QUESTION = gql`mutation($questionID:GUID){
    followQuestion(questionID:$questionID)
}`;

export const UP_VOTE = gql`mutation($id:GUID!){
    upvote(id:$id)
}`;

export const UN_UP_VOTE = gql`mutation($id:GUID!){
    unUpvote(id:$id)
}`;

export const DOWN_VOTE = gql`mutation($id:GUID!){
    downvote(id:$id)
}`;

export const UN_DOWN_VOTE = gql`mutation($id:GUID!){
    unDownvote(id:$id)
}`;

export const DELETE_MY_QUESTION= gql`mutation($questionID:GUID!){
    deleteQuestion(questionID:$questionID)
}`;