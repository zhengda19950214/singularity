import React, {useState} from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {Link } from "react-router-dom"
const SearchInput = () => {
    const [searchContent, setSearchContent] = useState("");
    const clickSearch = (e)=>{
        if(searchContent.length === 0){
            e.preventDefault();
        }
        setSearchContent('')

    };
    const pressEnter = (e) =>{
        if (e.key === 'Enter'){
            window.location.replace( `/searchPage/${escape(searchContent)}`);
        }
    };
    return (
        <div className="inputArea">
            <input
                value={searchContent}
                style={{paddingLeft:"10px"}}
                onChange={(e)=>{setSearchContent(e.target.value)}}
                onKeyDown={pressEnter}
                placeholder="Search questions, topics, articles..."
            />
            <Link  onClick={clickSearch} to={`/searchPage/${escape(searchContent)}`}><SearchOutlinedIcon /></Link>
        </div>
    )
};

export default SearchInput;