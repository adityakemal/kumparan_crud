import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Info, Trash2 } from 'react-feather';
// import { useHistory } from "react-router-dom";

function Photos(props) {
    const [data, setData] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        axios.get(`https://jsonplaceholder.typicode.com/photos/`).then(res=>{
            console.log(res)
            setData(res.data.filter(res=> res.albumId === parseInt(props.match.params.albumId)))
        }).catch(err=>{
            console.log(err.response)
        })
    }
    return (
        <Container maxWidth={"lg"} className="photos">
            <h1><ArrowLeft/> PHOTOS {props.match.params.albumId}</h1>
           <Grid
            container
            spacing={2}
            >
                {
                    data.map((res,i)=>(
                        <Grid item >
                            <img src={res.thumbnailUrl} alt={res.title}/>
                        </Grid>
                    ))
                }

            </Grid>
        </Container>
    );
}

export default Photos;