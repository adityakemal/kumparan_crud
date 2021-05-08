import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ArrowLeft} from 'react-feather';
import { useHistory } from 'react-router';
import API from '../../api';
import ModalTemplate from '../../shared/ModalTemplate';

function Photos(props) {
    const history = useHistory()

    var albumId = props.match.params.albumId
    
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [detailPhoto, setDetailPhoto] = useState({})
    
    useEffect(()=>{
        API.getPhotos(albumId).then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=>{
            console.log(err.response)
        })
    },[albumId])


    const compDetailPhoto = ()=>{
        const {url, title} = detailPhoto
        return(
            <div className='detail-photo' >
                <img src={ url } alt='detail-photos'/>
                <p>{title}</p>
            </div>
        )
    }

    const handleDetail = (data) =>{
        setDetailPhoto(data)
        setModal(true)
    }

    return (
        <Container maxWidth={"lg"} className="home photos">
        <ModalTemplate onOpen={modal} onClose={()=> setModal(false)} component={compDetailPhoto} />
            <h1><ArrowLeft onClick={()=> history.goBack()}/> PHOTOS </h1>
           <Grid
            container
            spacing={2}
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
            >
                {
                    data.map((res,i)=>(
                        <Grid item className='figure' key={i}>
                            <img src={res.thumbnailUrl} alt={res.title} onClick={()=>handleDetail(res)}/>
                        </Grid>
                    ))
                }

            </Grid>
        </Container>
    );
}

export default Photos;