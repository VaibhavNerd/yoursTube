import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos(); 
    const interval = setInterval(fetchVideos, 60000); // Fetch videos every minute
    return () => clearInterval(interval);// Fetch videos when the component mounts
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/videos/fetch-videos');
      const resData = await response.json();
      setVideos(resData.data.videoslist); // Update state with fetched videos
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleUploadButtonClick = () => {
    navigate('/upload');
  };

  return (
    <div className="home-page">
      <div className="floating-button" onClick={handleUploadButtonClick}>
        +
      </div>
      <div className="video-list">
        {videos && videos.map(video => (
          <div key={video._id} className="video-item">
            <Link to={`/video/${video._id}`}>
              <img src={video.thumbnail} alt={video.title} />
            </Link>
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
