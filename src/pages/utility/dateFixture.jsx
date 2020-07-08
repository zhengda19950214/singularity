Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
const yearRange = Array.range(1965,2009).reverse();
export const educationFromYearRangeOption = Array.range(1965,2020).reverse();
export const educationToYearRangeOption = Array.range(1965,2030).reverse();
export const tutorialPostPriceRange = ["Negotiable","$0-$10","$10-$50","$50-$100","$100-$150",
    "$150-$200","$200-$300","$300-$400","$400-$500"];
export const educationDegree = [{number:1,value:"High school diploma"},{number:2,value:"Bachelor's degree"},{number:3,value:"Master's degree"},{number:4,value:"PhD"},{number:5,value:"MD"}];
export const standardDays = Array.range(1,32);
export const monthRange = [{number:1,value:"January"}, {number:2,value:"February"}, {number:3,value:"March"},
    {number:4,value:"April"}, {number:5,value:"May"}, {number:6,value:"June"},
    {number:7,value:"July"}, {number:8,value:"August"}, {number:9,value:"September"},
    {number:10,value:"October"}, {number:11,value:"November"}, {number:12,value:"December"}];
export const calculateDays = (year, month) => {
    if(["January", "March", "May", "July", "August", "October", "December"].indexOf(month)>-1){
        return Array.range(1,32)
    }
    if(["April","June", "September", "November"].indexOf(month)>-1){
        return Array.range(1,31)
    }
    if(year%4 === 0){
        return Array.range(1,29)
    }
    return Array.range(1,30)


};

export const degreeYearRange = ["Undergraduate 1st year","Undergraduate 2nd year","Undergraduate 3rd year",
    "Undergraduate 4th year","Undergraduate 5th year","Professional degree","Master's degree","Doctorates"];
export default yearRange;