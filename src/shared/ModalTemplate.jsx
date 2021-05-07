import React, { Component } from 'react';

import {Modal, Backdrop, Fade} from '@material-ui/core';

class ModalTemplate extends Component {
    render() {
        const middle={ display: 'flex', alignItems: 'center', justifyContent: 'center'}
        return (
            <div>
                <Modal
                    className={middle}
                    style={middle}
                    open={this.props.onOpen}
                    onClose={this.props.onClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.props.onOpen} className='modal_remove_outline'>
                        <div>
                            {this.props.component()}
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default ModalTemplate;