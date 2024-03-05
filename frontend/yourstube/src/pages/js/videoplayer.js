import React from 'react';
import { useLocation } from 'react-router-dom';

const VideoPlayer = () => {
  const location = useLocation();
  const video = location.state.video; // Access the video object from location state

  return (
    <div className="video-player">
      <video controls>
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
