import { Button, Container, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Info, Trash2 } from 'react-feather';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useHistory } from "react-router-dom";
import API from '../../api';
import Loading from '../../shared/Loading';
import Swal from 'sweetalert2';
import ModalTemplate from '../../shared/ModalTemplate';
import { v4 as uuidv4 } from 'uuid';


function Posts(props) {
    const history = useHistory()
    const userId = props.match.params.userId
    const [data, setData] = useState([])
    
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [isEdit, setEdit] = useState(false)
    
    const [callApi, setCallApi] = useState(false)
    
    
    useEffect(()=>{
        API.getPosts(userId).then(res=>{
            setData(res.data)
        }).catch(err=>{
            console.log(err.response)
        })
    },[userId, callApi])


    const handleSubmit = (e)=>{
        setLoading(true)
        const payload = {
            "userId": userId,
            "id": isEdit ? id : uuidv4(),
            "title": title,
            "body": body
        }
        console.log(payload)
        const methodApi = isEdit ? 'editPost' : 'postPost' 
        API[`${methodApi}`](payload,isEdit ? id : '').then(res=>{
            console.log(res, 'post add')
            setModal(false)
            setTitle('')
            setBody('')
            setEdit(false)
            // getData()
            setCallApi(!callApi)
            setLoading(false)
        }).catch(err=>{
            setEdit(false)
            setLoading(false)
            console.log(err.response)
        })
        e.preventDefault()
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
                API.deletePost(id).then(res=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setLoading(false)
                    // getData()
                    setCallApi(!callApi)
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

    const handleEdit = (res) =>{
        setId(res.id)
        setTitle(res.title)
        setBody(res.body)
        setEdit(true)
        setModal(true)
    }

    const handleCloseModal =()=>{
        setId("")
        setTitle("")
        setBody("")
        setEdit(false)
        setModal(false)
    }

    const modalForm = () =>(
        <div className="modalformwrap">
            <h2>{isEdit ? "EDIT":"ADD"} POST</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    required
                    name='title'
                    value={title}
                    variant="outlined"
                    size='small'
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                <TextField
                    onChange={(e)=> setBody(e.target.value)}
                    size='small'
                    label="Body"
                    required
                    name='body'
                    value={body}
                    multiline
                    rows={5}
                    variant="outlined"
                />
                <Button type='submit' variant='contained' color='primary'>SAVE</Button>
            </form>
        </div>
    )
    return (
        <Container maxWidth={"lg"} className="home post">
            { loading ?<Loading /> : null}
            <ModalTemplate onOpen={modal} onClose={handleCloseModal} component={modalForm}/>
            <h1><ArrowLeft onClick={()=> history.goBack()}/> POSTS</h1>

            <Button variant='contained' color='primary' onClick={()=>setModal(true)}>add post</Button>
            <br/>
            <br/>
            <div className="home_table">
                <Table>
                    <Thead>
                        <Tr>
                        <Th>No</Th>
                        <Th>Title</Th>
                        <Th>Body</Th>
                        <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((res,i)=>
                                <Tr key={i}  className={i % 2 === 0? 'hasBg' : null}>
                                    <Td>{i+1}</Td>
                                    <Td>{res.title}</Td>
                                    <Td>{res.body}</Td>
                                    <Td>
                                        <div className="box_action">
                                            {/* <Link to={`/post-detail/${res.id}/${res.title}/${res.body}`}> */}
                                                <Info onClick={()=> history.push(`/post-detail/${res.id}/${res.title}/${res.body}`)}  color='grey'/>
                                            {/* </Link> */}
                                            <Edit onClick={()=>handleEdit(res)} />
                                            <Trash2 onClick={()=>handleDelete(res.id)} />
                                        </div>
                                    </Td>
                                </Tr>
                            )
                        }
                    </Tbody>
                </Table>
            </div>
        </Container>
    );
}

export default Posts;