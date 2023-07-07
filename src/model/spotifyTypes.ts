export type Device = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
};

export type ExternalUrls = {
  spotify: string;
};

export type Context = {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
};

export type Images = {
  url: string;
  height: number;
  width: number;
};

export type Restrictions = {
  reason: string;
};

export type Copyrights = {
  text: string;
  type: string;
};

export type ExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

export type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  copyrights: Copyrights[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: Artist[];
};

export type Followers = {
  href: string;
  total: number;
};

export type Artist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Images[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type TrackItem = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type Actions = {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
};

export type CurrentPlaybackResponse = {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: Context;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: TrackItem;
  currently_playing_type: string;
  actions: Actions;
};
