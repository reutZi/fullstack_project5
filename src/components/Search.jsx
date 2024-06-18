import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import Comment from './Comment';
import { useForm } from 'react-hook-form';


function Search({ features, list, setFilteredList }) {

    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState(features[0][0]);


    useEffect(() => {
        console.log('list: ', list);
        filterList(search);
    }, [list, searchCriteria, search]);

    const filterList = (val) => {

        setSearch(val);
        var temp = list.filter(
            item => search === '' ||
                (searchCriteria === "id" ? item.id === search : item[searchCriteria].toLowerCase().includes(search?.toLowerCase())));
        setFilteredList(temp);
    }

    return (
        <div>
            <label>Search By:</label>

            <select onChange={(e) => setSearchCriteria(e.target.value)}>
                {features.map(([feature, name], index) => (<option key={index} value={feature}>{name}</option>))}
            </select>
            <input
                type="text"
                placeholder="Search term"
                value={search}
                onChange={(e) => filterList(e.target.value)}

            // onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )

}
export default Search;
