import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import { Conversation } from '../App';
import { ScrollArea } from './ui/scroll-area';

interface ChatViewProps {
  conversation?: Conversation;
  onSendMessage: (content: string) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  theme: 'light' | 'dark';
}

export default function ChatView({
  conversation,
  onSendMessage,
  sidebarOpen,
  onToggleSidebar,
  theme
}: ChatViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1A1D21' : '#FFFFFF';
  const borderColor = isDark ? '#2D3139' : '#E9ECEF';
  const textPrimary = isDark ? '#E9ECEF' : '#212529';
  const textSecondary = isDark ? '#9CA3AF' : '#6C757D';
  const hoverBg = isDark ? '#2D3139' : '#F8F9FA';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = (content: string) => {
    onSendMessage(content);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header with menu toggle */}
      <div
        className="flex items-center px-4 py-3 border-b"
        style={{ borderColor, backgroundColor: bgColor }}
      >
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg transition-colors mr-2"
            style={{ color: textSecondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-lg" style={{ color: textPrimary }}>
          {conversation ? conversation.title : 'New Chat'}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: bgColor }}>
        {!conversation || conversation.messages.length === 0 ? (
          <WelcomeScreen onSelectPrompt={handleSend} theme={theme} />
        ) : (
          <ScrollArea className="h-full">
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {conversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} theme={theme} />
              ))}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div
                    className="flex-1 rounded-2xl px-4 py-3"
                    style={{ backgroundColor: isDark ? '#2D3139' : '#F8F9FA', color: textPrimary }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: textSecondary }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: textSecondary, animationDelay: '0.2s' }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: textSecondary, animationDelay: '0.4s' }}
                      />
                      <span className="ml-2 text-sm" style={{ color: textSecondary }}>
                        Model is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSend} disabled={isLoading} theme={theme} />
    </div>
  );
}