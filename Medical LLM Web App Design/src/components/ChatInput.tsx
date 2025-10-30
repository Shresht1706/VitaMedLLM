import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  theme: 'light' | 'dark';
}

export default function ChatInput({ onSend, disabled, theme }: ChatInputProps) {
  const [input, setInput] = useState('');

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1A1D21' : '#FFFFFF';
  const borderColor = isDark ? '#2D3139' : '#E9ECEF';
  const textPrimary = isDark ? '#E9ECEF' : '#212529';
  const textSecondary = isDark ? '#9CA3AF' : '#6C757D';
  const inputBg = isDark ? '#2D3139' : '#FFFFFF';

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t" style={{ borderColor, backgroundColor: bgColor }}>
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Disclaimer */}
        <div
          className="text-xs text-center mb-3 px-4"
          style={{ color: textSecondary }}
        >
          I am an AI and not a medical professional. Please consult your doctor for medical advice.
        </div>

        {/* Input Area */}
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a medical question..."
            disabled={disabled}
            className="flex-1 min-h-[56px] max-h-[200px] resize-none border rounded-xl px-4 py-3"
            style={{
              borderColor,
              backgroundColor: inputBg,
              color: textPrimary
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="h-14 w-14 flex-shrink-0 rounded-xl"
            style={{
              backgroundColor: input.trim() && !disabled ? '#28A745' : borderColor,
              color: input.trim() && !disabled ? '#FFFFFF' : textSecondary
            }}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}