
import * as Axios from "axios";

const API_USER = {
    getUsers: ()=>{
        return Axios.get(`/users`);
    },
}

export default API_USER