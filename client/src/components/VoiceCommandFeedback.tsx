import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '../lib/utils';

interface VoiceCommandFeedbackProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onHide?: () => void;
  className?: string;
}

export const VoiceCommandFeedback: React.FC<VoiceCommandFeedbackProps> = ({
  message,
  type,
  isVisible,
  onHide,
  className
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        onHide?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!shouldRender || !message) {
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-400" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/50 border-green-700/50 text-green-100';
      case 'error':
        return 'bg-red-900/50 border-red-700/50 text-red-100';
      case 'info':
        return 'bg-blue-900/50 border-blue-700/50 text-blue-100';
    }
  };

  return (
    <Card className={cn(
      "p-4 border-2 shadow-lg transition-all duration-300 animate-in slide-in-from-top-2 backdrop-blur-sm",
      getStyles(),
      className
    )}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <p className="font-medium">{message}</p>
      </div>
    </Card>
  );
};