import React, {useState} from 'react'
import './registerPage.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import yearRange, {calculateDays, monthRange, standardDays,degreeYearRange} from "../utility/dateFixture";
import {Formik} from "formik";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from '@material-ui/icons/Info';
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_UNIVERSITY_BY_DOMAIN} from "../graphQL/query";

/*
    Page for user to submit their basic information like : Names, email, education details.
    After user submit the form, information will be sent to Amplify Cognito server along with basic information,
    basic information will be distributed to database in back end. 
    Note: Use formik library for validation, might be overkill in this case.
*/
const RegisterPageOne = ({submit,goToSign,selectedMajorYear, setSelectedMajorYear}) => {
    const [dayRange, setDayRange] = useState(standardDays);
    const [university,setUniversity] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [showPassword , setShowPassword] = useState(false);
    const [showBirthdayNotSelected, setShowBirthdayNotSelected] = useState(false);

    const [] = useLazyQuery(GET_UNIVERSITY_BY_DOMAIN,
        {onCompleted: () => {
            },
            fetchPolicy:"network-only"
        });
    const selectYear = (year) => {
        setSelectedYear(year);
        if (selectedMonth) {
            setDayRange(calculateDays(year.value, selectedMonth.value));
        }
    };
    const selectMonth = (month) => {
        setSelectedMonth(month);
        if (selectedYear) {
            setDayRange(calculateDays(selectedYear.value, month.value));
        }
    };
    const selectDay = (day) => {
        setSelectedDay(day);
    };

    const checkUniversityByDomain = (value) =>{
        // eslint-disable-next-line no-unused-expressions
        setUniversity(''),
        fetch(`https://pc6ribvsug.execute-api.us-east-1.amazonaws.com/prod/?domain=${value.split('@')[1]}`,
            {    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }}).then(res => res.json()).then(
            res=>{
                if(Object.entries((res)).length!==0){
                    setUniversity(res)
                }

            }
        )
    };
    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: '', password: '', university:'',major:'',degreeYear:''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values) => {
                if(!university){

                }
                else if(selectedDay&&selectedYear&&selectedMonth){
                    setShowBirthdayNotSelected(false);
                    submit(values.email,values.password,values.firstName,values.lastName,university.id,values.major);
                }
                else{
                    setShowBirthdayNotSelected(true)
                }

            }}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className="registerForm">

                        <div className="authWrapperHeader">
                            <span onClick={goToSign}>singularity</span>
                        </div>
                        <div className="signUpInput">
                            <input required
                                   name="firstName"
                                   onChange={handleChange}
                                   value={values.firstName}
                                   placeholder="First Name" id="firstName"/>
                            <input required name="lastName"
                                   onChange={handleChange}
                                   value={values.lastName}
                                   placeholder="Last Name" id="lastName"/>
                        </div>
                        <div className="signUpInput">
                        <Dropdown required options={monthRange} onChange={selectMonth} value={selectedMonth}
                                  className="monthPicker" placeholder="Month"/>
                        <Dropdown required options={dayRange} onChange={selectDay} value={selectedDay} className="dayPicker"
                                  placeholder="Day"/>
                        <Dropdown required options={yearRange} onChange={selectYear} value={selectedYear}
                                  className="yearPicker" placeholder="Year"/>
                            <Tooltip title="Birthday"><InfoIcon id="dateInfo"/></Tooltip>
                            {showBirthdayNotSelected&& <div><h2>Please enter your birthday</h2></div>}
                        </div>
                        <div className="signUpInput">
                            <input required type="email"
                                   name="email"
                                   onChange={(e)=>{handleChange(e);checkUniversityByDomain(e.target.value)}}
                                   value={values.email} placeholder="Email:" id="fullLongInput"/>
                            <h3>{errors.email}</h3>
                        </div>
                        <div className="passwordInput">
                            <input required type={!showPassword ? "password":""}
                                   name="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password} placeholder="Password:"
                                   id="fullLongInput"/>
                            <VisibilityOffOutlinedIcon onMouseDown={()=>{setShowPassword(true)}}
                                                       onMouseUp={()=>{setShowPassword(false)}}
                            />
                            <Tooltip title="Password should be formed with numbers,characters and capital characters."><InfoIcon id="passwordInfo"/></Tooltip>
                        </div>
                        <div className="signUpInput">
                            <input required type=""
                                   value={!university? '' : university.name}
                                   placeholder="Current university/College"
                                   disabled
                                   id="university"/>
                            <h3>{!university && "Enter a valid university email will autofill this field"}</h3>
                        </div>
                        <div className="majorInput">
                            <input required type=""
                                   name="major"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.major}
                                   placeholder="Major"
                                   id="fullLongInput"/>
                        </div>
                        <div className="signUpInput">
                        <Dropdown required options={degreeYearRange} onChange={(data)=>{setSelectedMajorYear(data)}} value={selectedMajorYear}
                                  className="majorYearPicker" placeholder={degreeYearRange[0]}/>
                        </div>
                        <div className="toS">
                            <input required type="checkbox"/> ToS
                        </div>
                        <div className="nextSignUpPageButton">
                            <Button type="submit">Next</Button>
                        </div>

                    </div>
                </form>
            )}
        </Formik>


    );
};

export default RegisterPageOne;