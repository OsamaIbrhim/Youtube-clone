import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { YouTubeVideo } from '../types';

interface ChannelCardProps {
  channelDetail: YouTubeVideo;
  marginTop?: string;
}

export default function ChannelCard({ channelDetail, marginTop }: ChannelCardProps) {
  const channelId = typeof channelDetail.id === 'object' ? channelDetail.id.channelId : channelDetail.id;
  const snippet = channelDetail?.snippet;
  
  const title = snippet?.title || 'Unknown Channel';
  const description = snippet?.description || 'Exploring the intersection of cinematic storytelling and modern visual art.';
  const thumbnailUrl = snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';

  // Helper to format subscribers
  const formatSubscribers = (subs?: string) => {
    if (!subs) return '1.2M subscribers';
    const num = parseInt(subs, 10);
    if (isNaN(num)) return subs;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M subscribers`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K subscribers`;
    return `${num} subscribers`;
  };

  return (
    <div 
      className={`flex flex-col justify-center items-center text-center w-full h-full p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-white/15 hover:bg-[#222222]/80 transition-all duration-300 shadow-lg shadow-black/25 ${marginTop}`}
      id={`channel-card-${channelId}`}
    >
      <Link to={channelId ? `/channel/${channelId}` : '#'} className="flex flex-col items-center">
        {/* Large Channel Avatar */}
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl mb-4 transform hover:scale-105 transition-all duration-300">
          <img 
            alt={title} 
            className="w-full h-full object-cover" 
            src={thumbnailUrl}
          />
        </div>

        {/* Channel Details */}
        <div className="flex flex-col items-center">
          <h2 className="text-base font-bold text-white flex items-center gap-1.5 hover:text-red-500 transition-colors">
            {title}
            <CheckCircle2 className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
          </h2>
          
          <div className="text-[11px] text-white/40 mt-1 flex items-center gap-1.5 uppercase font-bold tracking-wider">
            <span>@{title.replace(/\s+/g, '').toLowerCase()}</span>
            <span>•</span>
            <span>{formatSubscribers(channelDetail?.statistics?.subscriberCount)}</span>
          </div>

          <p className="text-xs text-white/50 mt-3 max-w-xs line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
