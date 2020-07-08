import React from 'react'
import './sortMethodButton.css'
const SortMethodButton = ({refetch,selectedSortingMethod, setSelectedSortingMethod}) => {
    const autoButtonColor = selectedSortingMethod === 'Auto' ? '#E4E4E4' : "white";
    let ratingButtonColor = selectedSortingMethod === 'Rating' ? '#E4E4E4' : "white";
    let recentButtonColor = selectedSortingMethod === 'Recent' ? '#E4E4E4' : "white";

    const setAuto = () => {
        setSelectedSortingMethod('Auto');
        refetch("RECENT")
    };
    const setRating = () => {
        setSelectedSortingMethod('Rating');
        refetch("RATING")
    };
    const setRecent = () => {
        setSelectedSortingMethod('Recent');
        refetch("RECENT")
    };
    return (
        <div className="sortingSelection">
            <div style={{background:autoButtonColor}}
                 onClick={setAuto} className="sortButton">
                Auto
            </div>
            <div style={{background:ratingButtonColor}}
                 onClick={setRating}  className="sortButton">
                Rating
            </div>
            <div style={{background:recentButtonColor}}
                 onClick={setRecent} className="sortButton">
                Recent
            </div>

        </div>
    );
};
export default SortMethodButton;
