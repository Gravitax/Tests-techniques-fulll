import React, { useState, useEffect } from "react"

interface   SearchBarProps {
    onSearch    : (query: string, page : number) => void;
}

const       SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const   [query, setQuery] = useState<string>("");

    useEffect(() => {
        const   timer = setTimeout(() => {
            if (query.length > 2) {
                window.scrollTo({
                    top         : 0,
                    behavior    : "smooth",
                });
                onSearch(query, 1);
            }
        }, 500);

        return (() => clearTimeout(timer));
    }, [query]);

    return (
        <div id="searchbar_container">
            <input id="searchbar" data-testid="searchbar"
                type="text"
                placeholder="Search input"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />
        </div>
    );
};

export default SearchBar;
