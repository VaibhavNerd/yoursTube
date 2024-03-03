import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
    const interval = setInterval(fetchVideos, 60000); // Fetch videos every minute
    return () => clearInterval(interval);
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/videos/fetch-videos');
      const resData = await response.json();
      setVideos(resData.data.videoslist);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleUploadButtonClick = () => {
    navigate('/upload');
  };

  const handleVideoClick = (video) => {
    navigate(`/video/${video._id}`, { state: { video } }); // Pass the video object as state
  };
  

  return (
    <div className="home-page">
      <div className="header">
        <h1>YoursTube</h1>
        <button onClick={handleUploadButtonClick}>Upload Video</button>
      </div>
      <div className="video-list">
        {videos.map(video => (
          <div key={video._id} className="video-item" onClick={() => handleVideoClick(video)}>
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-details">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
