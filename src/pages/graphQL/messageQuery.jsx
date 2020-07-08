import {gql} from "apollo-boost";



export const GET_MESSAGE_OVERVIEW = gql`
    {
        getMessageOverview{
            count
            message{
                id
                from{
                    id
                }
                content
                from{
                    id
                    firstName
                    lastName
                    thumbnail
                    muted
                }
            }
           
        }

    }
`;

export const GET_MESSAGES = gql`query($from:String!)
    {
        getMessages(from:$from){
            id
            content
        }

    }
`;

export const GET_USER_FOR_MESSAGE = gql` query($userID:String!)
{
    getUser(userID:$userID) {
        id
        firstName
        lastName
        thumbnail
        muted
        blocked
        beingBlocked
    }
}
`

export const SEARCH_USER = gql`query($name: String!){
    searchUser(name:$name){
        id
        firstName
        lastName
        thumbnail
    }
}
`