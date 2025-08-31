import { useState, useEffect, useCallback, useRef } from 'react';
import { VoiceRecognitionState } from '../types/shopping';

interface UseVoiceRecognitionProps {
  onResult: (transcript: string, confidence: number) => void;
  onError?: (error: string) => void;
  continuous?: boolean;
  language?: string;
}

export const useVoiceRecognition = ({
  onResult,
  onError,
  continuous = false,
  language = 'en-US'
}: UseVoiceRecognitionProps) => {
  const [state, setState] = useState<VoiceRecognitionState>({
    isListening: false,
    isProcessing: false,
    transcript: '',
    confidence: 0
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  useEffect(() => {
    if (!isSupported) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Voice recognition started');
      setState(prev => ({ ...prev, isListening: true, transcript: '' }));
    };

    recognition.onresult = (event) => {
      console.log('Voice recognition result received');
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;

      setState(prev => ({ 
        ...prev, 
        transcript,
        confidence,
        isProcessing: result.isFinal
      }));

      if (result.isFinal) {
        onResult(transcript, confidence);
        setState(prev => ({ ...prev, isProcessing: false }));
      }
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      setState(prev => ({ 
        ...prev, 
        isListening: false, 
        isProcessing: false 
      }));
      onError?.(event.error);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
      setState(prev => ({ 
        ...prev, 
        isListening: false, 
        isProcessing: false 
      }));
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [continuous, language, onResult, onError, isSupported]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || state.isListening) {
      return;
    }

    console.log('Starting voice recognition');
    recognitionRef.current.start();

    // Auto-stop after 10 seconds if continuous is false
    if (!continuous) {
      timeoutRef.current = setTimeout(() => {
        stopListening();
      }, 10000);
    }
  }, [isSupported, state.isListening, continuous]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      console.log('Stopping voice recognition');
      recognitionRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [state.isListening]);

  const toggleListening = useCallback(() => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [state.isListening, startListening, stopListening]);

  return {
    ...state,
    isSupported,
    startListening,
    stopListening,
    toggleListening
  };
};