import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Info, Trash2 } from 'react-feather';
// import { useHistory } from "react-router-dom";

function PostDetail(props) {
    console.log(props)
    const [comments, setComments] = useState([])
    const [data, setData] = useState({})
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts/${props.match.params.postId}`).then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=>{
            console.log(err.response)
        })

        axios.get(`https://jsonplaceholder.typicode.com/posts/${props.match.params.postId}/comments`).then(res=>{
            console.log(res)
            setComments(res.data)
        }).catch(err=>{
            console.log(err.response)
        })
    }
    return (
        <Container maxWidth={"lg"} className="detail-post">
            <h1><ArrowLeft/> POST DETAIL</h1>
            <h3>{data.title}</h3>
            <p>{data.body}</p>
            <h4>comments :</h4>
            {
                comments.map((res,i)=>(
                    <div key={i} className='box-comment'>
                        <small>
                            <h4>{res.name} <i><small>({res.email})</small></i></h4>
                            <p>"{res.body}"</p>
                        </small>
                    </div>
                ))
            }
        </Container>
    );
}

export default PostDetail;