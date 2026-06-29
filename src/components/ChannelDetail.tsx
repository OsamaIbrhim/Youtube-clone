import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';
import Sidebar from './Sidebar';
import { YouTubeVideo } from '../types';

export default function ChannelDetail() {
  const { id } = useParams<{ id: string }>();
  const [channelDetail, setChannelDetail] = useState<any | null>(null);
  const [channelVideos, setChannelVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Fetch Channel info
    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
      .then((data) => {
        if (data?.items?.length) {
          setChannelDetail(data.items[0]);
        }
      })
      .catch((err) => console.error('Error fetching channel details:', err));

    // Fetch Channel uploads
    fetchFromAPI(`search?channelId=${id}&part=snippet,id&order=date`)
      .then((data) => {
        if (data?.items) {
          setChannelVideos(data.items);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching channel uploads:', err);
        // Exquisite mock fallbacks for Neon Horizon or any other channel
        const mockChannelVideos: YouTubeVideo[] = [
          {
            id: 'chan-video-1',
            snippet: {
              title: 'The Art of Framing: Cinematic Composition Analyzed',
              channelTitle: 'Neon Horizon',
              channelId: id,
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '124000' }
          },
          {
            id: 'chan-video-2',
            snippet: {
              title: 'Mastering Lighting in Low Budget Environments',
              channelTitle: 'Neon Horizon',
              channelId: id,
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '89000' }
          },
          {
            id: 'chan-video-3',
            snippet: {
              title: 'Why 35mm Still Matters in the Digital Age',
              channelTitle: 'Neon Horizon',
              channelId: id,
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '210000' }
          },
          {
            id: 'chan-video-4',
            snippet: {
              title: 'Sound Design Secrets: Building Atmosphere',
              channelTitle: 'Neon Horizon',
              channelId: id,
              thumbnails: {
                high: { url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80' }
              },
              publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '56000' }
          }
        ];
        setChannelVideos(mockChannelVideos);
        setLoading(false);
      });
  }, [id]);

  // Fallback defaults
  const currentChannel = channelDetail || {
    snippet: {
      title: 'Neon Horizon',
      description: 'Exploring the intersection of cinematic storytelling and modern visual art. Weekly deep-dives into film analysis, cinematography techniques, and visual essays.',
      thumbnails: {
        high: { url: 'https://api.dicebear.com/7.x/identicon/svg?seed=neonhorizon' }
      }
    },
    statistics: {
      subscriberCount: '1200000',
      videoCount: '342'
    },
    brandingSettings: {
      image: {
        bannerExternalUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=80'
      }
    }
  };

  const { snippet, statistics, brandingSettings } = currentChannel;
  const bannerUrl = brandingSettings?.image?.bannerExternalUrl || 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=80';
  const avatarUrl = snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url || 'https://api.dicebear.com/7.x/identicon/svg?seed=cinefocus';

  const formatNumber = (numStr?: string) => {
    if (!numStr) return '';
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return numStr;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]" id="channel-detail-container">
      {/* Sidebar - fully controlled state */}
      <Sidebar isOpen={true} />

      {/* Main Channel Scroll view */}
      <main className="flex-grow flex flex-col h-full overflow-y-auto bg-[#0F0F0F]" id="channel-detail-main">
        
        {/* Banner Section */}
        <div className="w-full h-48 md:h-64 relative bg-[#212121] overflow-hidden flex-shrink-0" id="channel-banner">
          <img 
            alt="Channel banner" 
            className="w-full h-full object-cover opacity-60"
            src={bannerUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
        </div>

        {/* Channel Details layout */}
        <div className="max-w-[1280px] w-full mx-auto px-6 relative pb-6" id="channel-info-area">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 relative z-10" id="channel-header-row">
            {/* Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0F0F0F] bg-[#212121] overflow-hidden shadow-2xl shrink-0">
              <img 
                alt="Channel avatar" 
                className="w-full h-full object-cover" 
                src={avatarUrl}
              />
            </div>

            {/* Title / Description */}
            <div className="flex-1 text-center md:text-left mb-2" id="channel-title-meta">
              <h1 className="text-2xl md:text-4xl font-bold text-[#e5e2e1] flex items-center justify-center md:justify-start gap-2 tracking-tight">
                {snippet?.title}
                <CheckCircle2 className="w-6 h-6 text-[#ffb4a7] fill-[#ffb4a7]/20 shrink-0" />
              </h1>

              <div className="mt-1.5 text-xs text-[#AAAAAA] flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 justify-center md:justify-start">
                <span>@{snippet?.title?.replace(/\s+/g, '').toLowerCase() || 'channel'}</span>
                <span className="hidden sm:inline">•</span>
                <span>{formatNumber(statistics?.subscriberCount)} subscribers</span>
                <span className="hidden sm:inline">•</span>
                <span>{statistics?.videoCount || '342'} videos</span>
              </div>

              <p className="mt-3 text-sm text-[#AAAAAA] max-w-2xl line-clamp-2 leading-relaxed">
                {snippet?.description}
              </p>
            </div>

            {/* Subscribe toggle action */}
            <div className="flex items-center gap-3 mb-2 shrink-0" id="channel-subscribe-action">
              <button 
                onClick={() => setSubscribed(!subscribed)}
                className={`px-6 py-2.5 text-xs font-semibold rounded-full tracking-wide transition-all duration-200 cursor-pointer
                  ${subscribed 
                    ? 'bg-[#353534] text-[#e5e2e1] hover:bg-[#454747]' 
                    : 'bg-[#F1F1F1] text-[#0F0F0F] hover:bg-white font-bold'
                  }
                `}
                id="channel-sub-btn"
              >
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 border-b border-[#353534]/30 flex overflow-x-auto scrollbar-none" id="channel-tabs">
            {['Home', 'Videos', 'Shorts', 'Playlists', 'Community'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 cursor-pointer
                  ${activeTab === tab 
                    ? 'text-[#e5e2e1] border-[#ffb4a7]' 
                    : 'text-[#AAAAAA] border-transparent hover:text-[#e5e2e1]'
                  }
                `}
                id={`tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Uploads grid under selected tab */}
          <div className="py-6" id="channel-videos-grid">
            <h2 className="text-lg font-bold text-[#e5e2e1] mb-4">Latest Uploads</h2>
            <Videos videos={channelVideos} loading={loading} />
          </div>
        </div>

      </main>
    </div>
  );
}
