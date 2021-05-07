
import * as Axios from "axios";

const API_COMMENT = {
    getPostsComment: (postId)=>{
        return Axios.get(`/posts/${postId}/comments`);
    },
    postComment: (data, postId)=>{
        return Axios.post(`/post/${postId}/comments`, data);
    },
    editComment: (props, id)=>{
        return Axios.patch(`/comments/${id}`, props);
    },
    deleteComment: (id)=>{
        return Axios.delete(`/comments/${id}`);
    },
}

export default API_COMMENT