import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

function Search({ features, list, setFilteredList }) {
    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState(features[0][0]);
    const inputRef = useRef(null);

    useEffect(() => {
        filterList(search);
    }, [list, search, searchCriteria]);

    const filterList = (val) => {
        setSearch(val);
        const temp = list.filter(item => {
            if (searchCriteria === "checked") {
                return item.completed === true;
            } else if (searchCriteria === "unchecked") {
                return item.completed === false;
            } else if (searchCriteria === "id") {
                return item.id.includes(val);
            } else {
                return search === '' || item[searchCriteria].toLowerCase().includes(val.toLowerCase());
            }
        });
        setFilteredList(temp);
    }

    const handleCriteriaChange = (e) => {
        setSearchCriteria(e.target.value);
        setSearch(''); // Clear the search input
        inputRef.current.focus(); // Focus on the text field
    };

    return (
        <div className="search-container">
            <select
                value={searchCriteria}
                onChange={handleCriteriaChange}
                className="search-select"
            >
                {features.map(([feature, name], index) => (
                    <option key={index} value={feature}>{name}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Search term"
                value={search}
                onChange={(e) => filterList(e.target.value)}
                className="search-input"
                disabled={searchCriteria === "checked" || searchCriteria === "unchecked"}
                ref={inputRef}
            />
        </div>
    );
}

export default Search;
