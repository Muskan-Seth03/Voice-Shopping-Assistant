import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface VoiceMicrophoneProps {
  isListening: boolean;
  isProcessing: boolean;
  isSupported: boolean;
  onToggle: () => void;
  className?: string;
}

export const VoiceMicrophone: React.FC<VoiceMicrophoneProps> = ({
  isListening,
  isProcessing,
  isSupported,
  onToggle,
  className
}) => {
  const getButtonState = () => {
    if (isProcessing) return 'processing';
    if (isListening) return 'listening';
    return 'ready';
  };

  const buttonState = getButtonState();

  const buttonStyles = {
    ready: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
    listening: 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg animate-pulse',
    processing: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
  };

  const getIcon = () => {
    if (isProcessing) return <Loader2 className="h-8 w-8 animate-spin" />;
    if (isListening) return <Mic className="h-8 w-8" />;
    return <MicOff className="h-8 w-8" />;
  };

  const getStatusText = () => {
    if (isProcessing) return 'Processing...';
    if (isListening) return 'Listening...';
    return 'Tap to speak';
  };

  if (!isSupported) {
    return (
      <div className="text-center">
        <Button disabled className="w-24 h-24 rounded-full">
          <MicOff className="h-8 w-8" />
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          Voice recognition not supported in this browser
        </p>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <Button
        onClick={onToggle}
        disabled={isProcessing}
        className={cn(
          "w-24 h-24 rounded-full transition-all duration-300 transform hover:scale-105",
          buttonStyles[buttonState]
        )}
      >
        {getIcon()}
      </Button>
      <p className="mt-4 text-sm font-medium text-foreground">
        {getStatusText()}
      </p>
      {isListening && (
        <div className="mt-2 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};