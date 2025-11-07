interface ModalConfig {
  backgroundColor: string;
  zIndex: number;
}

export class Modal {
  private element: HTMLElement;
  private config: ModalConfig;

  constructor(config: ModalConfig) {
    this.config = config;
    this.element = this.createModalElement();
    this.setupEventListeners();
  }

  private createModalElement(): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'oneclickview-modal';
    modal.style.zIndex = this.config.zIndex.toString();
    modal.style.backgroundColor = this.config.backgroundColor;
    
    document.body.appendChild(modal);
    return modal;
  }

  private setupEventListeners(): void {
    // Close modal when clicking outside the image
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.hide();
    }
  }

  public show(imgSrc: string): void {
    // Clear previous content
    this.element.innerHTML = '';
    
    // Create and append the full-size image
    const fullImg = document.createElement('img');
    fullImg.src = imgSrc;
    fullImg.className = 'oneclickview-modal-img';
    
    this.element.appendChild(fullImg);
    this.element.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  public hide(): void {
    this.element.classList.remove('visible');
    document.body.style.overflow = '';
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.element.remove();
  }
}
