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
                onSearch(query, 1);
        }, 500);

        return (() => clearTimeout(timer));
    }, [query, onSearch]);

    const   pageUp = () => {
        const   searchbar : any = document.getElementById("searchbar");
        
        if (searchbar) {
            const   query : string = searchbar.value;
            
            setPageCount(pageCount + 1);
            onSearch(query, pageCount);
        }
    };

    const   pageDown = () => {
        if (pageCount > 1) {
            const   searchbar : any = document.getElementById("searchbar");
            
            if (searchbar) {
                const   query : string = searchbar.value;

                setPageCount(pageCount - 1);
                onSearch(query, pageCount);
            }
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
                    <p onClick={pageUp}>+</p>
                    <p onClick={pageDown}>-</p>
                </div>
            }
        </div>
    );
};

export default SearchBar;
