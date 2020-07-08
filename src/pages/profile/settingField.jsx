import React, {useState} from "react";
import './profileSetting.css'
import {Link} from "react-router-dom";
import Dropdown from "react-dropdown";
import {degreeYearRange} from "../utility/dateFixture";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const SettingField = ({field,updateSelf}) => {
    const [editMode, setEditMode] = useState(false);
    const getEditableField = (fieldName) => {
        switch (fieldName) {
            case "Year": return <Dropdown required options={degreeYearRange} onChange={(data)=>{field.updateField(data)}} value={field.mappedField}
                                          className="majorYearPicker" placeholder={degreeYearRange[0]}/>;
            case "Phone number": return     <PhoneInput
                placeholder="Enter phone number"
                value={field.mappedField}
                country="US"
                onChange={field.updateField}/>;
            case "Secondary Email":return <input type="email" onChange={(e)=>{field.updateField(e.target.value)}} value={field.mappedField}/>;
            default: return <input onChange={(e)=>{field.updateField(e.target.value)}} value={field.mappedField}/>;
        }
    };

    const updateHideUni = async () => {
        await field.updateField();
        updateSelf()
    };
    const edit = () => {
        switch (field.name) {
            case "School": updateHideUni(); break;
            case "Major": setEditMode(true);break;
            case "Year": setEditMode(true);break;
            case "Secondary Email": setEditMode(true);break;
            case "Phone number": setEditMode(true);break;
            case "Password": return;

            default:return;
        }
    };
    const update = () => {
        switch (field.name) {
            case "School": return;
            case "Major": updateSelf() ;setEditMode(false); break;
            case "Year": updateSelf();setEditMode(false);break;
            case "Secondary Email": {
                if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(field.mappedField)){
                    updateSelf();
                    setEditMode(false);
                }
                else{
                    alert("Invalid email")
                }
                return;
            }
            case "Phone number": updateSelf();setEditMode(false);break;
            case "Password": return;
            default:setEditMode(false);
        }
    };
    return (

        <div className="ProfileSettingListItem">
            <div className="ProfileSettingListName">
                <p>{field.name}:</p>
            </div>
            <div className="ProfileSettingListContent">
                {!editMode&&<p>{field.mappedField}</p>}
                {editMode && <form>{getEditableField(field.name)}</form>}
            </div>
            <div className="ProfileSettingChange">
                {editMode &&<p onClick={()=>{update()}}>save</p>}
                {editMode &&<p onClick={()=>{setEditMode(false); field.resetField()}}>cancel</p>}
                {!editMode &&<p onClick={edit}>{field.changeField}</p>}
                {field.name==="School" && <p onClick={edit}>{field.changeField?"show":"hide"}</p>}
                {field.name==="Password" && <Link to={'/ChangePassword'}><p>Change</p></Link>}
            </div>
        </div>

    )
};
export default SettingField;