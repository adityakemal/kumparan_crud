import { Button, Container, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Info, Trash2 } from 'react-feather';
import API from '../../api';
import Loading from '../../shared/Loading';
import ModalTemplate from '../../shared/ModalTemplate';
// import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


function PostDetail(props) {
    console.log(props)
    const [comments, setComments] = useState([])

    const [postId, setPostId] = useState(props.match.params.postId)

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [isEdit, setEdit] = useState(false)


    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        API.getPostsComment(postId).then(res=>{
            console.log(res)
            setComments(res.data)
        }).catch(err=>{
            console.log(err.response)
        })
    }

    const handleSubmit = (e)=>{
        setLoading(true)
        const payload = {
            "id": isEdit ? id : uuidv4(),
            "name": name,
            "email": email,
            "body": body
        }
        console.log(payload)
        const methodApi = isEdit ? 'editComment' : 'postComment' 
        API[`${methodApi}`](payload , isEdit ? id : postId).then(res=>{
            console.log(res, 'post add')
            setModal(false)

            setName('')
            setEmail('')
            setBody('')

            setEdit(false)
            getData()
            setLoading(false)
        }).catch(err=>{
            setEdit(false)
            setLoading(false)
            console.log(err.response)
        })
        e.preventDefault()
    }

    const handleEdit = (res) =>{
        setId(res.id)
        setName(res.name)
        setEmail(res.email)
        setBody(res.body)
        setEdit(true)
        setModal(true)
    }

    const handleDelete = (id)=>{
        Swal.fire({
            title: `Are you sure want to delete this data?`,
            showConfirmButton: false,
            showCancelButton: true,
            // confirmButtonText: `Delete`,
            showDenyButton: true,
            denyButtonText: `Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
                setLoading(true)
                API.deleteComment(id).then(res=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setLoading(false)
                    getData()
                }).catch(err=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete failed',
                    })
                    setLoading(false)
                })
            } 
        })
    }

    const modalForm = () =>(
        <div className="modalformwrap">
            <h2>{isEdit ? "EDIT":"ADD"} COMMENT</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    required
                    value={name}
                    size='small'
                    onChange={ e =>setName(e.target.value)}
                    />
                <TextField
                    label="Email"
                    type='email'
                    variant="outlined"
                    required
                    value={email}
                    size='small'
                    onChange={ e =>setEmail(e.target.value)}
                    />
                <TextField
                    required
                    value={body}
                    size='small'
                    onChange={ e =>setBody(e.target.value)}
                    label="Comment"
                    multiline
                    rows={5}
                    variant="outlined"
                />
                <Button type='submit' variant='contained' color='primary'>SAVE</Button>
            </form>
        </div>
    )

    return (
        <Container maxWidth={"lg"} className="post">
             { loading ?<Loading /> : null}
            <ModalTemplate onOpen={modal} onClose={()=>setModal(false)} component={modalForm}/>
            <h1><ArrowLeft/> POST DETAIL</h1>
            <div className="post-detail-text">
                <h2>{props.match.params.title}</h2>
                <p>{props.match.params.body}</p>
            </div>
            <h4>Comments : {comments.length === 0 ? <small><i>No comment found..</i></small>  : ''}</h4>
            
            {
                comments.map((res,i)=>(
                    <div key={i} className='box-comment'>
                        <div>
                            <div className="head-comments">
                                <h4>
                                    {res.name} 
                                    <i><small>({res.email})</small></i>
                                </h4>
                                <div className="box_action">
                                    {/* <Link to={`/post-detail/${res.id}/${res.title}/${res.body}`}>
                                        <Info  color='grey'/>
                                    </Link> */}
                                    <Edit onClick={()=>handleEdit(res)} />
                                    <Trash2 onClick={()=>handleDelete(res.id)} />
                                </div>
                            </div>

                            <p>"{res.body}"</p>
                        </div>
                    </div>
                ))
            }
           
            <Button variant='contained' color='primary' onClick={()=>setModal(true)}>add comment</Button>
            <br/>
            <br/>
        </Container>
    );
}

export default PostDetail;