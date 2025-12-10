import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Calendar, Clock, Play, Heart, MessageCircle, ChevronLeft, ChevronRight, Search, Download, Eye } from "lucide-react";
import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  adaptiveBitrate?: boolean;
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

interface Sermon {
  id: string;
  title: string;
  date: string;
  speaker: string;
  scripture: string;
  category: string;
  description: string;
  duration: string;
  series?: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailURL?: string;
  commentCount: number;
  audioDownloadCount: number;
  videoDownloadCount: number;
}

const ITEMS_PER_PAGE = 20;

const Sermons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sunday - AM":
        return BookOpen;
      case "Sunday - PM":
        return Heart;
      case "Midweek Service":
        return MessageCircle;
      default:
        return BookOpen;
    }
  };

  // Fetch sermon data from JSON file
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch('/sermons-data.json');
        const data: SermonApiResponse = await response.json();

        // Map SermonAudio API data to our Sermon interface
        const mappedSermons: Sermon[] = data.results.map((item) => ({
          id: item.sermonID,
          title: item.displayTitle.replace(/^"|"$/g, ''), // Remove surrounding quotes
          date: item.preachDate,
          speaker: item.speaker.displayName,
          scripture: translateScripture(item.bibleText),
          category: determineCategory(item),
          description: item.moreInfoText || '',
          duration: formatDuration(item.audioDurationSeconds),
          series: item.series?.displayTitle || undefined,
          audioUrl: item.media?.audio?.[0]?.streamURL,
          videoUrl: item.media?.video?.find((v) => v.adaptiveBitrate)?.streamURL,
          thumbnailURL: item.media?.video?.find((v) => v.thumbnailImageURL)?.thumbnailImageURL,
          commentCount: item.commentCount || 0,
          audioDownloadCount: item.downloadCount || 0,
          videoDownloadCount: item.videoDownloadCount || 0
        }));
        
        setSermons(mappedSermons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sermons:', error);
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  // Initialize selected category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Helper function to determine category from sermon data
  const determineCategory = (item: SermonApiItem): string => {
    return item.eventType || 'Sunday - AM';
  };

  // Helper function to format duration from seconds to "X min"
  const formatDuration = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    return `${minutes} min`;
  };

  const categories = ["all", "Sunday - AM", "Sunday - PM", "Midweek Service"];

  // Filter by category
  const categoryFilteredSermons = selectedCategory === "all" 
    ? sermons 
    : sermons.filter(s => s.category === selectedCategory);

  // Filter by search query
  const filteredSermons = categoryFilteredSermons.filter(sermon => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      sermon.title.toLowerCase().includes(query) ||
      sermon.speaker.toLowerCase().includes(query) ||
      sermon.scripture.toLowerCase().includes(query) ||
      sermon.description.toLowerCase().includes(query) ||
      sermon.series?.toLowerCase().includes(query)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSermons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSermons = filteredSermons.slice(startIndex, endIndex);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // JSON-LD structured data for the sermon collection
  const sermonsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Providence Baptist Church Sermons",
    "description": "Collection of sermon messages from Providence Baptist Church",
    "itemListElement": sermons.map((sermon, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
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
          "name": "Providence Baptist Church"
        },
        "about": {
          "@type": "Thing",
          "name": sermon.category
        },
        "articleSection": "Sermons",
        "wordCount": 2500,
        "timeRequired": sermon.duration
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Sermons & Messages"
        description="Listen to biblical preaching and teaching from Pastor Kyle Pope at Providence Baptist Church Georgetown TX. Fresh sermon messages, Bible studies, and spiritual insights."
        url="https://pbcatx.org/sermons"
        type="article"
        structuredData={sermonsSchema}
      />

      <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <BookOpen className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              Sermons & Messages
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto px-4">
            Biblical preaching and teaching from God's Word
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Introduction Card */}
          <Card className="shadow-lg mb-8 sm:mb-12">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                Preaching the Word of God
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                At Providence Baptist Church, we believe in the power of biblical preaching. Our sermons 
                are expository messages that teach through books of the Bible verse by verse, applying 
                God's timeless truth to our modern lives.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                All of our services are livestreamed and recorded. You can watch past sermons on our 
                SermonAudio page or listen on various podcast platforms.
              </p>
            </CardContent>
          </Card>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search sermons by title, speaker, scripture, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 h-auto gap-2">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="capitalize text-xs sm:text-sm px-2 py-2 sm:px-4"
                  >
                    {cat === "all" ? "All Messages" : cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Sermon List */}
          <div className="space-y-6">
            {loading ? (
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Loading sermons...</p>
                </CardContent>
              </Card>
            ) : filteredSermons.length === 0 ? (
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No sermons found in this category.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {paginatedSermons.map((sermon) => {
              const CategoryIcon = getCategoryIcon(sermon.category);
              return (
                <Card key={sermon.id} className="shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-4 sm:p-6 h-full">
                    <div className="flex flex-col sm:flex-row gap-4 h-full">
                      {/* Sermon Thumbnail */}
                      <div className="flex-shrink-0">
                        {sermon.thumbnailURL ? (
                          <img 
                            src={sermon.thumbnailURL}
                            alt={sermon.title}
                            className="w-full sm:w-48 h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full sm:w-48 h-48 bg-accent/10 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="h-12 w-12 text-accent" />
                          </div>
                        )}
                      </div>

                    {/* Sermon Details */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-xs font-semibold">
                          {sermon.category}
                        </span>
                        {sermon.series && (
                          <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-semibold">
                            Series: {sermon.series}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        {sermon.title}
                      </h3>

                      <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(sermon.date).toLocaleDateString('en-US', { 
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{sermon.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{sermon.scripture}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {sermon.description}
                      </p>

                      <div className="text-sm text-foreground font-semibold mb-3">
                        Speaker: {sermon.speaker}
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{sermon.audioDownloadCount} audio</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{sermon.videoDownloadCount} video</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{sermon.commentCount} comments</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Link to={`/sermons/${sermon.id}`}>
                          <Button variant="hero" size="sm" className="min-h-[40px]">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Read More
                          </Button>
                        </Link>
                        <Link to={`/sermons/${sermon.id}`}>
                          <Button variant="outline" size="sm" className="min-h-[40px]">
                            <Play className="mr-2 h-4 w-4" />
                            Listen Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                );
              })}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage = 
                          page === 1 || 
                          page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1);
                        
                        const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                        const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;
                        
                        if (showEllipsisBefore || showEllipsisAfter) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        
                        if (!showPage) return null;
                        
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
            )}
          </div>

          {/* Call to Action */}
          <Card className="shadow-lg mt-12 bg-muted/30">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                Subscribe to Our Sermon Podcast
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">
                Never miss a message! Subscribe to our podcast on your favorite platform to receive 
                new sermons automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="hero" size="lg" className="min-h-[44px]">
                  <a href="https://www.sermonaudio.com/solo/pbcatx/sermons/" target="_blank" rel="noopener noreferrer">
                    Visit SermonAudio
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="min-h-[44px]">
                  Apple Podcasts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sermons;
