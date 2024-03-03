// // Home.js
// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const navigate = useNavigate();
// //   const accessToken = document.cookie
// //   .split('; ')
// //   .find(row => row.startsWith('accessToken='))
// //   ?.split('=')[1];

//   const handleLogout = async () => {
//     try {
//       // Make API call to trigger logout
//       await axios.post('http://localhost:8000/api/v1/users/logout',
//     //   {
//     //     withCredentials: true, // Include cookies for authentication
//     //     headers: {
//     //       Authorization: `Bearer ${accessToken}` // Example: JWT token
//     //     }
//     //   }
//       );

//       // Redirect to login page
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Handle logout error
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Welcome to the Home Page</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video thumbnails and titles from backend API
    axios.get('')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Link to="/upload">Upload Video</Link> {/* Link to the upload video page */}

      {/* Display video thumbnails and titles */}
      {videos.map(video => (
        <div key={video._id}>
          <img src={video.thumbnail} alt={video.title} />
          <h2>{video.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Home;
