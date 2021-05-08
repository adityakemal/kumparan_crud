import { Button, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import API from '../../api';

function Albums(props) {
    const history = useHistory()

    const userId = props.match.params.userId

    const [data, setData] = useState([])
    useEffect(()=>{
        API.getAlbums(userId).then(res=>{
            setData(res.data)
        }).catch(err=>{
            console.log(err.response)
        })
    },[userId])


    return (
        <Container maxWidth={"lg"} className="home">
            <h1><ArrowLeft onClick={()=> history.goBack()}/> ALBUMS</h1>
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
                                            <Link to={`/photos/${res.id}`}>
                                                <Button variant='contained'>See photos</Button>
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

export default Albums;