import {gql} from "apollo-boost";

export const UPDATE_MESSAGE = gql`mutation ($messageID: GUID!)
    {
        updateMessage(messageID:$messageID,input:{unread:false}){
            id
        }

    }
`;

export const SEND_MESSAGE = gql`mutation ($from: String,$to:String,$content:String)
{
    createMessage(input:{from:$from,to:$to,content:$content}){
        id
    }

}
`;
export const MUTE_USER = gql`mutation ($userIDToMute: String!)
{
    muteUser(userIDToMute:$userIDToMute)

}
`;
export const UNMUTE_USER = gql`mutation ($mutedUserID: String!)
{
    unMuteUser(mutedUserID:$mutedUserID)

}
`;
export const BLOCK_USER = gql`mutation ($userIDToBlock: String!)
{
    blockUser(userIDToBlock:$userIDToBlock)

}
`;
export const UNBLOCK_USER = gql`mutation ($blockedUserID: String!)
{
    unBlockUser(blockedUserID:$blockedUserID)

}
`;