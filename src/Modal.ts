import type { ModalConfig } from './types';

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
    // Use event delegation for modal interactions
    this.element.addEventListener('pointerdown', this.handlePointerEvent);
    // Close on Escape key
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handlePointerEvent = (e: PointerEvent): void => {
    const target = e.target as HTMLElement;
    
    // Close modal when clicking outside the image
    if (target === this.element) {
      this.hide();
      return;
    }
    
    // Toggle full-width when clicking the image (if loaded)
    if (target.tagName === 'IMG') {
      e.stopPropagation();
      if (target.getAttribute('data-loading') !== 'true') {
        this.element.classList.toggle('full-width');
      }
    }
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.hide();
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public show(imgSrc: string): void {
    // Clear previous content
    this.element.innerHTML = '';
    
    // Create and append the full-size image
    const fullImg = document.createElement('img');
    fullImg.src = imgSrc;
    fullImg.className = 'oneclickview-modal-img loading';
    fullImg.setAttribute('data-loading', 'true');
    
    this.element.appendChild(fullImg);
    this.element.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  
  // Set image loaded state
  // This is called when the full-size image is loaded
  public setImageLoaded(): void {
    const img = this.element.querySelector('img');
    if (img) {
      img.setAttribute('data-loading', 'false');
    }
  }

  public hide(): void {
    this.element.classList.remove('visible');
    this.element.classList.remove('full-width');
    document.body.style.overflow = '';
  }

  public destroy(): void {
    this.element.removeEventListener('pointerdown', this.handlePointerEvent);
    document.removeEventListener('keydown', this.handleKeyDown);
    this.element.remove();
  }
}
