import logo from './logo.svg';
import './App.css';

import Reg from './Reg';
import Login from './Login';
import Home from './Home'; 
import VideoUpload from './uploadVideo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import VideoPlayer from './videoplayer';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/video/:id" element={<VideoPlayer />} /> {/* Define the route for the video player */}
          <Route path="/" element={<Reg />} /> {/* Set the default route to Reg */}
          {/* Add other routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
