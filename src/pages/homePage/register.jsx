import React, {useState} from 'react'
import RegisterPageOne from './registerPageOne'
import RegisterPageTwo from './registerPageTwo'
import './registerPage.css'
import {Auth} from 'aws-amplify';
import RegisterConfirmationPage from "./registerConfirmationPage";
import ApolloClient, {InMemoryCache} from "apollo-boost";
import {degreeYearRange} from "../utility/dateFixture";

/* 
    Register page is used for client to register new account. It contains three steps:
    1. Fill in basic information.
    2. Enter verify code from Email.
    3. Upload thumbnail and finish the regiser.
*/

const RegisterPage = ({signUpStage=1,userEmail, setCurrentUserEmail,userPassword, setUserPassword,setSignIn}) => {
    const [page, setPage] = useState(signUpStage);
    const [currentUserId, setCurrentUserId] = useState("");
    const [client,setClient] = useState();
    const [selectedMajorYear, setSelectedMajorYear] = useState({value:degreeYearRange[0],label:degreeYearRange[0]});
    const submit = (email, password,firstName,lastName,university,major) => {
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                "custom:personal":JSON.stringify({
                    firstName:firstName,
                    lastName:lastName
                }),
                "custom:education":JSON.stringify({
                    school:university,
                    major:major,
                    year:selectedMajorYear.value || selectedMajorYear
                })

            },
        })
            .then(data => {
                    setCurrentUserEmail(email);
                    setUserPassword(password);
                    setCurrentUserId(data.userSub);
                    setPage(2)
                }
            )
            .catch(err => alert(err.message));
    };
    const resendConfirmationCode = () => {
        Auth.resendSignUp(userEmail).then(() => {
            alert('code resent successfully');
        }).catch(() => {
        });
    };
    const submitPin = async enteredPin => {
        Auth.confirmSignUp(userEmail, enteredPin).then
            (() => {
                Auth.signIn({
                    username: userEmail,
                    password: userPassword,
                }).then(async () => {
                    const result = await Auth.currentSession();
                    setClient(new ApolloClient({
                        uri:'https://ivuzzjl262.execute-api.eu-west-2.amazonaws.com/develop/',
                        cache:new InMemoryCache(),
                        request: (operation) => {
                            operation.setContext({
                                headers: {
                                    authorization:`Bearer ${result.getIdToken().getJwtToken()}`
                                }
                            })
                        }
                    }));
                    setPage(3);
                })
                    .catch(err => {
                        alert(err.message)
                    });

            }).catch(err => {
            alert(err.message);
        });
    };
    const confirmUser = () => {
        setSignIn();
    };
    return (
        <div className="authWrapper">
            {page === 1 &&
            <RegisterPageOne
                goToSign={setSignIn}
                selectedMajorYear={selectedMajorYear}
                setSelectedMajorYear={setSelectedMajorYear}
                submit={submit}/>}
            {page === 2 && <RegisterPageTwo
                submit={submitPin}
                goToSign={setSignIn}
                resendConfirmationCode={resendConfirmationCode}/>}
            {page === 3 &&
            <RegisterConfirmationPage
                goToSign={setSignIn}
                client={client}
                submit={confirmUser} currentUserId={currentUserId}/>}
        </div>
    );
};

export default RegisterPage;