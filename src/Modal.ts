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
    
    // Only allow toggling full-width when not loading
    fullImg.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fullImg.getAttribute('data-loading') !== 'true') {
        this.element.classList.toggle('full-width');
      }
    });
    
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
    document.removeEventListener('keydown', this.handleKeyDown);
    this.element.remove();
  }
}
