import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { YouTubeVideo } from '../types';

interface VideoCardProps {
  video: YouTubeVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const { id, snippet } = video;
  
  // Extract video ID safely (can be in id.videoId or id itself if from other listings)
  const videoId = typeof id === 'object' ? id.videoId : id;
  const channelId = snippet?.channelId;

  const title = snippet?.title || 'No Title';
  const channelTitle = snippet?.channelTitle || 'Unknown Channel';
  const thumbnailUrl = snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';
  
  // Helper to format large numbers for views
  const formatViews = (views?: string) => {
    if (!views) return '12K views'; // elegant default
    const num = parseInt(views, 10);
    if (isNaN(num)) return views;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K views`;
    return `${num} views`;
  };

  // Safe decoding of html entities occasionally returned by YouTube API
  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const formattedViews = formatViews(video.statistics?.viewCount);
  const formattedDate = snippet?.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : '3 days ago';

  return (
    <article 
      className="rounded-2xl bg-[#1a1a1a] border border-white/5 p-4 flex flex-col gap-3 group hover:border-white/15 hover:bg-[#222222]/80 transition-all duration-300 h-full shadow-lg shadow-black/25"
      id={`video-card-${videoId}`}
    >
      {/* Thumbnail */}
      <Link to={videoId ? `/video/${videoId}` : '#'} className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800 border border-white/10 block shrink-0">
        <img 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          src={thumbnailUrl}
        />
        {/* Timestamp */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-2 py-[2px] rounded">
          {video.contentDetails?.duration ? video.contentDetails.duration.replace('PT', '').replace('M', ':').replace('S', '') : '14:20'}
        </div>
      </Link>

      {/* Details info */}
      <div className="flex flex-col flex-1 gap-2" id="video-card-meta">
        <Link to={videoId ? `/video/${videoId}` : '#'}>
          <h3 className="text-sm font-semibold text-white/90 line-clamp-2 leading-snug group-hover:text-red-500 transition-colors" title={title}>
            {decodeHtml(title)}
          </h3>
        </Link>

        {/* Channel and view count stats in Bento style */}
        <div className="flex items-center justify-between text-[11px] text-white/40 mt-auto pt-1">
          <Link to={channelId ? `/channel/${channelId}` : '#'} className="hover:text-white/80 transition-colors flex items-center gap-1 font-bold uppercase tracking-wider">
            <span>{channelTitle}</span>
            <CheckCircle2 className="w-3 h-3 text-red-500 fill-red-500/20" />
          </Link>
          <div className="flex gap-2 shrink-0">
            <span>{formattedViews}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
