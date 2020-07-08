import {gql} from "apollo-boost";


export const GET_MORE_MY_SCHOOL = gql` query ($lastOffset:Int,$limit:Int)
{
    getMySchool{
        id
        questions(limit:$limit,lastOffset:$lastOffset)  {
            id
            title
            school
            answers(orderBy: RATING, limit:1){
                id
                content
                comments{
                    id
                }
                user {
                    id
                    firstName
                    lastName
                    thumbnail
                    university{
                        name
                        id
                    }
                }
                upvote
                downvote
                upvoteStatus
            }
            lastUpdated
            user {
                id
                thumbnail
                firstName
                lastName


            }
            topics{
                id
                name
            }

        }
    }
}
`;
export const GET_MY_SCHOOL = gql` query ($lastOffset:Int,$limit:Int)
    {
        getMySchool{
            id
            name
            questions(limit:$limit,lastOffset:$lastOffset)  {
                id
                title
                school{
                    id
                }
                answers(orderBy: RATING, limit:1){
                    id
                    content
                    comments{
                        id
                    }
                    user {
                        id
                        firstName
                        lastName
                        thumbnail
                        university{
                            name
                            id
                        }
                    }
                    upvote
                    downvote
                    upvoteStatus
                }
                lastUpdated
                user {
                    id
                    thumbnail
                    firstName
                    lastName
                

                }
                topics{
                    id
                    name
                }

            }
            numberOfStudents
        }
        me{
            id
            followedTopics{
                id
                name
                thumbnail
            }
        }
    }
`;