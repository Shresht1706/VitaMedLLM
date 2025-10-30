import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatView from './ChatView';
import { User, Conversation } from '../App';

interface ChatInterfaceProps {
  user: User;
  conversations: Conversation[];
  activeConversation?: Conversation;
  onLogout: () => void;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onSendMessage: (content: string) => void;
  onDeleteConversation: (id: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function ChatInterface({
  user,
  conversations,
  activeConversation,
  onLogout,
  onNewChat,
  onSelectConversation,
  onSendMessage,
  onDeleteConversation,
  theme,
  onToggleTheme
}: ChatInterfaceProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const bgColor = theme === 'light' ? '#FFFFFF' : '#1A1D21';

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: bgColor }}>
      <Sidebar
        user={user}
        conversations={conversations}
        activeConversationId={activeConversation?.id}
        onLogout={onLogout}
        onNewChat={onNewChat}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <ChatView
        conversation={activeConversation}
        onSendMessage={onSendMessage}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        theme={theme}
      />
    </div>
  );
}