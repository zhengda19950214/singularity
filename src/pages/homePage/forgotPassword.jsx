import React from "react";
import {Formik} from "formik";
import {Auth} from 'aws-amplify';
import Button from "@material-ui/core/Button";
import './forgotPassword.css'

const ForgotPassword = ({userEmail,setSighIn}) => {

    const resendConfirmationCode = () => {
        Auth.forgotPassword(userEmail)
            .then(data => {
                alert(data.message);
            })
            .catch(err =>{
                    if(err.name === "UserNotFoundException"){
                        alert("This user doesn't exist")
                    }
                    else{
                        alert("Please try again");
                    }
                }

            );
    };
    return (
        <div className="authWrapper">
                <div className="changePasswordWrapper" id="changePasswordInHomePage">
                    <div className="changePasswordHeader">
                        <h1>Forgot Password</h1>
                    </div>
                    <div className="changePasswordInputWrapper">
                        <Formik
                            initialValues={{confirmationCode: '', newPassword: '', confirmPassword: ''}}
                            validate={values => {
                                const errors = {};
                                if (values.newPassword !== values.confirmPassword) {
                                    errors.password = 'New password must be the same as confirmed password';
                                }
                                if(values.newPassword.length === 0){
                                    errors.password = 'Please enter the new password';
                                }
                                if(values.confirmationCode.length === 0){
                                    errors.confirmation = 'Please enter the confirmation code';
                                }
                                return errors;
                            }}
                            onSubmit={(values) => {
                                Auth.forgotPasswordSubmit(userEmail, values.confirmationCode, values.newPassword)
                                    .then(() =>
                                    {
                                        alert("Password has been reset");
                                        setSighIn();

                                    })
                                    .catch(err => {
                                        console.log(err);
                                        if(err.name === "ExpiredCodeException"){
                                            alert("Code has expired, please get the new code");
                                        }
                                        else{
                                            alert("Code is wrong, please enter the correct code");
                                        }
                                    });
                            }}
                        >{({
                               values,
                               errors,
                               handleChange,
                               handleSubmit,
                           }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="changePasswordInput">

                                    <span>new password</span> <input
                                    onChange={handleChange}
                                    value={values.newPassword}
                                    name="newPassword"
                                    id="newPassword"
                                    type="password"/>
                                </div>
                                <div className="passwordError">
                                    <span>{errors.password}</span>
                                </div>
                                <div className="changePasswordInput">

                                    <span>confirm password</span>
                                    <input
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        type="password"/>
                                </div>

                                <div className="forgotPasswordConfirmation">

                                    <span>Confirmation Code</span>
                                    <input
                                        onChange={handleChange}
                                        value={values.confirmationCode}
                                        name="confirmationCode"
                                        id="confirmationCode"/>
                                        <p onClick={resendConfirmationCode}>Resend the code</p>
                                </div>
                                <div className="passwordError">
                                    <span>{errors.confirmation}</span>
                                </div>
                                <div className="changePasswordButton">
                                    <Button onClick={()=>{setSighIn()}}><span>Back</span></Button>
                                    <Button type="submit"><span>Done</span></Button>
                                </div>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>

        </div>

    )
};
export default ForgotPassword;