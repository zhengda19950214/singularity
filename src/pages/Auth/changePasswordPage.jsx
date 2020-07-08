import React from "react";
import './changePasswordPage.css'
import {Formik} from "formik";
import {Auth} from 'aws-amplify';
import Button from "@material-ui/core/Button";

const ChangePasswordPage = () => {

    return (
        <div className="homePage">
            <div className="homePageContent" >
                <div className="changePasswordWrapper">
                    <div className="changePasswordHeader">
                        <h1>Change Password</h1>
                    </div>
                    <div className="changePasswordInputWrapper">
                        <Formik
                            initialValues={{oldPassword: '', newPassword: '', confirmPassword: ''}}
                            validate={values => {
                                const errors = {};
                                if (values.newPassword !== values.confirmPassword) {
                                    errors.password = 'new password must be the same as confirmed password';
                                }
                                return errors;
                            }}
                            onSubmit={(values) => {
                                Auth.currentAuthenticatedUser()
                                    .then(user => {
                                        return Auth.changePassword(user, values.oldPassword, values.newPassword);
                                    })
                                    .then(data => {
                                        if (data) {
                                            Auth.signOut()
                                                .then(() => window.location.reload())
                                                .catch(err => console.log(err));
                                        }
                                    })
                                    .catch(err => console.log(err));
                            }}
                        >{({
                               values,
                               errors,
                               handleChange,
                               handleSubmit,
                           }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="changePasswordInput">
                                    <span>old password</span>
                                    <input
                                        onChange={handleChange}
                                        value={values.oldPassword}
                                        name="oldPassword"
                                        id="oldPassword"
                                        type="password"/>
                                </div>
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

                                <div className="changePasswordButton">
                                    <Button type="submit"><span>Done</span></Button>
                                </div>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    )
};
export default ChangePasswordPage;