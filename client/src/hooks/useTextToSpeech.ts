import { useState, useCallback, useRef } from 'react';

interface UseTextToSpeechProps {
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useTextToSpeech = ({
  language = 'en-US',
  rate = 1,
  pitch = 1,
  volume = 1
}: UseTextToSpeechProps = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState('speechSynthesis' in window);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!isSupported || !text.trim()) {
      console.warn('Text-to-speech not supported or empty text');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      console.log('Text-to-speech started:', text);
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      console.log('Text-to-speech ended');
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Text-to-speech error:', event.error);
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, language, rate, pitch, volume]);

  const stop = useCallback(() => {
    if (isSupported) {
      console.log('Stopping text-to-speech');
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported
  };
};