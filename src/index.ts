import { Modal } from './Modal';

interface OneClickViewConfig {
  selector: string;
  zoomLevel?: number;
  transitionDuration?: number;
  modalBackground?: string;
  modalZIndex?: number;
}

export class oneclickview {
  private config: Required<OneClickViewConfig>;
  private elements: NodeListOf<HTMLImageElement> | null = null;
  private modal: Modal | null = null;

  constructor(config: OneClickViewConfig) {
    this.config = {
      zoomLevel: config.zoomLevel || 2,
      transitionDuration: config.transitionDuration || 0.3,
      selector: config.selector,
      modalBackground: config.modalBackground || 'rgba(0, 0, 0, 0.9)',
      modalZIndex: config.modalZIndex || 1000
    };
    
    this.initialize();
  }

  private initialize(): void {
    this.elements = document.querySelectorAll<HTMLImageElement>(this.config.selector);
    
    if (!this.elements || this.elements.length === 0) {
      console.warn(`No elements found with selector: ${this.config.selector}`);
      return;
    }

    this.setupEventListeners();
  }

  private createModal(): void {
    if (!this.modal) {
      this.modal = new Modal({
        backgroundColor: this.config.modalBackground,
        zIndex: this.config.modalZIndex
      });
    }
  }

  private showModal(imgSrc: string): void {
    this.modal?.show(imgSrc);
  }

  private setupEventListeners(): void {
    if (!this.elements) return;
    
    // Create modal container
    this.createModal();
    
    this.elements.forEach(element => {
      // Hover effect
      element.style.transition = `transform ${this.config.transitionDuration}s ease`;
      
      element.addEventListener('mouseenter', () => {
        element.style.transform = `scale(${this.config.zoomLevel})`;
        element.style.zIndex = '10';
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.zIndex = '';
      });
      
      // Click to show full image
      element.addEventListener('click', (e) => {
        e.preventDefault();
        const fullSizeSrc = element.dataset.src || element.src;
        if (fullSizeSrc) {
          this.showModal(fullSizeSrc);
        }
      });
      
      // Make images keyboard accessible
      element.setAttribute('tabindex', '0');
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const fullSizeSrc = element.dataset.src || element.src;
          if (fullSizeSrc) {
            this.showModal(fullSizeSrc);
          }
        }
      });
    });
  }

  // Public method to update configuration
  public updateConfig(newConfig: Partial<OneClickViewConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.initialize(); // Re-initialize with new config
  }

  // Cleanup method to remove event listeners
  public destroy(): void {
    if (!this.elements) return;
    
    this.elements.forEach(element => {
      element.removeEventListener('mouseenter', () => {});
      element.removeEventListener('mouseleave', () => {});
      element.removeEventListener('click', () => {});
      element.removeEventListener('keydown', () => {});
      element.style.transform = '';
      element.style.transition = '';
      element.style.zIndex = '';
    });
    
    this.modal?.destroy();
  }
}