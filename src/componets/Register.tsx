
import React, { useState } from "react";
import "./register.css"
import { register } from "../api/srvice";


interface UserInfo{
    FirstName : string ;
    LastName : string ;
    Age : number ; 
    Job : string;
}

interface RegisterProps{
    onRegister?: () => void;
}
const Register : React.FC<RegisterProps> = ({onRegister}) => {
    const [user , setUser] = useState<UserInfo>({
        FirstName : "" ,
        LastName : "" ,
        Age: 12, 
        Job : "",
    });

    
    const handleChange = (event  :React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = event.target;
        setUser((prev) => ({
            ...prev,
            [name]: name === "Age" ? parseInt(value, 10) : value,
          }));
    };
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token){
            console.error("Token is not set");
            return;
        }
        else{
            try{
                const res = await register(
                    user.FirstName , 
                    user.LastName , 
                    user.Age , 
                    user.Job , 
                    token
                );
                if(res.message === "Person added successfully"){
                    alert("Register Successfull");
                    console.log(res);
                    
                setUser(
                    {
                        FirstName : "",
                        LastName : "" ,
                        Age : 12,
                        Job : "",
                    }
                );
                if(onRegister)onRegister();
                }
                else{
                    alert("Failed to register");
                }

            }
            catch(error){
                console.log("Register Error" , error);
            }
        }
    }

    return(
        <div className="register-container">
            <h3 className="register-title">Register New User</h3>
            <form className="register-form"
            onSubmit={handleSubmit}>
                <p className="register-form-title">First Name</p>
                <input name="FirstName"
                 className="register-form-input"
                 type="text"
                required 
                placeholder="First name"
                value={user.FirstName}
                onChange={handleChange}
                />
                <p className="register-form-title">Last Name</p>
                <input 
                name="LastName"
                className="register-form-input"
                type="text"
                required 
                placeholder="Last name"
                value={user.LastName}
                onChange={handleChange}
                />
                <p className="register-form-title">Job</p>
                <input 
                name="Job"
                className="register-form-input"
                type="text"
                required 
                placeholder="Job"
                value={user.Job}
                onChange={handleChange}
                />
                <p className="register-form-title">Age</p>
                <input 
                name="Age"
                className="register-form-input"
                type="number"
                required 
                placeholder="Age"
                min={12}
                value={user.Age}
                onChange={handleChange}
                />
                <button className="register-submit" type="submit"> Register </button>

            </form>
        </div>
    );
}
export default Register;