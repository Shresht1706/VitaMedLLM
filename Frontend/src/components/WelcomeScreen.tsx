import { Activity, Heart, Pill, Stethoscope } from 'lucide-react';

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
  theme: 'light' | 'dark';
}

export default function WelcomeScreen({ onSelectPrompt, theme }: WelcomeScreenProps) {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1A1D21' : '#FFFFFF';
  const cardBg = isDark ? '#2D3139' : '#FFFFFF';
  const borderColor = isDark ? '#3D4450' : '#E9ECEF';
  const textPrimary = isDark ? '#E9ECEF' : '#212529';
  const textSecondary = isDark ? '#9CA3AF' : '#6C757D';
  const iconBg = isDark ? '#1A1D21' : '#F8F9FA';
  const hoverBg = isDark ? '#1A1D21' : '#F8F9FA';

  const examplePrompts = [
    {
      icon: Heart,
      text: 'What is type 2 diabetes?',
      color: '#DC3545'
    },
    {
      icon: Pill,
      text: 'How do antibiotics work?',
      color: '#005A9C'
    },
    {
      icon: Stethoscope,
      text: 'What causes high blood pressure?',
      color: '#28A745'
    }
  ];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ backgroundColor: bgColor }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Welcome Message */}
        <div className="text-center space-y-4">
          <div className="flex justify-center relative">
            {/* Medical Cross Badge */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#28A745' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V14M2 8H14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#005A9C' }}
            >
              <Activity className="w-8 h-8" style={{ color: '#FFFFFF' }} strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl" style={{ color: textPrimary }}>
            How can I help you today?
          </h1>
          <p className="text-lg" style={{ color: textSecondary }}>
            Ask me anything about health and medical topics
          </p>
        </div>

        {/* Example Prompts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examplePrompts.map((prompt, index) => {
            const Icon = prompt.icon;
            return (
              <button
                key={index}
                onClick={() => onSelectPrompt(prompt.text)}
                className="p-6 rounded-xl border-2 transition-all hover:shadow-md text-left group"
                style={{
                  borderColor,
                  backgroundColor: cardBg
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = prompt.color;
                  e.currentTarget.style.backgroundColor = hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.backgroundColor = cardBg;
                }}
              >
                <div className="space-y-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors"
                      style={{ color: prompt.color }}
                    />
                  </div>
                  <p className="text-sm" style={{ color: textPrimary }}>
                    {prompt.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}