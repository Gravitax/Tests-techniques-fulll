import React, { useState, useEffect } from "react"

interface   SearchBarProps {
    onSearch    : (query: string, page : number) => void;
}

const       SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const   [query, setQuery] = useState<string>("");
    const   [pageCount, setPageCount] = useState<number>(1);

    useEffect(() => {
        const   timer = setTimeout(() => {
            if (query.length > 2)
                onSearch(query, pageCount);
        }, 500);

        return (() => clearTimeout(timer));
    }, [query, pageCount, onSearch]);

    const   pageUp = () => {
        setPageCount(pageCount + 1);
    };

    const   pageDown = () => {
        if (pageCount > 1) {
            setPageCount(pageCount - 1);
        }
    };

    return (
        <div id="searchbar_container">
            <input id="searchbar" data-testid="searchbar"
                type="text"
                placeholder="Search input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {
                query.length > 0 &&
                <div id="pagination">
                    <div>
                        <p onClick={pageUp}>+</p>
                        <p onClick={pageDown}>-</p>
                    </div>
                    <p>Page : {pageCount}</p>
                </div>
            }
        </div>
    );
};

export default SearchBar;
