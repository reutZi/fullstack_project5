import React, { useState, useEffect } from 'react';
import '../styles.css';

function Search({ features, list, setFilteredList }) {
    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState(features[0][0]);

    useEffect(() => {
        filterList(search);
    }, [list, searchCriteria, search]);

    const filterList = (val) => {
        setSearch(val);
        const temp = list.filter(item => {
            if (searchCriteria === "checked") {
                return item.completed === true;
            } else if (searchCriteria === "unchecked") {
                return item.completed === false;
            } else if (searchCriteria === "id") {
                return item.id === Number(val);
            } else {
                return search === '' || item[searchCriteria].toLowerCase().includes(val.toLowerCase());
            }
        });
        setFilteredList(temp);
    }

    return (
        <div className="search-container">
            <select
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
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
            />
        </div>
    );
}

export default Search;
