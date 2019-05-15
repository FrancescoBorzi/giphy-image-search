// https://developers.giphy.com/docs/#operation--gifs-search-get
export interface GiphySearchResult {
  data: GiphyGifObject[];
  pagination: GiphyPaginationObject;
  meta: GiphyMetaObject;
}

// https://developers.giphy.com/docs/#pagination-object
export interface GiphyPaginationObject {
  total_count: number;
  count: number;
  offset: number;
}

// https://developers.giphy.com/docs/#metacontent-object
export interface GiphyMetaObject {
  status: number;
  msg: string;
  response_id: string;
}

// https://developers.giphy.com/docs/#gif-object
export interface GiphyGifObject {
  type?: string;
  id?: string;
  slug?: string;
  url?: string;
  bitly_gif_url?: string;
  bitly_url?: string;
  embed_url?: string;
  username?: string;
  source?: string;
  rating?: string;
  content_url?: string;
  source_tld?: string;
  source_post_url?: string;
  is_sticker?: number;
  import_datetime?: string;
  trending_datetime?: string;
  images?: GiphyImages;
  title?: string;
}

// https://developers.giphy.com/docs/#images-object
export interface GiphyImages {
  fixed_height_still?: GiphyImageBaseData;
  original_still?: GiphyImageBaseData;
  fixed_width?: GiphyImageBaseData;
  fixed_height_small_still?: GiphyImageBaseData;
  fixed_height_downsampled?: GiphyImageBaseData;
  preview?: GiphyImageBaseData;
  fixed_height_small?: GiphyImageBaseData;
  downsized_still?: GiphyImageBaseData;
  downsized?: GiphyImageBaseData;
  downsized_large?: GiphyImageBaseData;
  fixed_width_small_still?: GiphyImageBaseData;
  preview_webp?: GiphyImageBaseData;
  fixed_width_still?: GiphyImageBaseData;
  fixed_width_small?: GiphyImageBaseData;
  downsized_small?: GiphyImageBaseData;
  fixed_width_downsampled?: GiphyImageBaseData;
  downsized_medium?: GiphyImageBaseData;
  original?: GiphyImageBaseData;
  fixed_height?: GiphyImageBaseData;
  original_mp4?: GiphyImageBaseData;
  preview_gif?: GiphyImageBaseData;
}

// Custom type (most of GiphyImage properties inherits this type)
export interface GiphyImageBaseData {
  url: string;
  width?: string;
  height?: string;
}
