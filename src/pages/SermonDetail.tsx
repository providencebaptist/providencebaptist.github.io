import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, Download, ArrowLeft, Play, Pause, MessageCircle, Eye } from "lucide-react";
import SEO from "@/components/SEO";
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MiniPlayer } from "@/components/MiniPlayer";
import { translateScripture } from "@/lib/bibleTranslations";

interface SermonApiSpeaker {
  displayName: string;
  bio?: string;
  portraitURL?: string;
}

interface SermonApiAudioOption {
  bitrate: number;
  downloadURL: string;
  fileSizeBytes: number;
  streamURL?: string;
}

interface SermonApiVideoOption {
  bitrate: number;
  downloadURL?: string;
  fileSizeBytes: number;
  streamURL?: string;
  thumbnailImageURL?: string;
}

interface SermonApiMedia {
  audio?: SermonApiAudioOption[];
  video?: SermonApiVideoOption[];
}

interface SermonApiItem {
  sermonID: string;
  displayTitle: string;
  preachDate: string;
  speaker: SermonApiSpeaker;
  bibleText: string;
  broadcaster?: {
    bibleVersion?: string;
  };
  series?: {
    displayTitle?: string;
  };
  media?: SermonApiMedia;
  commentCount?: number;
  downloadCount?: number;
  videoDownloadCount?: number;
  audioDurationSeconds: number;
  moreInfoText?: string;
  eventType?: string;
}

interface SermonApiResponse {
  results: SermonApiItem[];
}

interface MediaOption {
  label: string;
  url: string;
  size: string;
  bitrate?: number;
}

interface Speaker {
  displayName: string;
  bio: string;
  portraitURL: string;
}

interface Sermon {
  id: string;
  title: string;
  date: string;
  speaker: string;
  speakerData: Speaker;
  scripture: string;
  bibleVersion: string;
  category: string;
  description: string;
  duration: string;
  series?: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  audioOptions: MediaOption[];
  videoOptions: MediaOption[];
  commentCount: number;
  audioDownloadCount: number;
  videoDownloadCount: number;
  transcript?: string;
}

const SermonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [activeMiniPlayer, setActiveMiniPlayer] = useState<'audio' | 'video' | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  const playbackSpeeds = [0.75, 1, 1.25, 1.5, 2];

  // Handle scroll to show/hide mini player
  useEffect(() => {
    const handleScroll = () => {
      const audioPlayerTop = audioPlayerRef.current?.getBoundingClientRect().top || 0;
      const videoPlayerTop = videoPlayerRef.current?.getBoundingClientRect().top || 0;

      // Show mini player when main players are scrolled out of view
      if ((isPlaying && audioPlayerTop < -100) || (isVideoPlaying && videoPlayerTop < -100)) {
        setShowMiniPlayer(true);
        if (isPlaying) setActiveMiniPlayer('audio');
        else if (isVideoPlaying) setActiveMiniPlayer('video');
      } else {
        setShowMiniPlayer(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, isVideoPlaying]);

  // Load saved playback position from localStorage
  const loadPlaybackPosition = (mediaId: string, type: 'audio' | 'video') => {
    const savedPosition = localStorage.getItem(`sermon-${mediaId}-${type}-position`);
    return savedPosition ? parseFloat(savedPosition) : 0;
  };

  // Save playback position to localStorage
  const savePlaybackPosition = (mediaId: string, type: 'audio' | 'video', position: number) => {
    localStorage.setItem(`sermon-${mediaId}-${type}-position`, position.toString());
  };

  // Fetch sermon data from JSON file
  useEffect(() => {
    const fetchSermon = async () => {
      try {
        const response = await fetch('/sermons-data.json');
        const data: SermonApiResponse = await response.json();

        // Find the specific sermon by ID
        const sermonData = data.results.find((item) => item.sermonID === id);

        if (sermonData) {
          // Map audio options
          const audioOptions: MediaOption[] = sermonData.media?.audio?.map((audio) => ({
            label: audio.bitrate === 96 ? 'High Quality' : 'Low Quality',
            url: audio.downloadURL,
            size: formatBytes(audio.fileSizeBytes),
            bitrate: audio.bitrate
          })) || [];

          // Map video options and sort by bitrate (highest quality first)
          const videoOptions: MediaOption[] = sermonData.media?.video
            ?.filter((v) => v.downloadURL)
            ?.map((video) => ({
              label: video.bitrate >= 1000 ? '1080p' : video.bitrate >= 500 ? 'High' : 'Low',
              url: video.downloadURL,
              size: formatBytes(video.fileSizeBytes),
              bitrate: video.bitrate
            }))
            ?.sort((a: MediaOption, b: MediaOption) => (b.bitrate || 0) - (a.bitrate || 0)) || [];

          // Extract thumbnail from first video option (all have same thumbnail)
          const thumbnailUrl = sermonData.media?.video?.find(v => v.thumbnailImageURL)?.thumbnailImageURL;

          // Map SermonAudio API data to our Sermon interface
          const mappedSermon: Sermon = {
            id: sermonData.sermonID,
            title: sermonData.displayTitle.replace(/^"|"$/g, ''),
            date: sermonData.preachDate,
            speaker: sermonData.speaker.displayName,
            speakerData: {
              displayName: sermonData.speaker.displayName,
              bio: sermonData.speaker.bio || '',
              portraitURL: sermonData.speaker.portraitURL || ''
            },
            scripture: translateScripture(sermonData.bibleText),
            bibleVersion: sermonData.broadcaster?.bibleVersion || 'KJV',
            category: determineCategory(sermonData),
            description: sermonData.moreInfoText || '',
            duration: formatDuration(sermonData.audioDurationSeconds),
            series: sermonData.series?.displayTitle || undefined,
            audioUrl: sermonData.media?.audio?.[0]?.streamURL,
            videoUrl: videoOptions[0]?.url, // Use highest quality download URL instead of expiring stream URL
            thumbnailUrl,
            audioOptions,
            videoOptions,
            commentCount: sermonData.commentCount || 0,
            audioDownloadCount: sermonData.downloadCount || 0,
            videoDownloadCount: sermonData.videoDownloadCount || 0
          };

          setSermon(mappedSermon);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sermon:', error);
        setLoading(false);
      }
    };

    fetchSermon();
  }, [id]);

  // Helper function to determine category from sermon data
  const determineCategory = (item: SermonApiItem): string => {
    return item.eventType || 'Sunday - AM';
  };

  // Helper function to format duration from seconds to "X min"
  const formatDuration = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    return `${minutes} min`;
  };

  // Helper function to format bytes to readable size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVideoPlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Handle audio time updates
  const handleAudioTimeUpdate = () => {
    if (audioRef.current && id) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setAudioProgress((currentTime / duration) * 100);
      // Save progress every 5 seconds
      if (Math.floor(currentTime) % 5 === 0) {
        savePlaybackPosition(id, 'audio', currentTime);
      }
    }
  };

  // Handle video time updates
  const handleVideoTimeUpdate = () => {
    if (videoRef.current && id) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setVideoProgress((currentTime / duration) * 100);
      // Save progress every 5 seconds
      if (Math.floor(currentTime) % 5 === 0) {
        savePlaybackPosition(id, 'video', currentTime);
      }
    }
  };

  // Handle audio loaded metadata
  const handleAudioLoadedMetadata = () => {
    if (audioRef.current && id) {
      const duration = audioRef.current.duration;
      setAudioDuration(duration);
      // Load saved position
      const savedPosition = loadPlaybackPosition(id, 'audio');
      if (savedPosition > 0) {
        audioRef.current.currentTime = savedPosition;
      }
    }
  };

  // Handle video loaded metadata
  const handleVideoLoadedMetadata = () => {
    if (videoRef.current && id) {
      const duration = videoRef.current.duration;
      setVideoDuration(duration);
      // Load saved position
      const savedPosition = loadPlaybackPosition(id, 'video');
      if (savedPosition > 0) {
        videoRef.current.currentTime = savedPosition;
      }
    }
  };

  // Seek audio to position
  const seekAudio = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  // Seek video to position
  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Change audio playback speed
  const changeAudioSpeed = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setAudioSpeed(speed);
      localStorage.setItem('sermon-audio-speed', speed.toString());
    }
  };

  // Change video playback speed
  const changeVideoSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setVideoSpeed(speed);
      localStorage.setItem('sermon-video-speed', speed.toString());
    }
  };

  // Load saved playback speed
  useEffect(() => {
    const savedAudioSpeed = localStorage.getItem('sermon-audio-speed');
    const savedVideoSpeed = localStorage.getItem('sermon-video-speed');

    if (savedAudioSpeed) {
      setAudioSpeed(parseFloat(savedAudioSpeed));
    }
    if (savedVideoSpeed) {
      setVideoSpeed(parseFloat(savedVideoSpeed));
    }
  }, []);

  // Apply playback speed when audio loads
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = audioSpeed;
    }
  }, [sermon, audioSpeed]);

  // Apply playback speed when video loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [sermon, videoSpeed]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading sermon...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Sermon Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The sermon you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild variant="hero">
              <Link to="/sermons">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Sermons
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // JSON-LD structured data for the sermon
  const sermonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://pbcatx.org/sermons/${sermon.id}`,
    "headline": sermon.title,
    "description": sermon.description,
    "datePublished": sermon.date,
    "author": {
      "@type": "Person",
      "name": sermon.speaker,
      "jobTitle": "Pastor"
    },
    "publisher": {
      "@type": "Church",
      "name": "Providence Baptist Church",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pbcatx.org/logo.png"
      }
    },
    "about": {
      "@type": "Thing",
      "name": sermon.category
    },
    "articleSection": "Sermons",
    "wordCount": sermon.transcript?.split(' ').length || 2500,
    "timeRequired": sermon.duration,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pbcatx.org/sermons/${sermon.id}`
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${sermon.title} - Sermon`}
        description={sermon.description}
        image={sermon.thumbnailUrl || "https://pbcatx.org/placeholder.svg"}
        url={`https://pbcatx.org/sermons/${sermon.id}`}
        type="article"
        structuredData={sermonSchema}
      />

      <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/sermons"
            className="inline-flex items-center text-accent-foreground hover:underline mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Sermons
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 bg-background/20 rounded-full text-sm font-semibold">
              {sermon.category}
            </span>
            {sermon.series && (
              <span className="inline-block px-3 py-1 bg-background/20 rounded-full text-sm font-semibold">
                Series: {sermon.series}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {sermon.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(sermon.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{sermon.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{sermon.scripture} ({sermon.bibleVersion})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Sermon Info Card */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                About This Message
              </h2>
              <div className="mb-6">
                <p className="text-base sm:text-lg text-foreground font-semibold mb-2">
                  Speaker: {sermon.speaker}
                </p>
                <p className="text-base sm:text-lg text-foreground font-semibold mb-2">
                  Scripture: {sermon.scripture}
                </p>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {sermon.description}
              </p>
            </CardContent>
          </Card>

          {/* Audio Player Card */}
          <Card className="shadow-lg mb-8" ref={audioPlayerRef}>
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                Listen to Sermon
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Button
                  onClick={togglePlayPause}
                  variant="hero"
                  size="lg"
                  className="flex-1 min-h-[44px]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" />
                      Pause Audio
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      Play Audio
                    </>
                  )}
                </Button>
                {sermon.audioOptions.length > 0 && (
                  <Select onValueChange={(value) => window.open(value, '_blank')}>
                    <SelectTrigger className="flex-1 min-h-[44px]">
                      <Download className="mr-2 h-5 w-5" />
                      <SelectValue placeholder="Download Audio" />
                    </SelectTrigger>
                    <SelectContent>
                      {sermon.audioOptions.map((option, index) => (
                        <SelectItem key={index} value={option.url}>
                          {option.label} ({option.size})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Playback Speed Controls */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Playback Speed: {audioSpeed}x
                </label>
                <div className="flex gap-2">
                  {playbackSpeeds.map((speed) => (
                    <Button
                      key={speed}
                      onClick={() => changeAudioSpeed(speed)}
                      variant={audioSpeed === speed ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{sermon.audioDownloadCount} downloads</span>
                </div>
              </div>
              <audio
                ref={audioRef}
                src={sermon.audioUrl}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={handleAudioTimeUpdate}
                onLoadedMetadata={handleAudioLoadedMetadata}
                className="hidden"
              />

              {/* Custom Progress Bar */}
              <div className="mt-4">
                <div
                  className="w-full h-2 bg-muted rounded-full cursor-pointer overflow-hidden"
                  onClick={seekAudio}
                  data-testid="audio-progress-bar"
                >
                  <div
                    className="h-full bg-primary transition-all duration-100"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                  <span>{formatTime(audioDuration)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Player Card */}
          {sermon.videoUrl && (
            <Card className="shadow-lg mb-8" ref={videoPlayerRef}>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                  Watch Sermon
                </h3>
                <div className="mb-4">
                  <video
                    ref={videoRef}
                    src={sermon.videoUrl}
                    onEnded={() => setIsVideoPlaying(false)}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    className="w-full rounded-lg"
                    poster=""
                  />

                  {/* Custom Progress Bar */}
                  <div className="mt-4">
                    <div
                      className="w-full h-2 bg-muted rounded-full cursor-pointer overflow-hidden"
                      onClick={seekVideo}
                      data-testid="video-progress-bar"
                    >
                      <div
                        className="h-full bg-primary transition-all duration-100"
                        style={{ width: `${videoProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                      <span>{formatTime(videoDuration)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={toggleVideoPlayPause}
                    variant="hero"
                    size="lg"
                    className="flex-1 min-h-[44px]"
                  >
                    {isVideoPlaying ? (
                      <>
                        <Pause className="mr-2 h-5 w-5" />
                        Pause Video
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Play Video
                      </>
                    )}
                  </Button>
                  {sermon.videoOptions.length > 0 && (
                    <Select onValueChange={(value) => window.open(value, '_blank')}>
                      <SelectTrigger className="flex-1 min-h-[44px]">
                        <Download className="mr-2 h-5 w-5" />
                        <SelectValue placeholder="Download Video" />
                      </SelectTrigger>
                      <SelectContent>
                        {sermon.videoOptions.map((option, index) => (
                          <SelectItem key={index} value={option.url}>
                            {option.label} ({option.size})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Playback Speed Controls */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Playback Speed: {videoSpeed}x
                  </label>
                  <div className="flex gap-2">
                    {playbackSpeeds.map((speed) => (
                      <Button
                        key={speed}
                        onClick={() => changeVideoSpeed(speed)}
                        variant={videoSpeed === speed ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{sermon.videoDownloadCount} downloads</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sermon Statistics */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                Sermon Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <Download className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">{sermon.audioDownloadCount}</p>
                  <p className="text-sm text-muted-foreground">Audio Downloads</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <Eye className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">{sermon.videoDownloadCount}</p>
                  <p className="text-sm text-muted-foreground">Video Downloads</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">{sermon.commentCount}</p>
                  <p className="text-sm text-muted-foreground">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Card */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                Sermon Resources
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full justify-start min-h-[44px]"
                  asChild
                >
                  <a
                    href={`https://www.sermonaudio.com/sermoninfo.asp?SID=${sermon.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Visit SermonAudio Page
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Speaker Bio Section */}
          {sermon.speakerData && (
            <Card className="shadow-lg mb-8">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-foreground">
                  About the Speaker
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {sermon.speakerData.portraitURL && (
                    <img
                      src={sermon.speakerData.portraitURL}
                      alt={sermon.speakerData.displayName}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2 text-foreground">
                      {sermon.speakerData.displayName}
                    </h4>
                    {sermon.speakerData.bio && (
                      <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {sermon.speakerData.bio}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="shadow-lg bg-muted/30">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                Want More Messages Like This?
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">
                Subscribe to our sermon podcast or browse our complete sermon library.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="hero" size="lg" className="min-h-[44px]">
                  <Link to="/sermons">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse All Sermons
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                  <a
                    href="https://www.sermonaudio.com/solo/pbcatx/sermons/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe to Podcast
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mini Player */}
      {showMiniPlayer && activeMiniPlayer && sermon && (
        <MiniPlayer
          title={sermon.title}
          isPlaying={activeMiniPlayer === 'audio' ? isPlaying : isVideoPlaying}
          progress={activeMiniPlayer === 'audio' ? audioProgress : videoProgress}
          duration={activeMiniPlayer === 'audio' ? audioDuration : videoDuration}
          currentTime={
            activeMiniPlayer === 'audio'
              ? audioRef.current?.currentTime || 0
              : videoRef.current?.currentTime || 0
          }
          speed={activeMiniPlayer === 'audio' ? audioSpeed : videoSpeed}
          type={activeMiniPlayer}
          onPlayPause={activeMiniPlayer === 'audio' ? togglePlayPause : toggleVideoPlayPause}
          onSeek={activeMiniPlayer === 'audio' ? seekAudio : seekVideo}
          onSpeedChange={
            activeMiniPlayer === 'audio' ? changeAudioSpeed : changeVideoSpeed
          }
          onClose={() => {
            setShowMiniPlayer(false);
            if (activeMiniPlayer === 'audio') {
              togglePlayPause();
            } else {
              toggleVideoPlayPause();
            }
          }}
        />
      )}
    </div>
  );
};

export default SermonDetail;
