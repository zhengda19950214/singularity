import React  from 'react'
import './registerPage.css'
import PinInput from "react-pin-input";
import Button from "@material-ui/core/Button";

/*
    Page for client to enter verification code. Code was sent by Amplify Auth to the email user filled in.
*/
const RegisterPageOne = ({submit,resendConfirmationCode,goToSign}) => {
    let enteredPin = "";

    const submitPin = ()=> {
        submit(enteredPin)
    };

    return (
        <div className="registerForm">
            <div className="authWrapperHeader">
                <span onClick={goToSign}>singularity</span>
            </div>
            <div className="pinHints">
                <p>Please check your email for the verification code and enter it below:</p>
            </div>
            <div className="pinInputArea">
                <PinInput
                    length={6}
                    initialValue=""
                    type="numeric"
                    style={{padding: '20px 20px 20px 100px'}}
                    inputStyle={
                        {borderColor: '#808080', width:'25px', height:'25px', marginLeft:"10px",marginRight:"10px", borderRadius:"5px"}}
                    inputFocusStyle={{borderColor: 'black'}}
                    onComplete={(value) => {enteredPin = value}}
                />
            </div>
            <div className="resendWrapper">
                <p>Didn't receive email? <span onClick={resendConfirmationCode}>Send again</span>.</p>
            </div>

            <div className="nextSignUpPageButton">
                <Button onClick={submitPin} type="submit">Submit</Button>
            </div>
        </div>

    );
};

export default RegisterPageOne;