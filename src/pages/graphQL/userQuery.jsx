import {gql} from "apollo-boost";


export const ME = gql`
    {
        me {
            applicationNotifications
            id
            thumbnail
            firstName
            major
            year
            university{
                id
                name
            }
            lastName
            phone
            bookmarkedAnswers{
                id
                content
            }
            followedQuestions{
                id
            }
            followedTopics(limit:20){
                id
                name
                thumbnail
            }
            tutorCard{
                id
                year
                major, 
                skills, 
                timeAvailability, 
                preferredSoftware, 
                details, 
            }
            tutorRating
        }
    }
`;


export const USER_INFORMATION = gql` query($userID:String!)
{
    getUser(userID:$userID) {
        id
        thumbnail
        firstName
        major
        year
        secondEmail
        hideUniversity
        numberOfFollowers
        email
        profileQuestions{
            question
            answer
        }            
        pastEducation{
            school
            from
            to
            major
            degree
        }
        
        university{
            id
            name
        }
        lastName
        followed
        phone
        answers{
            id
            content
            title
            isArticle
            lastUpdated
            question{
                id
                topics{
                    id
                    name
                }
                title
            }
        }
        questions {
            id
            title
            description
            lastUpdated
            topics{
                id
                name
            }
            user {
                id
                firstName
                lastName
                major
                university{
                    id
                    name
                }
                year

            }
        }
        tutorRating
        ratingCount
        tutorCard{
            id
            year
            major
            skills
            timeAvailability
            preferredSoftware
            details
        }
    }
}
`;
export const USER_FOLLOWED_TOPICS = gql`
    {
        me{
            id
            followedTopics(limit:100){
                id
                name
                thumbnail
            }
        }
    }
`;
export const USER_FOLLOWED_USERS = gql`
    {
        me{
            id
            followedUsers{
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
export const USER_BOOKMARKED_ANSWERS = gql`
    {
        me {
            id
            bookmarkedAnswers {
                id
                title
                content
                comments {
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
                    thumbnail
                }
                question {
                    id
                    title
                    lastUpdated
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
                    topics {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const GET_PROFILE_QUESTIONS = gql`
    {
        me{
            id
            profileQuestions{
                question
                answer
            }
        }
    }
`;

export const GET_PAST_EDUCATION= gql`
    {
        me{
            id
            pastEducation{
                school
                from
                to
                major
                degree
            }
        }
    }
`;