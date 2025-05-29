export type PopupType = ReturnType<typeof createPopupClass>;
export type PopupInstanceType = InstanceType<PopupType>;

// マーカータイプの定義
export type MarkerType = 'marker' | 'cluster';

// ポップアップ用の拡張クラス
export const createPopupClass = () => {
  return class Popup extends google.maps.OverlayView {
    position: google.maps.LatLng | google.maps.LatLngLiteral;
    containerDiv: HTMLDivElement;
    markerType: MarkerType;
    private idleListener: google.maps.MapsEventListener | null = null;

    constructor(
      position: google.maps.LatLng | google.maps.LatLngLiteral,
      content: HTMLElement,
      markerType: MarkerType = 'marker',
    ) {
      super();
      this.position = position;
      this.markerType = markerType;

      content.classList.add('popup-bubble');

      const bubbleAnchor = document.createElement('div');

      bubbleAnchor.classList.add('popup-bubble-anchor');
      bubbleAnchor.appendChild(content);

      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('popup-container');
      this.containerDiv.appendChild(bubbleAnchor);

      Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    onAdd() {
      this.getPanes()!.floatPane.appendChild(this.containerDiv);

      // Mapのidleイベントリスナーを追加
      const map = this.getMap();
      if (map) {
        this.idleListener = map.addListener('idle', () => {
          this.draw();
        });
      }
    }

    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(this.position)!;

      const display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

      if (display === 'block') {
        // マーカータイプに応じて縦位置のオフセットを調整
        const offsetY = this.markerType === 'cluster' ? 32 : 44;
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y - offsetY + 'px';
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  };
};
