
import React, {useEffect, useState} from "react";
import './profileFollowing.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {USER_FOLLOWED_USERS} from "../graphQL/userQuery";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {FOLLOW_USER, UN_FOLLOW_USER} from "../graphQL/userMutation";
const ProfileFollowingPage = () => {
    const [users,setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [followMutation] = useMutation(FOLLOW_USER);
    const [unFollowMutation] = useMutation(UN_FOLLOW_USER);
    const [followingQuery,{data}]= useLazyQuery(USER_FOLLOWED_USERS,{
        fetchPolicy: "network-only",
    onCompleted:()=>{
        const {me:{followedUsers}} = data;
        setUsers(followedUsers);
    }});

    useEffect(()=>{
        followingQuery();
    },[]);

    const search = (input) => {
        const {me} = data;
        setSearchInput(input);
        const updatedUser = me.followedUsers.filter(user=>((`${user.firstName} ${user.lastName}`).includes(input)));
        setUsers(updatedUser);
    };

    const followUser = (userId) =>{
        followMutation({variables: {userIDToFollow:userId}}).then(()=>{
            const updatedUser = users.map(user=>{
                if(user.id === userId){
                    return {...user,unFollowed:false};
                }
                else{
                    return user;
                }
            });
            setUsers(updatedUser)
        }).catch((err)=>{console.log(err)})

    }

    const unFollowUser = (userId) =>{
        unFollowMutation({variables: {followedUserID:userId}}).then(()=>{
            const updatedUser = users.map(user=>{
                if(user.id === userId){
                    return {...user,unFollowed:true};
                }
                else{
                    return user;
                }
            });
            setUsers(updatedUser)
        }).catch((err)=>{console.log(err)})
    }
    return (
        <div className="profileRightPartWrapper">
            <div className="profileContentSearch">
                <SearchOutlinedIcon />
                <input value={searchInput} onChange={e=>search(e.target.value)} placeholder="search"/>
            </div>

            <div className="profileRightPartContent">
                {users.map( user => (
                    <div className="followingContent">
                        <img height="40px" width="50px" src={require('../../resource/ted.jpg')}/>
                        <div className="followingPeopleIntro">
                            <a href={"/Profile/" + user.id}><h1>{`${user.firstName} ${user.lastName}`}</h1></a>
                            <p>{user.major}</p>
                            <p>{user.year}</p>
                        </div>
                        {!user.unFollowed &&<HowToRegIcon onClick={()=>{unFollowUser(user.id)}}/>}
                        {user.unFollowed &&<PersonAddIcon onClick={()=>{followUser(user.id)}}/>}
                    </div>
                ))
                }
            </div>
        </div>
    )
};
export default ProfileFollowingPage;