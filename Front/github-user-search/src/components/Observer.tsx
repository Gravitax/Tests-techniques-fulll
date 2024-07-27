import React, { useRef, useMemo, useEffect, useState } from "react";
import { User } from "../types/User";

interface   ObserverProps {
    ftFetch : (query: string, page : number) => void;
    page    : number;
}

const       Observer: React.FC<ObserverProps> = ({ ftFetch, page }) => {
    // useRef et intersection observer
    // pour detecter au scroll quand query l'API github
    const   targetRef = useRef(null);
    const   [isVisible, setIsVisible] = useState(false);
    
    const   callbackFunction = (entries : any) => {
        const   [entry] = entries;
    
        setIsVisible(entry.isIntersecting);
    };
    
    const   options = useMemo(() => {
        return ({
            root        : null,
            rootMargin  : "0px",
            threshold   : 0, // go voir le man si vous avez des questions
        });
    }, []);
    
    useEffect(() => {
        const   observer = new IntersectionObserver(callbackFunction, options);
        const   currentTarget = targetRef.current;
    
        if (currentTarget) observer.observe(currentTarget);

        const   timer = setTimeout(() => {
            if (isVisible) {
                const   searchbar = document.getElementById("searchbar") as HTMLInputElement;
    
                ftFetch(searchbar.value, page + 1);
            }
        }, 500);
    
        return (() => {
            if (currentTarget) observer.unobserve(currentTarget);
            clearTimeout(timer)
        });
    }, [targetRef, options, isVisible]);

    return (
		<div ref={targetRef}></div>
    );
};

export default Observer;
