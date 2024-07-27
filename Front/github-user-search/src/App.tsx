import React, { useState, useRef, useMemo, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import Observer from "./components/Observer";
import Error from "./components/Error";
import { User } from "./types/User";

import "./App.css";

const   App: React.FC = () => {
    const   [users, setUsers] = useState<User[]>([]);
    const   [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const   [editMode, setEditMode] = useState<boolean>(false);
    const   [pageCount, setPageCount] = useState<number>(1);
    const   [httpCode, sethHttpCode] = useState<number>(0);

    const   getUid = () : number => {
        return (Math.floor(Math.random() * 1000000));
    }

    const   fetchUsers = (query : string, page : number) => {
        // on tient le pageCount a jour car searchbar peut envoyer 1
        // sur une nouvelle query
        setPageCount(page);

        fetch(`https://api.github.com/search/users?q=${query}&page=${page}`)
            .then(response => {
                // on stock le status de la response pour gerer les erreurs
                sethHttpCode(response.status);
                return (response.json());
            })
            .then((data) => {
                // on assigne un unique id a l'user pour gerer les duplicates
                const   new_loaded_users : User[] = data.items.map((user : User) => {
                    user.uid = getUid();
                    return (user);
                });

                // si on demande la page 1 c'est qu'on reset la query
                if (page === 1) {
                    setUsers(new_loaded_users);
                } else { // sinon on concatene les new et les anciens
                    setUsers(users.concat(new_loaded_users));
                }
                // on reset les users selected en cas de nouvelle recherche
                setSelectedUsers([]);
            }).catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    // ==========================================

    const   [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const   timer = setTimeout(() => {
            if (isVisible && users.length > 0) {
                const   searchbar = document.getElementById("searchbar") as HTMLInputElement;
    
                fetchUsers(searchbar.value, pageCount + 1);
            }
        }, 500);

        return (() => {
            clearTimeout(timer)
        });
    }, [isVisible, users]);

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
            <Error code={httpCode} setCode={sethHttpCode} />
            <header>
                <div id="title">Github Search</div>
                <SearchBar onSearch={fetchUsers} />
                { users.length > 0 &&
                    <div className="actions">
                        <button onClick={() => setEditMode(!editMode)}>
                            {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
                        </button>
                        <div className="container">
                            <button onClick={handleSelectAll}>
                                Select All ({selectedUsers.length})
                            </button>
                            <button onClick={handleDuplicate}>Duplicate</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                }
            </header>
            <UserList users={users} selectedUsers={selectedUsers} onCheck={handleCheck} />
            <Observer setIsVisible={setIsVisible} />
        </div>
    );
};

export default App;

