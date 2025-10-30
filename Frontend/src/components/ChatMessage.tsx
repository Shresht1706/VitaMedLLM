import { Message } from '../App';

interface ChatMessageProps {
  message: Message;
  theme: 'light' | 'dark';
}

export default function ChatMessage({ message, theme }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isDark = theme === 'dark';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className="max-w-[80%] rounded-2xl px-4 py-3"
        style={{
          backgroundColor: isUser ? '#005A9C' : (isDark ? '#2D3139' : '#F8F9FA'),
          color: isUser ? '#FFFFFF' : (isDark ? '#E9ECEF' : '#212529')
        }}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}