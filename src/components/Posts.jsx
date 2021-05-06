import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Info, Trash2 } from 'react-feather';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Link } from "react-router-dom";

function Posts(props) {
    console.log(props)
    const [data, setData] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res=>{
            setData(res.data.filter(val=> val.userId === parseInt(props.match.params.userId)))
        }).catch(err=>{
            console.log(err.response)
        })
    }
    return (
        <Container maxWidth={"lg"} className="home">
            <h1><ArrowLeft/> POSTS</h1>
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
                                            <Link to={`/post-detail/${res.id}`}>
                                                <Info  color='grey'/>
                                            </Link>
                                            <Edit onClick={()=>this.props.history.push(`/menu/form/${res.menuUuid}`)} />
                                            <Trash2 onClick={()=>this.handleDelete(res.name, res.id)} />
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