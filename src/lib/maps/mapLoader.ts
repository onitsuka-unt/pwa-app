import { GOOGLE_MAPS_API_KEY } from '@/const';
import { Loader } from '@googlemaps/js-api-loader';

// Google Maps APIのローダーを作成
export const mapLoader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
});
