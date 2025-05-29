import { debounce } from '@/scripts/utils';
import type { PopupInstanceType } from './createPopupClass';

type LatLngLike = { lat: number; lng: number } | { lat: () => number; lng: () => number };

export const removePopup = (currentPopup: PopupInstanceType | null) => {
  currentPopup?.onRemove();
  currentPopup = null;
};

export const getLatLng = (position: LatLngLike) => ({
  lat: typeof position?.lat === 'function' ? position.lat() : position?.lat,
  lng: typeof position?.lng === 'function' ? position.lng() : position?.lng,
});

export const setupPopupObserver = (
  container: HTMLElement,
  markerPosition: { lat: number | null; lng: number | null },
  removePopup: () => void,
) => {
  const observer = new MutationObserver(
    debounce(() => {
      const target = container?.querySelector(`[position="${markerPosition.lat},${markerPosition.lng}"]`);
      if (!target) {
        removePopup();
        observer.disconnect();
      }
    }, 100),
  );
  observer.observe(container, { childList: true });
  return observer;
};
