export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface Thumbnails {
  default?: Thumbnail;
  medium?: Thumbnail;
  high?: Thumbnail;
}

export interface Snippet {
  publishedAt?: string;
  publishTime?: string;
  channelId?: string;
  title: string;
  description?: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent?: string;
  customUrl?: string;
}

export interface VideoId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

export interface YouTubeVideo {
  kind?: string;
  id: VideoId | string;
  snippet: Snippet;
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    favoriteCount?: string;
    commentCount?: string;
    subscriberCount?: string;
  };
  contentDetails?: {
    duration?: string;
  };
}

export interface YouTubeChannel {
  kind?: string;
  id: string | { channelId: string };
  snippet: Snippet;
  statistics?: {
    subscriberCount?: string;
    videoCount?: string;
    viewCount?: string;
  };
  brandingSettings?: {
    image?: {
      bannerExternalUrl?: string;
    };
  };
}

export interface SearchResponse {
  kind: string;
  items: YouTubeVideo[];
  nextPageToken?: string;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
}
