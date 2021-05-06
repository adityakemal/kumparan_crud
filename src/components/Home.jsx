import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Edit, Info, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


function Home() {
    const [data, setData] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=>{
            console.log(err.response)
        })
    }
    return (
        <Container maxWidth={"lg"} className="home">
            <h1>USER TABLE</h1>
            <div className="home_table">
                <Table>
                    <Thead>
                        <Tr>
                        <Th>Name</Th>
                        <Th>Phone</Th>
                        <Th>Website</Th>
                        <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((res,i)=>
                                <Tr key={i}  className={i % 2 === 0? 'hasBg' : null}>
                                    <Td>{res.name} </Td>
                                    <Td>{res.phone}</Td>
                                    <Td>{res.website}</Td>
                                    <Td>
                                        <div className="box_action">
                                            <Link to={`/posts/${res.id}`}>See posts</Link>
                                            &nbsp;
                                            &nbsp;
                                            <Link to={`/albums/${res.id}`}>See Albums</Link>
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

export default Home;