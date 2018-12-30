import React from 'react'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';


const ImageBox = (props) => {
    const {images , handleOpen } = props;

    return (
        <div>
            <GridList cols={3}>
                {
                    images.map(img => (
                        <GridTile
                            title={img.tags}
                            key={img.id}
                            subtitle={
                                <span>
                                    by <strong>{img.user}</strong>
                                </span>
                            }
                            actionIcon={
                                <IconButton onClick={() => handleOpen(img.largeImageURL)}>
                                    <ZoomIn color="white"/>
                                </IconButton>
                            }
                        >
                            <img src={img.largeImageURL} alt=""/>
                        </GridTile>
                    ))
                }
            </GridList>
        </div>
    )
}

export default ImageBox