import React, {useState} from "react";
import './profileSetting.css'

const NameSettingField = ({firstName,lastName,setFirstName,setLastName,updateSelf, resetName}) => {
    const [editMode, setEditMode] = useState(false);
    return (

        <div className="ProfileSettingListItem">
            <div className="ProfileSettingListName">
                <p>Name :</p>
            </div>
            <div className="ProfileSettingListContent">
                {!editMode && <p>{firstName+' '+lastName }</p>}
                {editMode && <input id="nameInput" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/>}
                {editMode && <input id="nameInput" onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>}
            </div>
            <div className="ProfileSettingChange">
                {editMode &&<p onClick={()=>{updateSelf();setEditMode(false)}}>save</p>}
                {editMode &&<p onClick={()=>{setEditMode(false); resetName()}}>cancel</p>}
                {!editMode &&<p onClick={()=>setEditMode(true)}>Edit</p>}
            </div>
        </div>

    )
};
export default NameSettingField;