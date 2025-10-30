import { useState } from 'react';
import LoginPage from './components/LoginPage';
import ChatInterface from './components/ChatInterface';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Symptoms of Type 2 Diabetes',
      messages: [
        {
          id: '1-1',
          role: 'user',
          content: 'What are the symptoms of type 2 diabetes?',
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          id: '1-2',
          role: 'assistant',
          content: 'Type 2 diabetes symptoms develop gradually and may include: increased thirst and frequent urination, increased hunger, unintended weight loss, fatigue, blurred vision, slow-healing sores, and frequent infections. Many people with type 2 diabetes have no symptoms initially.',
          timestamp: new Date(Date.now() - 86400000)
        }
      ],
      createdAt: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      title: 'Understanding Blood Pressure',
      messages: [
        {
          id: '2-1',
          role: 'user',
          content: 'What is considered normal blood pressure?',
          timestamp: new Date(Date.now() - 172800000)
        },
        {
          id: '2-2',
          role: 'assistant',
          content: 'Normal blood pressure is generally considered to be below 120/80 mmHg. The first number (systolic) measures pressure when the heart beats, and the second number (diastolic) measures pressure between beats. Elevated blood pressure is 120-129 systolic and less than 80 diastolic.',
          timestamp: new Date(Date.now() - 172800000)
        }
      ],
      createdAt: new Date(Date.now() - 172800000)
    }
  ]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const handleLogin = () => {
    // Mock login - in production this would use Google OAuth
    setUser({
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com'
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveConversationId(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = (content: string) => {
    const messageId = Date.now().toString();
    const newMessage: Message = {
      id: messageId,
      role: 'user',
      content,
      timestamp: new Date()
    };

    if (activeConversationId) {
      // Add to existing conversation
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        )
      );
    } else {
      // Create new conversation
      const newConversation: Conversation = {
        id: messageId,
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [newMessage],
        createdAt: new Date()
      };
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Thank you for your question. As an AI assistant, I can provide general health information, but please remember to consult with a qualified healthcare professional for personalized medical advice and diagnosis.',
        timestamp: new Date()
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === (activeConversationId || messageId)
            ? { ...conv, messages: [...conv.messages, aiMessage] }
            : conv
        )
      );
    }, 1500);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <ChatInterface
      user={user!}
      conversations={conversations}
      activeConversation={activeConversation}
      onLogout={handleLogout}
      onNewChat={handleNewChat}
      onSelectConversation={handleSelectConversation}
      onSendMessage={handleSendMessage}
      onDeleteConversation={handleDeleteConversation}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}