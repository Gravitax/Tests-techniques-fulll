import React from "react";
import { User } from "../types/User";

interface   UserCardProps {
    user        : User;
    isChecked   : boolean;
    onCheck     : (id: number) => void;
}

const       UserCard: React.FC<UserCardProps> = ({ user, isChecked, onCheck }) => {
    return (
        <div className="user-card">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <div className="user-info">
                <div className="container">
                    <p>{user.id}</p>
                    {/* <p>uid : {user.uid}</p> */}
                    <p>{user.login}</p>
                    <a href={user.html_url}>View profile</a>
                    <input className="checkbox"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onCheck(user.uid)}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserCard;
