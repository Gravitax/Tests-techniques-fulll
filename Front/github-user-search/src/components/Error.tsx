import React from "react";

interface   ErrorProps {
    code	: number;
	setCode	: (code : number) => void;
}

const       Error: React.FC<ErrorProps> = ({ code, setCode }) => {
	let	errorClass : string = "error"
	let	errorMessage : string = "";

	switch (code) {
		case (200):
			// si ok on ajoute la classe hide et pas de message d'erreur
			errorMessage = "";
			errorClass += " hide";
			break ;
		case (304):
			errorMessage = "Not modified";
			break ;
		case (403):
			errorMessage = "Forbidden";
			break ;
		case (503):
			errorMessage = "Service unavailable";
			break ;
		default:
			// default: on ajoute la classe hide et pas de message d'erreur
			errorMessage = "";
			errorClass += " hide";
			break ;
	}

	const	on_click = (e : any) => {
		e.target.className += " hide";
		window.scrollTo({ top: 0 });
		setCode(0);
	};

    return (
        <div className={errorClass} onClick={on_click}>
            Github API error ({code}): {errorMessage}
        </div>
    );
};

export default Error;
