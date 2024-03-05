import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VideoUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    videoFile: null,
    thumbnail: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post('http://localhost:8000/api/v1/videos/upload-video', formDataToSend,
      {
        withCredentials: true,
        credentials: 'include'
  });

      console.log('Video uploaded successfully');
      navigate("/home")
      // Redirect or display success message
    } catch (error) {
      console.error('Video upload error:', error);
      // Display error message
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Duration:</label>
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
        </div>
        <div>
          <label>Video File:</label>
          <input type="file" name="videoFile" onChange={handleFileChange} />
        </div>
        <div>
          <label>Thumbnail:</label>
          <input type="file" name="thumbnail" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default VideoUpload;
