
import * as Axios from "axios";
// import Swal from "sweetalert2";
import API_COMMENT from "./apiComment";
import API_POST from "./apiPost";
import API_USER from "./apiUser";

//GLOBAL AXIOS BASE URL
Axios.defaults.baseURL = `http://${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`;

//HANDLE GLOBAL ERROR AXIOS
// Axios.interceptors.response.use((response) => response, (error) => {
//   // whatever you want to do with the error
//   if(error.response.data.code === 401){
//     window.localStorage.clear()
//     Swal.fire({
//         icon: 'error',
//         title: 'OOPS!',
//         text: 'Token expire silahkan login kembali',
//         showConfirmButton: true,
//     }).then(()=> window.location.reload())
//   }
//   throw error;
// });

const API = {
    ...API_USER,
    ...API_POST,
    ...API_COMMENT
};

export default API;
