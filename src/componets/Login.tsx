import React, { useState } from "react";
import { login } from "../api/srvice";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FaAsterisk } from "react-icons/fa";
interface UserInfo {
    userName : string ;
    password : string;
}

const Login : React.FC = () =>{

    const navigate = useNavigate();

    const [userInfo , setUserInfo] = useState<UserInfo>({
        userName : "" ,
        password : "",
    });
    
    const callLogin = async() => {
        try{
            const token = await login(userInfo.userName , userInfo.password);
            localStorage.setItem('token' , token.token);
            alert("Logged in");
            navigate('/profile');
            

        }catch(error){
            console.error("login error " , error);
            alert("Error");
        }
    }
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        
        setUserInfo(prev => ({
            ...prev ,
           [ event.target.name] : event.target.value ,
            
        }));
    };
    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault();
        callLogin();
    }
    return(
       
        <div className="login-wrapper">
            <div className="kososher">
            <div className="login-left">
            <img src="/illustration.png" alt="scale"/>
            </div>
        <div className="login-right">
            
                <div className="logo"> 
                    <img src="/plus.png"/>
                </div>
            
            <form onSubmit={handleSubmit} className="login-form">
            <p className="form-title">Login to your Account</p>
            <p className="form-text">See what is going on with your business</p>
            <button  
            className="continue-google">
             Continue with Google</button>

            <p className="form-text1">------- or Sign in with Email -------</p>
                
                <p className="input-text">Email</p>
            
               
                <input className="username-input"
                type="text"
                name="userName" 
                placeholder="User name"
                required 
                value={userInfo.userName}
                onChange={handleChange}/>
                <p className="input-text">Password</p>
                <input
                className="password-input"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={userInfo.password}
                onChange={handleChange}/>
                
                <div className="remember-container">
                    <label className="remember-me">
                    <input type="checkbox" className="checkbox"/>
                    <p>Remeber Me?</p> </label>
                <p className="forget-password">Forget Password</p>
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
        
        </div>
        </div>
        

    );
}

export default Login;