import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, CheckCircle2 } from 'lucide-react';

const PlayerComponent = ReactPlayer as any;
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Loader from './Loader';
import { YouTubeVideo } from '../types';

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [videoDetail, setVideoDetail] = useState<YouTubeVideo | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    
    // Fetch individual video details
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        if (data?.items?.length) {
          setVideoDetail(data.items[0]);
        }
      })
      .catch((err) => console.error('Error fetching video details:', err));

    // Fetch related videos
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        if (data?.items) {
          setRelatedVideos(data.items);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching related videos:', err);
        // Exquisite mock fallbacks when API keys are not supplied
        const mockRelated: YouTubeVideo[] = [
          {
            id: 'related-mock-1',
            snippet: {
              title: 'Designing the Void: Minimalist Sets in Cinema',
              channelTitle: 'Cinematic Vision',
              channelId: 'channel-fallback-vision',
              thumbnails: {
                medium: { url: 'https://images.unsplash.com/photo-1512218119573-1b3097f27aba?auto=format&fit=crop&w=300&q=80' }
              },
              publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '450000' }
          },
          {
            id: 'related-mock-2',
            snippet: {
              title: 'Color Theory in Dark Themes: A Masterclass',
              channelTitle: 'Design Weekly',
              channelId: 'channel-fallback-design',
              thumbnails: {
                medium: { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=300&q=80' }
              },
              publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '1100000' }
          },
          {
            id: 'related-mock-3',
            snippet: {
              title: 'The Gear Behind the Look: Arri Alexa LF Breakdown',
              channelTitle: 'Tech Focus',
              channelId: 'channel-fallback-tech',
              thumbnails: {
                medium: { url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80' }
              },
              publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '89000' }
          },
          {
            id: 'related-mock-4',
            snippet: {
              title: 'Ambient Journeys: Deep Space Soundscapes',
              channelTitle: 'Audio Realms',
              channelId: 'channel-fallback-audio',
              thumbnails: {
                medium: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80' }
              },
              publishedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
            },
            statistics: { viewCount: '2000000' }
          }
        ];
        setRelatedVideos(mockRelated);
        setLoading(false);
      });
  }, [id]);

  // Use elegant fallback detail structure if loading fails to locate details
  const currentVideo = videoDetail || {
    snippet: {
      title: 'The Architecture of Infinite Space: A Visual Journey',
      channelTitle: 'Nexus Studios',
      channelId: 'channel-fallback-nexus',
      description: 'Dive deep into the aesthetic principles that define modern minimalist architecture in science fiction. We explore how light, shadow, and void create emotional resonance in spaces that don\'t exist. This documentary covers the approach to building infinite scale.',
      publishedAt: '2023-10-12T00:00:00Z'
    },
    statistics: {
      viewCount: '1452039',
      likeCount: '124000'
    }
  };

  const { snippet, statistics } = currentVideo;
  const channelId = snippet?.channelId;

  // Formatting helpers
  const formatNumber = (numStr?: string, suffix = '') => {
    if (!numStr) return '';
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return numStr;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M${suffix}`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K${suffix}`;
    return num.toString();
  };

  if (loading && !videoDetail) return <Loader />;

  return (
    <div className="bg-[#0f0f0f] text-white min-h-[calc(100vh-64px)] overflow-y-auto px-4 md:px-10 py-6" id="video-detail-container">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8" id="video-detail-grid">
        
        {/* Left Column: Player & Detailed Metadata */}
        <div className="lg:col-span-8 flex flex-col gap-4" id="video-player-column">
          {/* React Player Container */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0e0e0e] shadow-2xl border border-white/10" id="player-wrapper">
            <PlayerComponent
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player absolute top-0 left-0"
              width="100%"
              height="100%"
              controls
              playing
            />
          </div>

          {/* Title and stats bar */}
          <div className="mt-2" id="video-metadata">
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white leading-snug">
              {snippet?.title}
            </h1>

            {/* Actions & Channels Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/10" id="video-actions-row">
              {/* Channel Box */}
              <div className="flex items-center gap-4" id="channel-box">
                <Link to={channelId ? `/channel/${channelId}` : '#'} className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 bg-[#1a1a1a]">
                  <img 
                    alt="Channel logo" 
                    className="w-full h-full object-cover" 
                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${channelId || 'nexus'}`}
                  />
                </Link>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Link to={channelId ? `/channel/${channelId}` : '#'} className="text-sm font-bold text-white hover:text-red-500 truncate">
                      {snippet?.channelTitle}
                    </Link>
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 fill-red-500/20 shrink-0" />
                  </div>
                  <span className="text-xs text-white/40">1.2M subscribers</span>
                </div>
                {/* Subscribe Action */}
                <button 
                  onClick={() => setSubscribed(!subscribed)}
                  className={`ml-4 px-6 py-2.5 text-xs font-semibold rounded-xl tracking-wide transition-all duration-200 cursor-pointer border
                    ${subscribed 
                      ? 'bg-white/10 text-white border-white/10 hover:bg-white/15' 
                      : 'bg-white text-black border-white hover:bg-white/95 font-bold'
                    }
                  `}
                  id="sub-btn"
                >
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>

              {/* Utility Action Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none" id="action-buttons">
                {/* Like / Dislike pills */}
                <div className="flex items-center bg-white/5 rounded-xl border border-white/5 shrink-0">
                  <button 
                    onClick={() => setLiked(!liked)}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 rounded-l-xl transition-all duration-200 border-r border-white/5 cursor-pointer"
                    id="like-btn"
                  >
                    <ThumbsUp className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500/20' : 'text-white'}`} />
                    <span className="text-xs font-medium text-white">{formatNumber(statistics?.likeCount, ' Likes')}</span>
                  </button>
                  <button className="flex items-center px-4 py-2.5 hover:bg-white/10 rounded-r-xl transition-all duration-200 cursor-pointer" id="dislike-btn">
                    <ThumbsDown className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Share pill */}
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-200 shrink-0 cursor-pointer" id="share-btn">
                  <Share2 className="w-4 h-4 text-white" />
                  <span className="text-xs font-medium text-white">Share</span>
                </button>

                {/* Download pill */}
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-200 shrink-0 hidden md:flex cursor-pointer" id="download-btn">
                  <Download className="w-4 h-4 text-white" />
                  <span className="text-xs font-medium text-white">Download</span>
                </button>

                {/* Extra Menu Pill */}
                <button className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-200 shrink-0 cursor-pointer" id="more-actions-btn">
                  <MoreHorizontal className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Detailed Description Box with accordion */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 mt-4 border border-white/5 hover:border-white/10 transition-all duration-300" id="description-box">
              <div className="flex items-center gap-4 text-xs font-bold text-white mb-3" id="description-metrics">
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-white/80">{formatNumber(statistics?.viewCount, ' views')}</span>
                <span>Premiered {snippet?.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Oct 12, 2023'}</span>
                <span className="text-red-500">#Cinema #Minimalism #Aesthetic</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">
                {snippet?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Up Next / Related Videos */}
        <div className="lg:col-span-4 flex flex-col gap-4" id="related-videos-column">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Up Next</h2>
          
          <div className="flex flex-col gap-3" id="related-videos-list">
            {relatedVideos.map((item, idx) => {
              const relVideoId = typeof item.id === 'object' ? item.id.videoId : item.id;
              const relSnippet = item.snippet;
              if (!relVideoId) return null;

              return (
                <Link 
                  to={`/video/${relVideoId}`} 
                  key={relVideoId || idx}
                  className="flex gap-3 group p-3 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:bg-[#222222]/80 hover:border-white/10 transition-all duration-300 shadow-md"
                  id={`related-card-${relVideoId}`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-32 min-w-[128px] aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-gray-800 border border-white/5">
                    <img 
                      alt={relSnippet?.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={relSnippet?.thumbnails?.medium?.url || relSnippet?.thumbnails?.high?.url}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-[2px] rounded text-[10px] font-medium text-white">
                      {idx % 2 === 0 ? '14:20' : '08:45'}
                    </div>
                  </div>

                  {/* Detail */}
                  <div className="flex flex-col justify-center min-w-0 py-0.5">
                    <h3 className="text-xs font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-red-500 transition-colors" title={relSnippet?.title}>
                      {relSnippet?.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mt-1.5 flex items-center gap-1 truncate">
                      {relSnippet?.channelTitle}
                      <CheckCircle2 className="w-3 h-3 text-red-500 fill-red-500/20 shrink-0" />
                    </span>
                    <span className="text-[10px] text-white/30 mt-0.5">
                      {formatNumber(item.statistics?.viewCount, ' views')}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
