import {gql} from 'apollo-boost';

export const GET_FEED_ANSWERS = gql` query ($recentLastOffset:Int,$ratingLastOffset:Int)
{
    recentFeed:answerFeed(lastOffset:$recentLastOffset,limit:8,orderBy:RECENT)  {
        id
        title
        content
        comments{
            id
        }
        user {
            hideUniversity
            id
            university{
                id
                name
            }
            firstName
            lastName
            thumbnail
        }
        upvote
        downvote
        upvoteStatus
        question{
            school{
                id
            }
            id
            title
            lastUpdated
            user {
                id
                thumbnail
                firstName
                lastName
                university{
                    id
                    name
                }


            }
            topics{
                id
                name
            }
        }
    }
    ratingFeed:answerFeed(lastOffset:$ratingLastOffset,limit:2,orderBy:RATING)  {
        id
        content
        title
        comments{
            id
        }
        user {
            id
            hideUniversity
            university{
                id
                name
            }
            firstName
            lastName
            thumbnail
        }
        upvote
        downvote
        upvoteStatus
        question{
            id
            title
            school{
                id
            }
            lastUpdated
            user {
                id
                thumbnail
                firstName
                lastName
                university{
                    id
                    name
                }


            }
            topics{
                id
                name
            }
        }
    }

    me{
        id
        followedTopics(limit:20){
            id
            name
            thumbnail
        }
        bookmarkedAnswers{
            id
        }
    }
}
`;

export const GET_ANSWERS = gql` query ($lastOffset:Int)
{
    answers(lastOffset:$lastOffset,,orderBy:RECENT)  {
        id
        title
        content
        comments{
            id
        }
        user {
            id
            hideUniversity
            university{
                id
                name
            }
            firstName
            lastName
            thumbnail
        }
        upvote
        downvote
        upvoteStatus
        question{
            id
            school{
                id
            }
            title
            lastUpdated
            user {
                id
                thumbnail
                firstName
                lastName
                university{
                    id
                    name
                }


            }
            topics{
                id
                name
            }
        }
    }
}
`;


export const SEARCH_MORE_ANSWER = gql` query($searchString:String,$topicIDs:[GUID],$lastOffset:Int){
    search(searchString:$searchString,topicIDs:$topicIDs) {
        id
        title
        answers(orderBy: RECENT, lastOffset:$lastOffset){
            content
            comments{
                id
            }
            user {
                id
                hideUniversity
                firstName
                lastName
                university{
                    id
                    name
                }
            }
            school{
                id
            }
            upvote
            downvote
            upvoteStatus
        }
        topics{
            id
            name
        }
        school{
            id
        }
        lastUpdated
        user {
            id
            firstName
            lastName
            university{
                id
                name
            }
        }
    }
}`;
export const SEARCH_ANSWER = gql` query($searchString:String,$topicIDs:[GUID],$lastOffset:Int,$limit:Int)
{
    search(searchString:$searchString,topicIDs:$topicIDs, limit:$limit,lastOffset:$lastOffset) {
        id
        title
        school{
            id
        }
        answers(orderBy: RECENT){
            content
            id
            comments{
                id
            }
            user {
                hideUniversity
                id
                firstName
                lastName
                university{
                    id
                    name
                }
            }
            upvote
            downvote
            upvoteStatus
        }
        topics{
            id
            name
        }
        lastUpdated
        user {
            id
            firstName
            lastName
            university{
                id
                name
            }
        }
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

export const FETCH_MORE_ANSWER_FOR_QUESTION = gql`query($id:GUID!,$lastOffset:Int,$orderBy:OrderType)
{
    getQuestion(questionID:$id){
        id
        school{
            id
        }
        answers(lastOffset: $lastOffset,orderBy: $orderBy) {
            id
            content
            user {
                hideUniversity
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
                user {
                    id
                    firstName
                    lastName
                    thumbnail
                    hideUniversity
                    university{
                        id
                        name
                    }
                }
                upvote
                downvote
                upvoteStatus
                content
                replies{
                    id
                    upvote
                    downvote
                    upvoteStatus
                    user{
                        firstName
                        lastName
                        thumbnail

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
                }
                dateCommented
            }
        }
    }
}
`;
export const GET_QUESTION = gql` query($id:GUID!,$orderBy:OrderType)
{
    getQuestion (questionID:$id) {
        title
        id
        anonymous
        answers(orderBy: $orderBy) {
            id
            content
            user {
                hideUniversity
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
                user {
                    hideUniversity
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
                content
                replies{
                    id
                    upvote
                    downvote
                    upvoteStatus
                    user{
                        firstName
                        lastName
                        thumbnail

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
                }
                dateCommented
            }
        }
        topics{
            id
            name
        }
        description
        lastUpdated
        user {
            hideUniversity
            id
            firstName
            lastName
            university{
                id
                name
            }
            major
            year
            thumbnail

        }
        
    }
}
`;

export const GET_ARTICLE = gql` query($answerID:GUID!)
{
    getAnswer(answerID:$answerID){
        id
        title
        upvote
        downvote
        upvoteStatus
        user {
            hideUniversity
            id
            firstName
            lastName
            university{
                id
                name
            }
            major
            year
            thumbnail

        }
        content
        comments{
            id
            dateCommented
            upvote
            downvote
            upvoteStatus
            user {
                hideUniversity
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
        }
    }   
}`
export const FEED_QUESTIONS = gql` query ($lastOffset:Int)
{
    questionFeed(lastOffset:$lastOffset) {
        id
        title
        description
        lastUpdated
        anonymous
        topics{
            id
            name
        }
        school{
            id
        }
        user {
            id
            firstName
            lastName
            university{
                id
                name
            }
            major
            year

        }
    }
    me{
        id
        followedTopics{
            id
            name
            thumbnail
        }
        followedQuestions{
            id
        }
    }
}
`;
export const GET_QUESTIONS = gql` query ($lastOffset:Int,$limit:Int)
{
    questions(lastOffset:$lastOffset, limit:$limit) {
        id
        title
        description
        lastUpdated
        anonymous
        topics{
            id
            name
        }
        school{
            id
        }
        user {
            id
            firstName
            lastName
            university{
                id
                name
            }
            major
            year

        }
    }
}
`;

export const GET_TOPICS = gql`
    {
        topics{
            id
            name
            thumbnail
        }
    }
`;

export const GET_UNIVERSITY_BY_DOMAIN = gql`query($domain:String!)
{
    getUniversityByDomain(domain:$domain){
        id
        name
    }
}
`;

