import React, {Fragment, useState} from 'react'
import TutoringApplicationContent from "../TutoringApplicationContent";
import Button from "@material-ui/core/Button";
import TutoringApplicationPageTwo from "./TutoringApplicationPageTwo";

const TutoringApplicationPopUp = ({tutorPost, tutorCard, popUpCallBackFunction}) => {
    const [pageNumber, setPageNumber] = useState(1);

    return (
        <div className="TutoringPopUpWrapper" style={{top: '100px'}}>
            {pageNumber === 1 &&
            <Fragment>
                <TutoringApplicationContent tutorPost={tutorPost}/>
                <Button style={{marginBottom: '30px'}} onClick={() => setPageNumber(2)}>Apply</Button>
            </Fragment>
            }

            {pageNumber === 2 &&
            <TutoringApplicationPageTwo goToNextPage={() => {
                setPageNumber(3)
            }} post={tutorPost} tutorCard={tutorCard} popUpCallBackFunction={popUpCallBackFunction}/>
            }

            {pageNumber === 3 &&
            <div className="TutoringApplicationPageThreeWrapper" style={{top: '100px'}}>
                <h1>Great!</h1>
                <p>You will get notification once the user accept your application and start your tutoring! Good
                    luck!</p>
            </div>
            }
        </div>
    )
};

export default TutoringApplicationPopUp;