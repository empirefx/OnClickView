import { Modal } from './Modal';
import type { OneClickViewConfig } from './types';

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

  /**
   * Handles loading and displaying an image in the modal
   * @param thumbnailSrc Source URL of the thumbnail image
   * @param fullSizeSrc Optional source URL of the full-size image
   */
  private loadAndShowImage(thumbnailSrc: string, fullSizeSrc?: string): void {
    // Show thumbnail as placeholder first
    this.showModal(thumbnailSrc);
    
    // If no full-size image is provided or it's the same as thumbnail, we're done
    if (!fullSizeSrc || fullSizeSrc === thumbnailSrc) {
      this.modal?.setImageLoaded();
      return;
    }
    
    // Preload the full-size image
    const img = new Image();
    img.onload = () => {
      // Replace with full-size image once loaded
      if (this.modal) {
        const modalImg = this.modal.getElement().querySelector('img');
        if (modalImg) {
          modalImg.src = fullSizeSrc;
          modalImg.classList.add('loaded');
          modalImg.classList.remove('loading');
          this.modal.setImageLoaded();
        }
      }
    };
    img.src = fullSizeSrc;
  }

  private setupEventListeners(): void {
    if (!this.elements) return;
    
    // Create modal container
    this.createModal();
    
    // Add styles to all matching elements
    this.elements.forEach(element => {
      element.classList.add('oneclickview-hover');
      element.style.setProperty('--transition-duration', `${this.config.transitionDuration}s`);
      element.style.setProperty('--zoom-level', this.config.zoomLevel.toString());
      element.setAttribute('tabindex', '0');
    });
    
    // Use event delegation for pointer and keyboard events
    document.addEventListener('pointerdown', this.handlePointerEvent);
    document.addEventListener('keydown', this.handleKeyDown);
  }
  
  private handlePointerEvent = (e: PointerEvent): void => {
    const target = e.target as HTMLElement;
    const element = target.closest(this.config.selector);
    
    // check if the target is an image element
    if (element && element.matches(this.config.selector)) {
      e.preventDefault();
      this.loadAndShowImage((element as HTMLImageElement).src, (element as HTMLImageElement).dataset.src);
    }
  };
  
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      if (target.matches(this.config.selector)) {
        e.preventDefault();
        this.loadAndShowImage((target as HTMLImageElement).src, (target as HTMLImageElement).dataset.src);
      }
    }
  };

  // Public method to update configuration
  public updateConfig(newConfig: Partial<OneClickViewConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.initialize(); // Re-initialize with new config
  }

  // Cleanup method to remove event listeners and classes
  public destroy(): void {
    document.removeEventListener('pointerdown', this.handlePointerEvent);
    document.removeEventListener('keydown', this.handleKeyDown);
    this.elements?.forEach(element => {
      element.classList.remove('oneclickview-hover');
      element.style.removeProperty('--transition-duration');
      element.style.removeProperty('--zoom-level');
    });
    this.modal?.destroy();
  }
}