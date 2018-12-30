import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ImageBox from './ImageBox';


class ImageResults extends Component {

    state = {
        open: false,
        currImg: '',
        images: []
    }

    componentWillReceiveProps({images}) {
        this.setState({
            images
        })
    }

    handleOpen = (img)=> {
        this.setState({
            open: true,
            currImg: img
        })
    }

    handleClose = ()=> {
        this.setState({
            open: false
        })
    }

    render () {

        const actions = [
            <FlatButton 
                label="close"
                primary={true}
                onClick={this.handleClose}
                />
        ]
        
        return (
            <div>
                {
                    this.state.images.length > 0 ? <ImageBox images={this.state.images} handleOpen={this.handleOpen}/> : null
                }
                <Dialog 
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                <img src={this.state.currImg} alt="" style={{ width: '100%' }}/>
                </Dialog>
            </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults