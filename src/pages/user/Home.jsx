import { Button, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import API from '../../api';


function Home() {
    const [data, setData] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        API.getUsers().then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=>{
            console.log(err.response)
        })
    }
    console.log(process.env.REACT_APP_BASE_URL)
    console.log(data)
    return (
        <Container maxWidth={"lg"} className="home">
            <h1>USERS</h1>
            <div className="home_table">
                <Table>
                    <Thead>
                        <Tr>
                        <Th>No</Th>
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
                                    <Td>{i+1} </Td>
                                    <Td>{res.name} </Td>
                                    <Td>{res.phone}</Td>
                                    <Td> <a href={`https://${res.website}`} target='_blank'>{res.website}</a> </Td>
                                    <Td>
                                        <div className="box_action">
                                            <Link to={`/posts/${res.id}`}>
                                                <Button size='small' variant='contained' color='primary'>
                                                Posts
                                                </Button>
                                            </Link>

                                            <Link to={`/albums/${res.id}`}>
                                                <Button size='small' variant='contained' color='secondary'>
                                                    Albums
                                                </Button>
                                            </Link>
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