import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";

const BASE_URL = "https://auth.livingston.atlasrnd.group"

interface token{
    token : string;
}


export const login = async (username : string , password : string) => {
    //not adding base url cause proxy is added in package.json
    const res = await axios.post(`/login` , {
        Username : username , 
        Password : password ,
    });
    const token = res.data.token;
    //localStorage.setItem("token", token);
   

    return res.data;
}

export const register = async(firstName : string , lastName : string , age : number , job : string , token : string) => {

    //not adding base url cause proxy is added in package.json
    const res = await axios.post(`/add_person` , {
        FirstName : firstName , 
        LastName : lastName ,
        Age : age , 
        Job : job ,
    } , {
        headers : {
            Authorization : `Bearer ${token}`,
        },
    });
    return res.data;
}

export const getProfile = async(token : string) => {
    const res = await axios.get(`/userinfo` , {
        headers : {
            Authorization : `Bearer ${token}` , 
        },
    });
    return res.data;
}
export const getPeople = async(token : string) => {
    const res = await axios.get(`/get_people`, {
        headers : {
            Authorization : `Bearer ${token}` , 
        },
    });
    return res.data

}