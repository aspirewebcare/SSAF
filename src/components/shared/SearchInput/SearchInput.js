import React from 'react';
import icons from '../icons';

const SearchInput = ({searchRef,setSearch}) => {
    return (
        <div className="w-full lg:w-[250px] bg-white border rounded-lg flex items-center gap-2 px-3">
            <icons.search className="text-gray-400 text-2xl lg:text-xl" />
            <input
                ref={searchRef}
                onChange={(e) => setSearch(e.target.value)}
                className="text-base lg:text-[13px] w-full outline-none text-gray-600 py-3"
                placeholder="Search anything"
                type="search"
                name=""
                id=""
            />
        </div>
    );
};

export default SearchInput;