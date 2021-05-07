import { CircularProgress } from '@material-ui/core';
import React from 'react';

function Loading() {
    return (
        <div className='loading'>
            <CircularProgress />&nbsp; Loading...
        </div>
    );
}

export default Loading;