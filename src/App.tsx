import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import VideoDetail from './components/VideoDetail';
import ChannelDetail from './components/ChannelDetail';
import SearchFeed from './components/SearchFeed';

export default function App() {
  return (
    <Router>
      <div className="bg-[#0F0F0F] text-[#e5e2e1] min-h-screen flex flex-col font-sans" id="app-root">
        {/* Top Navigation */}
        <Navbar />

        {/* Dynamic Route Handler */}
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </div>
    </Router>
  );
}
