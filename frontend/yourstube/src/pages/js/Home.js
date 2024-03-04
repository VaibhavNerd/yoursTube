import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../pages/css/Home.css';

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

  const handleLogout = async () => {
    try {
      // await axios.post('http://localhost:8000/api/v1/users/logout');
      // // After successful logout, navigate to the login page or perform any other necessary actions
    
      //  await axios.post('http://localhost:8000/api/v1/users/logout', (req, res) => {
    //     const responseHeaders = {
    //       "Content-Type": "application/json",
    //       "set-cookie": [
    //         `accessToken=''; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`,
    //         `refreshToken=''; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`,
    //       ],
    //     };
        
    //     res.writeHead(204, responseHeaders);
    //     res.end();
    //   },{ withCredentials: true,
    //     headers: {
    //       'Content-Type': 'application/json', // Set the content type header
    //     },
    //     credentials: 'include'});

    const response = await axios.post(
      'http://localhost:8000/api/v1/users/logout',
      {}, // Since it's a POST request, we don't need to send any data
      {
        withCredentials: true, 
        credentials: 'include',// Send cookies with the request
        headers:
         {
            'Content-Type': 'application/json', // Set the content type header
         },
              

      }
    );
      console.log(response);
      navigate('/login');
    } 
    catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>YoursTube</h1>
        <button onClick={handleUploadButtonClick}>Upload Video</button>
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
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
