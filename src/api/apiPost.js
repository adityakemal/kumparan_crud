
import * as Axios from "axios";

const API_POST = {
    getPosts: ()=>{
        return Axios.get(`/posts`);
    },
    postPost: (props)=>{
        return Axios.post(`/posts`, props);
    },
    editPost: (props, id)=>{
        return Axios.patch(`/posts/${id}`, props);
    },
    deletePost: (id)=>{
        return Axios.delete(`/posts/${id}`);
    },
}

export default API_POST