import { Plus, LogOut, Trash2, X, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { User, Conversation } from '../App';

interface SidebarProps {
  user: User;
  conversations: Conversation[];
  activeConversationId?: string;
  onLogout: () => void;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Sidebar({
  user,
  conversations,
  activeConversationId,
  onLogout,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  isOpen,
  theme,
  onToggleTheme
}: SidebarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1A1D21' : '#FFFFFF';
  const borderColor = isDark ? '#2D3139' : '#E9ECEF';
  const textPrimary = isDark ? '#E9ECEF' : '#212529';
  const textSecondary = isDark ? '#9CA3AF' : '#6C757D';
  const hoverBg = isDark ? '#2D3139' : '#F8F9FA';
  const activeBg = isDark ? '#1E3A5F' : '#E7F3FF';

  return (
    <div
      className={`flex-shrink-0 flex flex-col border-r transition-all duration-300 ${
        isOpen ? 'w-60' : 'w-0'
      } overflow-hidden`}
      style={{ borderColor, backgroundColor: bgColor }}
    >
      <div className="flex-1 flex flex-col h-full">
        {/* New Chat Button */}
        <div className="p-4">
          <Button
            onClick={onNewChat}
            className="w-full h-11"
            style={{
              backgroundColor: '#005A9C',
              color: '#FFFFFF'
            }}
          >
            <Plus className="w-5 h-5 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Conversation History */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 pb-4">
            {conversations.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm" style={{ color: textSecondary }}>
                No conversations yet
              </div>
            ) : (
              conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className="group relative"
                >
                  <button
                    onClick={() => onSelectConversation(conversation.id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg transition-colors relative"
                    style={{
                      backgroundColor:
                        activeConversationId === conversation.id ? activeBg : 'transparent',
                      color: textPrimary
                    }}
                    onMouseEnter={(e) => {
                      if (activeConversationId !== conversation.id) {
                        e.currentTarget.style.backgroundColor = hoverBg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeConversationId !== conversation.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div className="pr-8 text-sm truncate">
                      {conversation.title}
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#DC3545' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? '#3D1F1F' : '#FFF5F5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Theme Toggle */}
        <div className="border-t px-4 py-3" style={{ borderColor }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" style={{ color: textSecondary }} />
              <span className="text-sm" style={{ color: textPrimary }}>Theme</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={isDark}
                onCheckedChange={onToggleTheme}
                className="data-[state=checked]:bg-[#005A9C]"
              />
              <Moon className="w-4 h-4" style={{ color: textSecondary }} />
            </div>
          </div>
        </div>

        {/* User Profile/Logout */}
        <div className="border-t p-4" style={{ borderColor }}>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: '#005A9C', color: '#FFFFFF' }}>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate" style={{ color: textPrimary }}>
                {user.name}
              </div>
              <div className="text-xs truncate" style={{ color: textSecondary }}>
                {user.email}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg transition-colors flex-shrink-0"
              style={{ color: textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverBg;
                e.currentTarget.style.color = '#DC3545';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = textSecondary;
              }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}