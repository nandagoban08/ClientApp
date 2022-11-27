import axios from "axios";

export default axios.create(
    {
        baseURL:"https://localhost:7127/api/Authentication",
        headers:{
            
            "Content-type":"application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

    }
);