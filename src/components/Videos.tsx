import { YouTubeVideo } from '../types';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

interface VideosProps {
  videos: YouTubeVideo[];
  loading?: boolean;
}

export default function Videos({ videos, loading }: VideosProps) {
  if (loading) return <Loader />;
  if (!videos?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center w-full" id="no-videos">
        <h3 className="text-lg font-bold text-[#e5e2e1]">No videos found</h3>
        <p className="text-sm text-[#AAAAAA] mt-2 max-w-sm">Try searching for something else or check your connection.</p>
      </div>
    );
  }

  // Safe decoding of html entities
  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Helper to format views
  const formatViews = (views?: string) => {
    if (!views) return '12K views';
    const num = parseInt(views, 10);
    if (isNaN(num)) return views;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K views`;
    return `${num} views`;
  };

  // Extract featured first item
  const featuredVideo = videos[0];
  const featuredId = featuredVideo ? (typeof featuredVideo.id === 'object' ? featuredVideo.id.videoId : featuredVideo.id) : null;
  const isFirstChannel = featuredVideo && (typeof featuredVideo.id === 'object' ? featuredVideo.id.kind === 'youtube#channel' : false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full" id="videos-grid">
      {/* 1. If we have a video and it is not a channel, render the gorgeous Featured Bento Spotlight element */}
      {featuredVideo && !isFirstChannel && featuredId && (
        <div 
          className="col-span-1 md:col-span-2 md:row-span-2 rounded-3xl bg-[#1a1a1a] border border-white/10 overflow-hidden flex flex-col relative group shadow-xl shadow-black/30 min-h-[380px]" 
          id={`featured-card-${featuredId}`}
        >
          {/* Backdrop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-10 pointer-events-none" />
          
          {/* High-quality background image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              alt={featuredVideo.snippet?.title} 
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              src={featuredVideo.snippet?.thumbnails?.high?.url || featuredVideo.snippet?.thumbnails?.medium?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'}
            />
          </div>

          {/* Centralized Play Trigger Button */}
          <Link 
            to={`/video/${featuredId}`} 
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-red-600/90 group-hover:border-red-500/50 transition-all duration-300 shadow-xl group-hover:scale-105">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </Link>

          {/* Content info overlay at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col">
            <span className="bg-red-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-3 w-fit shadow-lg shadow-red-600/30 text-white">
              Featured
            </span>
            <Link to={`/video/${featuredId}`}>
              <h2 className="text-xl md:text-3xl font-bold leading-tight mb-2 text-white group-hover:text-red-400 transition-colors line-clamp-2">
                {decodeHtml(featuredVideo.snippet?.title || '')}
              </h2>
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-[9px] font-bold text-red-400">CF</div>
                <span className="font-semibold text-white/80">{featuredVideo.snippet?.channelTitle}</span>
              </div>
              <span>•</span>
              <span>{formatViews(featuredVideo.statistics?.viewCount)}</span>
              <span>•</span>
              <span>{featuredVideo.snippet?.publishedAt ? new Date(featuredVideo.snippet.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : '2 hours ago'}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Map all other elements (starting from idx 1 if we rendered the featured element, or from idx 0 otherwise) */}
      {videos.map((item, idx) => {
        // Skip first item if it was already rendered as the featured element
        if (idx === 0 && !isFirstChannel) return null;

        const id = item.id;
        const isChannel = typeof id === 'object' ? id.kind === 'youtube#channel' : false;
        const key = (typeof id === 'object' ? id.videoId || id.channelId : id) || `item-${idx}`;

        return (
          <Fragment key={key}>
            {/* Inline Bento Start Stream Banner inserted nicely at idx === 2 (or 3 overall) */}
            {idx === 2 && (
              <div 
                className="col-span-1 md:col-span-2 rounded-2xl bg-gradient-to-r from-red-600/20 via-red-900/10 to-transparent border border-white/10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg shadow-black/20" 
                id="bento-live-banner"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-bold italic tracking-tight text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    Ready to go live?
                  </h4>
                  <p className="text-sm text-white/60">Setup your streaming environment in minutes.</p>
                </div>
                <button className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] cursor-pointer">
                  Start Stream
                </button>
              </div>
            )}

            <div className="w-full h-full" id={`video-grid-item-${key}`}>
              {isChannel ? (
                <ChannelCard channelDetail={item} />
              ) : (
                <VideoCard video={item} />
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
