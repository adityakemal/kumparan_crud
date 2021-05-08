
import * as Axios from "axios";

const API_ALBUM = {
    getAlbums: (userId)=>{
        return Axios.get(`/users/${userId}/albums`);
    },
    getPhotos: (albumId)=>{
        return Axios.get(`/albums/${albumId}/photos`);
    },
}

export default API_ALBUM