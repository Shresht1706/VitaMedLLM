import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import ChatInterface from './components/ChatInterface';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut 
} from './firebaseConfig';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const RENDER_BACKEND_URL = "https://vitamedllm.onrender.com/generate"; //backend url

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
  const [authReady, setAuthReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // If the user is a real Firebase user, set our React state
        setUser({
          name: firebaseUser.displayName || 'Test User',
          email: firebaseUser.email || 'test@example.com',
          avatar: firebaseUser.photoURL || undefined
        });
        setIsLoggedIn(true); // Set your existing state
      } else {
        // User is logged out
        setUser(null);
        setIsLoggedIn(false); // Set your existing state
      }
      setAuthReady(true); // Auth is ready, we can show the app
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty array means this runs once on mount

  const handleLogin = async () => {
    try {
      // This will use our emulator's fake Google login popup
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setConversations([]); // Clear conversations on logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
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

  const handleSendMessage = async (content: string) => {
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

  try {
    if (RENDER_BACKEND_URL.includes("YOUR-RENDER-SERVICE-NAME")) {
      throw new Error("Render backend URL is not configured in App.tsx.");
    }

    // Build conversation history (optional context)
    const currentConversation = conversations.find(conv => conv.id === (activeConversationId || messageId));
    const mappedHistory = currentConversation ? currentConversation.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    })) : [];

    const response = await fetch(RENDER_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: mappedHistory, prompt: content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server responded with ${response.status}`);
    }

    const data = await response.json();
    const modelResponse = data.text;

    if (!modelResponse) throw new Error("Invalid response format from backend.");

    const aiMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: modelResponse,
      timestamp: new Date()
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === (activeConversationId || messageId)
          ? { ...conv, messages: [...conv.messages, aiMessage] }
          : conv
      )
    );
  } catch (error) {
    console.error("Error calling backend:", error);
    const errorMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : String(error)}`,
      timestamp: new Date()
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === (activeConversationId || messageId)
          ? { ...conv, messages: [...conv.messages, errorMessage] }
          : conv
      )
    );
  };
};


  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

if (!authReady) {
    return <div />; // Or a loading component
  }


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
