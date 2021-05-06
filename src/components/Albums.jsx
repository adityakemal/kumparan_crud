import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function Albums(props) {
    console.log(props)
    const [data, setData] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        axios.get('https://jsonplaceholder.typicode.com/albums').then(res=>{
            console.log(res.data.filter(val=> val.userId === 1))
            setData(res.data.filter(val=> val.userId === parseInt(props.match.params.userId)))
        }).catch(err=>{
            console.log(err.response)
        })
    }
    return (
        <Container maxWidth={"lg"} className="home">
            <h1><ArrowLeft/> ALBUMS</h1>
            <div className="home_table">
                <Table>
                    <Thead>
                        <Tr>
                        <Th>No</Th>
                        <Th>Title</Th>
                        <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((res,i)=>
                                <Tr key={i}  className={i % 2 === 0? 'hasBg' : null}>
                                    <Td>{i+1}</Td>
                                    <Td>{res.title}</Td>
                                    <Td>
                                        <div className="box_action">
                                            <Link to={`/photos/${res.id}`}>See Photos</Link>
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

export default Albums;