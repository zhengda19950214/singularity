import React, {useState} from "react";
import './profileSetting.css'
import SettingField from "./settingField";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_SELF} from "../graphQL/userMutation";
import NameSettingField from "./nameSettingField";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TutorCardSettingField from "./TutorCardSettingField";

const ProfileSettingPage = ({user, refetch}) => {
    const {
        firstName: defaultFirstName,
        lastName: defaultLastName,
        major: defaultMajor,
        year: defaultYear,
        secondEmail: defaultSecondEmail,
        phone: defaultPhoneNumber,
        email,
    } = user;
    const [firstName, setFirstName] = useState(defaultFirstName);
    const [lastName, setLastName] = useState(defaultLastName);
    const [major, updateMajor] = useState(defaultMajor);
    const [year, updateYear] = useState(defaultYear);
    const [secondEmail, updateSecondEmail] = useState(defaultSecondEmail);
    const [phoneNumber, updatePhoneNumber] = useState(defaultPhoneNumber);
    const [updateSelfMutation, {error: updateError}] = useMutation(UPDATE_SELF);
    const [hideUniversity, setHideUniversity] = useState(user.hideUniversity);
    const updateSelf = () => updateSelfMutation({
        variables: {
            phoneNumber,
            firstName,
            lastName,
            major,
            year,
            secondEmail,
            hideUniversity: !hideUniversity
        },
        onError: (err => {
            console.log(err)
        })
    }).then(result => {
        if (result) {
            refetch()
        }
    }).catch();

    if (updateError) {
        alert(updateError);
    }
    const settingFields = [
        {
            name: "School Email",
            mappedField: email,
            changeField: ""
        },
        {
            name: "School",
            mappedField: user.university.name,
            changeField: hideUniversity,
            updateField: () => setHideUniversity(!hideUniversity),
            resetField: () => setHideUniversity(user.hideUniversity)
        },
        {
            name: "Major",
            mappedField: major,
            updateField: updateMajor,
            changeField: "Edit",
            resetField: () => updateMajor(defaultMajor)
        },
        {
            name: "Year",
            mappedField: year,
            updateField: (majorYear) => {
                updateYear(majorYear.value)
            },
            changeField: "Change",
            resetField: () => updateYear(defaultYear)
        },
        {
            name: "Secondary Email",
            mappedField: secondEmail,
            updateField: updateSecondEmail,
            changeField: "Edit",
            resetField: () => updateSecondEmail(defaultSecondEmail)

        },
        {
            name: "Phone number",
            mappedField: phoneNumber,
            updateField: updatePhoneNumber,
            changeField: "Edit",
            resetField: () => updatePhoneNumber(defaultPhoneNumber)

        },
        {name: "Password", mappedField: "******"}];

    const resetName = () => {
        setFirstName(defaultFirstName);
        setLastName(defaultLastName);
    };
    return (
        <div className="profileHomePageWrapper">
            <div className="ProfileContentList">
                <div className="profileSettingOverview">
                    {user.thumbnail ? <img src={user.thumbnail}/> : <AccountCircleIcon/>}
                    <div id="introduction">
                        <h1>{`${user.firstName} ${user.lastName}`}</h1>
                        <span>{`${user.major} ${user.year}`}</span>
                    </div>
                </div>
                <NameSettingField firstName={firstName} lastName={lastName} setFirstName={setFirstName}
                                  setLastName={setLastName} updateSelf={updateSelf} resetName={resetName}/>
                {settingFields.map(field => (
                    <SettingField field={field} key={field.name} updateSelf={updateSelf}/>
                ))}
                {user.tutorCard !== null &&
                <TutorCardSettingField user={user} refetch={refetch}/>}
            </div>
        </div>
    )
};
export default ProfileSettingPage;