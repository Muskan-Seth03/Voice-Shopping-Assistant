import React from 'react';
import { Card } from './ui/card';
import { cn } from '../lib/utils';

interface VoiceTranscriptProps {
  transcript: string;
  confidence: number;
  isVisible: boolean;
  className?: string;
}

export const VoiceTranscript: React.FC<VoiceTranscriptProps> = ({
  transcript,
  confidence,
  isVisible,
  className
}) => {
  if (!isVisible || !transcript) {
    return null;
  }

  const confidenceColor = confidence > 0.8 ? 'text-green-400' : confidence > 0.5 ? 'text-yellow-400' : 'text-red-400';

  return (
    <Card className={cn(
      "p-4 bg-gray-900/80 backdrop-blur-sm border-2 border-blue-500/30 shadow-lg transition-all duration-300",
      className
    )}>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-100 mb-2">
          "{transcript}"
        </p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-300">Confidence:</span>
          <span className={cn("text-sm font-semibold", confidenceColor)}>
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>
    </Card>
  );
};