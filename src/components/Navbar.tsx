import { Link } from 'react-router-dom';
import { Video, Bell, Menu } from 'lucide-react';
import SearchBar from './SearchBar';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <nav className="bg-[#0f0f0f] border-b border-white/10 sticky top-0 z-50 flex justify-between items-center px-6 py-4 w-full" id="navbar">
      {/* Left: Brand logo & Mobile menu toggle */}
      <div className="flex items-center gap-4" id="nav-left">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 hover:bg-white/5 border border-white/10 transition-all rounded-xl flex items-center justify-center text-white/70"
            aria-label="Toggle Sidebar"
            id="sidebar-toggle-btn"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <Link to="/" className="flex items-center gap-3 text-xl font-bold text-white tracking-tight" id="nav-logo">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">CineFocus</span>
        </Link>
      </div>

      {/* Center: SearchBar (hidden on mobile, flex on md) */}
      <div className="flex-1 max-w-xl px-12 hidden md:block" id="nav-center">
        <SearchBar />
      </div>

      {/* Right: Actions & User Avatar */}
      <div className="flex items-center gap-6" id="nav-right">
        <button 
          className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all rounded-xl hidden sm:flex items-center justify-center text-white/70"
          aria-label="Create Video"
          id="nav-create-btn"
        >
          <Video className="w-5 h-5" />
        </button>
        <button 
          className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all rounded-xl flex items-center justify-center relative text-white/70"
          aria-label="Notifications"
          id="nav-notif-btn"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#0f0f0f]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 border border-white/20 shadow-sm" id="nav-avatar">
          <img 
            alt="User avatar" 
            className="w-full h-full object-cover rounded-full opacity-90" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIcr0rerih8PpZdbqdg16tij0Wr1UaqhmzHL236LlpNztglVM12Wo1HJeKQuIJR8k7_r8Hi7-weLeX2UgAX-9lwtN_uvqer_0pTcv7hsIlhOsVKcCSXcSyB54aLZtCEdfQvXUM4jheQ2t0s2nce0_qfl-PxaSlfavuDGBXJm5dlMF6LlONtEJ3cKCXQiJfQrUDIcx7IAtMEIAgN_OL2Pg_-Zf84U4t24v3Y4EHecwTyfbsog6yr3zX7BN8jGvhbbj6fjr7GTta5OUd"
          />
        </div>
      </div>
    </nav>
  );
}
