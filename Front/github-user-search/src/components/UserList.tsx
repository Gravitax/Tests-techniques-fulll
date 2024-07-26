import React from "react";
import UserCard from "./UserCard";
import { User } from "../types/User";

interface   UserListProps {
    users           : User[];
    selectedUsers   : Array<number>;
    onCheck         : (id: number) => void;
}

const       UserList: React.FC<UserListProps> = ({ users, selectedUsers, onCheck }) => {
    return (
        <div className="user-list">
            {users.map((user) => (
                <UserCard
                    key={user.uid}
                    user={user}
                    isChecked={selectedUsers.includes(user.uid)}
                    onCheck={onCheck}
                />
            ))}
        </div>
    );
};

export default UserList;
