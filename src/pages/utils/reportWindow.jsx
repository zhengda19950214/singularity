import React, {Fragment, useState} from "react";
import './reportWindow.css'
import Button from "@material-ui/core/Button";

const ReportWindow = ({
                          user,
                          closeWindow,
                          reportContent = "You have received a report",
                          tutorPostReport = false,
                            reportType
                      }) => {
    const [cheatingCheck, setCheatingCheck] = useState(false);
    const [harassmentCheck, setHarassmentCheck] = useState(false);
    const [hateCheck, setHateCheck] = useState(false);
    const [spamCheck, setSpamCheck] = useState(false);
    const [illegalCheck, setIllegalCheck] = useState(false);
    const [otherCheck, setOtherCheck] = useState(false);
    const [additionInformation, setAdditionInformation] = useState('');

    const refineReportContent = () => {
        let finalReportContent = reportContent;
        finalReportContent += '\nThere are the reasons for report: \n';
        finalReportContent += `${cheatingCheck ? 'cheating \n' : ''}${harassmentCheck ? 'harassment \n' : ''}${hateCheck ? 'hate \n' : ''}`;
        finalReportContent += `${spamCheck ? 'spam \n' : ''}${illegalCheck ? 'illegal \n' : ''}${otherCheck ? 'other \n' : ''}`;
        finalReportContent += `And here is additional information: \n${additionInformation}`;
        return finalReportContent;
    };
    const sendReport = () => {
        fetch('https://3u80h8uof7.execute-api.us-east-1.amazonaws.com/prod/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: refineReportContent()
            })
        }).then(() => {
            closeWindow();
        })
    };
    return (
        <Fragment>
            <div className="greyOutCoverBackground">
            </div>
            <div className="reportWindow">

                <div className="reportHeader">
                    <h1>
                        <b>Report</b> {user?user.firstName + ' ' + user.lastName+"'s ":''} {reportType}
                    </h1>
                </div>
                <div className="reportOptions">
                    {tutorPostReport &&
                    <div className="reportOption" onClick={() => setCheatingCheck(!cheatingCheck)}><input type="radio"
                                                                                                          checked={cheatingCheck}/>
                        <span>Cheating</span></div>}
                    {!tutorPostReport &&
                    <div className="reportOption" onClick={() => setHarassmentCheck(!harassmentCheck)}><input
                        type="radio" checked={harassmentCheck}/> <span>Harassment or bullying</span></div>}
                    <div className="reportOption" onClick={() => setHateCheck(!hateCheck)}><input type="radio"
                                                                                                  checked={hateCheck}/>
                        <span>Hate speech/racism</span></div>
                    <div className="reportOption" onClick={() => setSpamCheck(!spamCheck)}><input type="radio"
                                                                                                  checked={spamCheck}/>
                        <span>Spam or advertisement</span></div>
                    <div className="reportOption" onClick={() => setIllegalCheck(!illegalCheck)}><input type="radio"
                                                                                                        checked={illegalCheck}/>
                        <span>Illegal activities</span></div>
                    <div className="reportOption" onClick={() => setOtherCheck(!otherCheck)}><input type="radio"
                                                                                                    checked={otherCheck}/>
                        <span>Other</span></div>
                </div>
                <div className="reportInformation">
                    <textarea value={additionInformation} placeholder={"Additional Information(Optional)"}
                              onChange={(e) => {
                                  setAdditionInformation(e.target.value)
                              }}/>
                </div>
                <div className="reportActions">
                    <Button id="cancel" style={{width: "91px", height: "30px"}}
                            onClick={closeWindow}><span>Cancel</span></Button>
                    <Button id="report" style={{width: "91px", height: "30px"}} onClick={sendReport}><span>Report</span></Button>
                </div>
            </div>
        </Fragment>
    )
};
export default ReportWindow;