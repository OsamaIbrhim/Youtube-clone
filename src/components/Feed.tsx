import { useState, useEffect } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';
import Sidebar from './Sidebar';
import { YouTubeVideo } from '../types';

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'All', query: 'Cinematic premium film' },
    { name: 'Cinematography', query: 'cinematography techniques' },
    { name: 'Short Films', query: 'award winning short films' },
    { name: 'Documentaries', query: 'high end documentary film' },
    { name: '4K HDR', query: '4k hdr nature' },
    { name: 'Ambient', query: 'cinematic ambient soundscape' },
  ];

  useEffect(() => {
    setLoading(true);
    const activeCategory = categories.find(cat => cat.name === selectedCategory) || categories[0];
    
    // Fetch videos for the selected category from the RapidAPI YouTube endpoint
    fetchFromAPI(`search?part=snippet&q=${encodeURIComponent(activeCategory.query)}`)
      .then((data) => {
        if (data?.items) {
          setVideos(data.items);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching search results:', err);
        // Fallback mock data matching our beautiful design layout in case API key is not supplied or throttled
        const fallbackItems: YouTubeVideo[] = [
          {
            id: 'video-fallback-1',
            snippet: {
              title: 'The Art of Framing: Cinematic Composition Analyzed',
              description: 'Exploring composition layers...',
              channelTitle: 'Neon Horizon',
              channelId: 'channel-fallback-neon',
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '124000' }
          },
          {
            id: 'video-fallback-2',
            snippet: {
              title: 'Mastering Lighting in Low Budget Environments',
              description: 'Cinematic lighting setups on a budget...',
              channelTitle: 'Neon Horizon',
              channelId: 'channel-fallback-neon',
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '89000' }
          },
          {
            id: 'video-fallback-3',
            snippet: {
              title: 'Why 35mm Still Matters in the Digital Age',
              description: 'Analogue film preservation...',
              channelTitle: 'Nexus Studios',
              channelId: 'channel-fallback-nexus',
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '210000' }
          },
          {
            id: 'video-fallback-4',
            snippet: {
              title: 'Sound Design Secrets: Building Atmosphere',
              description: 'Creating tension with sub bass...',
              channelTitle: 'Nexus Studios',
              channelId: 'channel-fallback-nexus',
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '56000' }
          }
        ];
        setVideos(fallbackItems);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]" id="feed-container">
      {/* Sidebar - fully controlled state */}
      <Sidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        isOpen={true}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col h-full overflow-y-auto bg-[#0f0f0f]" id="feed-main">
        {/* Category Chips bar */}
        <div className="w-full bg-[#0f0f0f] py-3.5 px-6 border-b border-white/10 flex gap-2.5 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0" id="category-chips-bar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer border
                ${selectedCategory === cat.name
                  ? 'bg-white text-black border-white font-bold scale-[1.03] shadow-md shadow-white/5'
                  : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white'
                }
              `}
              id={`chip-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Scrollable Feed Listing */}
        <div className="flex-1 p-6" id="feed-listing">
          <div className="mb-6 flex justify-between items-center" id="feed-header">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Latest {selectedCategory === 'All' ? 'Uploads' : selectedCategory}
            </h1>
          </div>

          <Videos videos={videos} loading={loading} />
        </div>
      </main>
    </div>
  );
}
