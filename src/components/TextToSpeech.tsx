import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextToSpeechProps {
  text: string;
  enabled: boolean;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, enabled }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSpeak = async () => {
    if (!enabled) return;
    
    if ('speechSynthesis' in window) {
      try {
        setIsLoading(true);
        
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onstart = () => {
          setIsPlaying(true);
          setIsLoading(false);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          setIsLoading(false);
          toast({
            title: "Speech Error",
            description: "Failed to play text-to-speech. Please try again.",
            variant: "destructive",
          });
        };
        
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Speech Not Supported",
          description: "Text-to-speech is not supported in your browser.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Feature Not Available",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  if (!enabled) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={isPlaying ? handleStop : handleSpeak}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
      {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Listen'}
    </Button>
  );
};

export default TextToSpeech;