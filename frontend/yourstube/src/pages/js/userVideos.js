import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../pages/css/UserVideos.css';


const UserVideos = () => {
    // State to store user videos
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetchUserVideos();
        const interval = setInterval(fetchUserVideos, 60000); // Fetch videos every minute
        return () => clearInterval(interval);
      }, []);
   
      // Fetch user videos from the server
      const fetchUserVideos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/videos/fetch-myvideos', {
                withCredentials: true,
            });
            const resData = await response.data;
            console.log("hello", response);
            setVideos(resData.data.videoslist);
        } catch (error) {
            console.error('Error fetching user videos:', error);
        }
    };
    
  
     
    
  
      return (
        <div className="home-page">
          <div className="header">
            <h1>My Videos</h1>
           
          </div>
          <div className="video-list">
            {videos.map(video => (
              <div key={video._id} className="video-item" >
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-details">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className="owner-info">
                    <div className="avatar-container">
                      <img src={video.owner.avatar} alt={`${video.owner.username}'s avatar`} />
                    </div>
                    <p>{video.owner.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default UserVideos;