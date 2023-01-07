import React from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import { Box } from '@mui/material'

//Page
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import VideoDetail from './components/VideoDetail';
import ChannelDetail from './components/ChannelDetail';
import SearchFeed from './components/SearchFeed';

const App = () => (
  <Router>
    <Box style={{background:'linear-gradient(0deg, rgba(69,69,69,1) 0%, rgba(29,42,42,1) 49%, rgba(0,0,0,1) 100%)'}}>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Feed />} />
        <Route path='/video/:id' element={<VideoDetail />} /> 
        <Route path='/channel/:id' element={<ChannelDetail />} /> 
        <Route path='/search/:searchTerm' element={<SearchFeed />} /> 
      </Routes>
    </Box>
  </Router>
)

export default App