import { Home, Play, Users, FolderHeart, History, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
  isOpen?: boolean;
}

export default function Sidebar({ selectedCategory, setSelectedCategory, isOpen = true }: SidebarProps) {
  // Sidebar items definition
  const mainNavItems = [
    { name: 'Home', icon: Home, category: 'All' },
    { name: 'Shorts', icon: Play, category: 'Shorts' },
    { name: 'Subscriptions', icon: Users, category: 'Subscriptions' },
  ];

  const libraryNavItems = [
    { name: 'Library', icon: FolderHeart, category: 'Library' },
    { name: 'History', icon: History, category: 'History' },
  ];

  const bottomNavItems = [
    { name: 'Settings', icon: Settings },
    { name: 'Help', icon: HelpCircle },
  ];

  const handleItemClick = (item: { name: string; category?: string }) => {
    if (setSelectedCategory && item.category) {
      setSelectedCategory(item.category);
    }
  };

  return (
    <aside 
      className={`bg-[#0f0f0f] text-white flex flex-col border-r border-white/10 h-full overflow-y-auto shrink-0 z-40 transition-all duration-300 p-4 gap-1
        ${isOpen ? 'w-64' : 'w-0 md:w-16 md:overflow-x-hidden md:p-2'}
      `} 
      id="sidebar"
    >
      <div className="flex-1 flex flex-col gap-1" id="sidebar-content">
        {/* Main Section */}
        <div className="space-y-1" id="sidebar-main-section">
          {mainNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = selectedCategory === item.category;
            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-colors duration-200 text-left text-sm font-medium cursor-pointer group
                  ${isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }
                `}
                id={`sidebar-item-${item.name.toLowerCase()}`}
              >
                {isActive ? (
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                ) : (
                  <IconComponent className="w-4 h-4 shrink-0 text-white/50 group-hover:text-white" />
                )}
                {isOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </div>

        <div className="my-4 border-t border-white/5" />

        {/* Library Section */}
        <div className="space-y-1" id="sidebar-library-section">
          {isOpen && <div className="px-4 py-1 text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Library</div>}
          {libraryNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = selectedCategory === item.category;
            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-colors duration-200 text-left text-sm font-medium cursor-pointer group
                  ${isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }
                `}
                id={`sidebar-item-${item.name.toLowerCase()}`}
              >
                {isActive ? (
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                ) : (
                  <IconComponent className="w-4 h-4 shrink-0 text-white/50 group-hover:text-white" />
                )}
                {isOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upgrade / Premium Card in Sidebar (exactly from layout) */}
      {isOpen && (
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center my-4" id="sidebar-premium-card">
          <p className="text-xs text-white/40 mb-2 font-medium">Premium Access</p>
          <button className="w-full py-2.5 bg-white hover:bg-white/95 text-black text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-lg shadow-white/5">
            Upgrade Now
          </button>
        </div>
      )}

      {/* Footer Section */}
      <div className="border-t border-white/5 pt-4 space-y-1" id="sidebar-footer-section">
        {bottomNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.name}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors duration-200 text-left text-sm font-medium cursor-pointer group"
              id={`sidebar-item-${item.name.toLowerCase()}`}
            >
              <IconComponent className="w-4 h-4 shrink-0 text-white/50 group-hover:text-white" />
              {isOpen && <span>{item.name}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
