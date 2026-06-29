import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-center w-full max-w-lg"
      id="search-bar-form"
    >
      <input
        type="text"
        className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-5 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-600/50 focus:ring-0 transition-all duration-200"
        placeholder="Search creators, videos, topics..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search-input"
      />
      <button 
        type="submit" 
        className="absolute right-3 p-1.5 hover:bg-white/10 text-white/40 hover:text-white/80 rounded-full transition-colors flex items-center justify-center cursor-pointer"
        id="search-submit-btn"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
