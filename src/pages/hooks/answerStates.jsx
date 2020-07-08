import {useState} from "react";
import {DOWN_VOTE, UN_DOWN_VOTE, UN_UP_VOTE, UP_VOTE} from "../graphQL/mutations";
import {useMutation} from "@apollo/react-hooks";

export const useVotesState = ( {upvote,downvote,id,upvoteStatus})=>{
     const [thumbUp, setThumbUp] = useState(upvoteStatus==="UPVOTED");
    const [thumbDown, setThumbDown] = useState(upvoteStatus==="DOWNVOTED");
    const [upVotes, setUpVotes] = useState(upvote-downvote);
    const [upvoteMutation] = useMutation(UP_VOTE);
    const [unUpvoteMutation] = useMutation(UN_UP_VOTE);
    const [downvoteMutation] = useMutation(DOWN_VOTE);
    const [unDownvoteMutation] = useMutation(UN_DOWN_VOTE);
    const toggleThumbUp = () => {
        if (thumbDown) {
            unDownvoteMutation({variables:{id}}).then(
                (result)=>{

                }
            ).catch((err)=>{console.log(err)});
            upvoteMutation({variables:{id}}).then(
                (result)=>{

                }
            ).catch((err)=>{console.log(err)});
            setUpVotes(upVotes + 2);
            setThumbDown(false)
        } else {
            if (thumbUp) {
                unUpvoteMutation({variables:{id}}).then(
                    (result)=>{

                    }
                ).catch((err)=>{console.log(err)});
                setUpVotes(upVotes - 1)
            } else {
                upvoteMutation({variables:{id}}).then(
                    (result)=>{

                    }
                ).catch((err)=>{console.log(err)});
                setUpVotes(upVotes + 1)
            }
        }

        setThumbUp(!thumbUp)
    };

    const toggleThumbDown = () => {
        if (thumbUp) {
            setUpVotes(upVotes - 2);
            setThumbUp(false);
            unUpvoteMutation({variables:{id}}).then(
                (result)=>{

                }
            ).catch((err)=>{console.log(err)});
            downvoteMutation({variables:{id}}).then(
                (result)=>{

                }
            ).catch((err)=>{console.log(err)});
        } else {
            if (!thumbDown) {
                downvoteMutation({variables:{id}}).then(
                    (result)=>{

                    }
                ).catch((err)=>{console.log(err)});
                setUpVotes(upVotes - 1);
            } else {
                setUpVotes(upVotes + 1);
                unDownvoteMutation({variables:{id}}).then(
                    (result)=>{

                    }
                ).catch((err)=>{console.log(err)});
            }
        }
        setThumbDown(!thumbDown);


    };

    return {thumbUp,thumbDown,upVotes,toggleThumbUp,toggleThumbDown};
};
