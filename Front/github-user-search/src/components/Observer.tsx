import React, { useRef, useMemo, useEffect, useState } from "react";

interface   ObserverProps {
    setIsVisible  : (isVisible : boolean) => void;
}

const       Observer: React.FC<ObserverProps> = ({ setIsVisible }) => {
    // useRef et intersection observer
    // pour detecter au scroll quand query l'API github
    const   targetRef = useRef(null);
    
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
    
        return (() => {
            if (currentTarget) observer.unobserve(currentTarget);
        });
    }, [targetRef, options]);

    return (
		<div ref={targetRef}></div>
    );
};

export default Observer;
