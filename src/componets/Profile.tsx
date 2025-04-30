import { use, useEffect, useState } from "react";
import { getPeople, getProfile } from "../api/srvice";
import UserCard from "./UserCard";
import "./profile.css"
import Register from "./Register";

interface User {
    FirstName : string ;
    LastName : string ; 
    Age : number;
    Job: string;
}

const Profile : React.FC = () => {
    const [userName , setUserName] = useState<string>("Admin");
    const [users , setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.error("token is not set");
            return;
        }
        else {
            try{
                const list = await getPeople(token);
                const peopleList : User[] = Object.values(list);
                setUsers(peopleList);

            }
            catch(error){
                console.error("error fetching users" , error);
            }
        }
    }
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if(!token){
                console.error("no token");
                return;
            }
            try{
                const profileData = await getProfile(token);
                setUserName(profileData.Username);

                const peopleData = await getPeople(token);
                const peopleList : User[] = Object.values(peopleData);
                setUsers(peopleList);
            }
            catch(error){
                console.error("error fething data " , error);
            }

        };
        fetchProfile();

    } , []);
    return(
        <div className="profile-wrapper">
            <h1 className="profile-title">Welcome {userName}</h1>

            <div className="profile-container">

                <div className="profile-left">
                    <h3 className="active-user-text">Active Users</h3>
                {users.map((user , index) => (
                   <UserCard
                   key={index} 
                   firtName={user.FirstName}
                   lastName={user.LastName} 
                   age={user.Age}
                   job={user.Job}/>
                ))}
                </div>
                <div className="profile-right">
                    <Register onRegister={fetchUsers}/>
                </div>

            </div>
        </div>

    );
}
export default Profile;