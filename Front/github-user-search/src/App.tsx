import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import { User } from "./types/User";

import "./App.css";

const   App: React.FC = () => {
    const   [users, setUsers] = useState<User[]>([]);
    const   [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const   [editMode, setEditMode] = useState<boolean>(false);

    const   getUid = () : number => {
        return (Math.floor(Math.random() * 1000000));
    }

    const   fetchUsers = useCallback(async (query : string, page : number) => {
        try {
            const   response = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}`);

            if (!response.ok)
                throw new Error("Network response was not ok");
            const   data = await response.json();
            // on assigne un unique id a l'user pour gerer les duplicates
            const   users : User[] = data.items.map((user : User) => {
                user.uid = getUid();
                return (user);
            });

            setUsers(users || []);
            // on reset les users selected en cas de nouvelle recherche
            setSelectedUsers([]);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, []);

    // ==========================================

    const   handleSelectAll = () => {
        // si tout les users sont selected alors on decoche tout (toggle de coche)
        if (selectedUsers.length === users.length) {
            setSelectedUsers([])
            return ;
        }
        // on cree une liste avec les uid de tout les users (select all)
        setSelectedUsers(users.map(user => user.uid));
    };

    const   handleDuplicate = () => {
        // on selectionne les users a dupliquer dans users via la liste de uid : selectedUsers
        const   users_to_duplicate : User[] = users.filter(user => selectedUsers.includes(user.uid));
        // on les stock et on leurs assignent un nouvel uid
        let     users_duplicated : User[] = [];
        
        users_to_duplicate.map((user : User) => {
            // on cree un nouveau pointer sinon ca va ecraser l'uid de l'original
            const   new_user = { ...user };

            new_user.uid = getUid();
            users_duplicated.push(new_user);
        });
        // on ajoute aux users actuel les duplicats
        setUsers(users.concat(users_duplicated));
    };

    const   handleDelete = () => {
        const remainingUsers = users.filter(user => !selectedUsers.includes(user.uid));

        setUsers(remainingUsers);
        // tout les users selected viennent d'etre delete donc on reset la selected liste
        setSelectedUsers([]);
    };

    const   handleCheck = (uid: number) => {
        setSelectedUsers((prevSelected) => {
            let newSelected : number[] = [...prevSelected];

            // si l'uid etait deja present dans la selection on le retire
            if (newSelected.includes(uid)) {
                newSelected = newSelected.filter((i : number) => i !== uid);
            } else // sinon on l'ajoute aux users check
                newSelected.push(uid);

            return (newSelected);
        });
    };

    // ==========================================

    let     appClass = "App";

    if (editMode)
        appClass += " editmode";

    return (
        <div className={appClass}>
            <div id="title">Github Search</div>
            <SearchBar onSearch={fetchUsers} />
            <br />
            <div className="actions">
                    <button onClick={handleSelectAll}>
                        Select All ({selectedUsers.length})
                    </button>
                    <button onClick={handleDuplicate}>Duplicate</button>
                    <button onClick={handleDelete}>Delete</button>
            </div>
            <button id="btn_mode" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            </button>
            <UserList users={users} selectedUsers={selectedUsers} onCheck={handleCheck} />
        </div>
    );
};

export default App;

