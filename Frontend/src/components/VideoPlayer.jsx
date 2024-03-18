import React from 'react'
import ReactPlayer from 'react-player';

function VideoPlayer({ videoFile }) {
    return (
        <ReactPlayer
            url={videoFile}
            width="100%"
            height="100%"
            controls
            playing
        />
    )
}

export default VideoPlayer
