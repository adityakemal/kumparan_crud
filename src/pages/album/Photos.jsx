import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Info, Trash2 } from 'react-feather';
import ModalTemplate from '../../shared/ModalTemplate';
// import { useHistory } from "react-router-dom";

function Photos(props) {
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [detailPhoto, setDetailPhoto] = useState({})
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

    const compDetailPhoto = ()=>{
        const {url, title} = detailPhoto
        return(
            <div className='detail-photo' style={{background : 'white', padding: 20}}>
                <img src={ url } alt='detail-photos'/>
                <h2 style={{width : 600}}>{title}</h2>
            </div>
        )
    }

    const handleDetail = (data) =>{
        setDetailPhoto(data)
        setModal(true)
    }

    return (
        <>
        <ModalTemplate onOpen={modal} onClose={()=> setModal(false)} component={compDetailPhoto} />
        <Container maxWidth={"lg"} className="photos">
            <h1><ArrowLeft/> PHOTOS </h1>
           <Grid
            container
            spacing={2}
            >
                {
                    data.map((res,i)=>(
                        <Grid item  key={i}>
                            <img src={res.thumbnailUrl} alt={res.title} onClick={()=>handleDetail(res)}/>
                        </Grid>
                    ))
                }

            </Grid>
        </Container>
        </>
    );
}

export default Photos;