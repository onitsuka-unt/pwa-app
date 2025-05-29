export class ClusterPopup {
  private containerDiv: HTMLDivElement;
  private parentElement: HTMLElement;

  constructor(parentElement: HTMLElement, content: HTMLElement) {
    this.parentElement = parentElement;

    content.classList.add('cluster-bubble');

    const bubbleAnchor = document.createElement('div');
    bubbleAnchor.classList.add('cluster-bubble-anchor');
    bubbleAnchor.appendChild(content);

    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('cluster-container');
    this.containerDiv.appendChild(bubbleAnchor);
  }

  onAdd() {
    this.parentElement.appendChild(this.containerDiv);
  }

  onRemove() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  }

  getContainer(): HTMLDivElement {
    return this.containerDiv;
  }
}
