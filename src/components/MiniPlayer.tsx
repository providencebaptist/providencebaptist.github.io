import { Play, Pause, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface MiniPlayerProps {
  title: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  speed: number;
  type: 'audio' | 'video';
  onPlayPause: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  onSpeedChange: (speed: number) => void;
  onClose: () => void;
}

export const MiniPlayer = ({
  title,
  isPlaying,
  progress,
  duration,
  currentTime,
  speed,
  type,
  onPlayPause,
  onSeek,
  onSpeedChange,
  onClose
}: MiniPlayerProps) => {
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playbackSpeeds = [0.75, 1, 1.25, 1.5, 2];

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t shadow-2xl bg-background/95 backdrop-blur-md animate-slide-in-bottom">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <Button
            onClick={onPlayPause}
            variant="default"
            size="icon"
            className="flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          {/* Song Info & Progress */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-foreground truncate pr-4">
                {title}
              </p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div 
              className="w-full h-2 bg-muted rounded-full cursor-pointer overflow-hidden"
              onClick={onSeek}
            >
              <div 
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Speed Controls */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Speed:
            </span>
            {playbackSpeeds.map((spd) => (
              <Button
                key={spd}
                onClick={() => onSpeedChange(spd)}
                variant={speed === spd ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2 text-xs"
              >
                {spd}x
              </Button>
            ))}
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Speed Controls */}
        <div className="flex sm:hidden items-center gap-2 mt-2">
          <span className="text-xs text-muted-foreground">Speed:</span>
          {playbackSpeeds.map((spd) => (
            <Button
              key={spd}
              onClick={() => onSpeedChange(spd)}
              variant={speed === spd ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2 text-xs flex-1"
            >
              {spd}x
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
