interface OneClickViewConfig {
  selector: string;
  zoomLevel?: number;
  transitionDuration?: number;
}

export class oneclickview {
  private config: OneClickViewConfig;
  private elements: NodeListOf<HTMLElement> | null = null;

  constructor(config: OneClickViewConfig) {
    this.config = {
      zoomLevel: config.zoomLevel || 2,
      transitionDuration: config.transitionDuration || 0.3,
      selector: config.selector
    };
    
    this.initialize();
  }

  private initialize(): void {
    this.elements = document.querySelectorAll<HTMLElement>(this.config.selector);
    
    if (!this.elements || this.elements.length === 0) {
      console.warn(`No elements found with selector: ${this.config.selector}`);
      return;
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.elements) return;
    
    this.elements.forEach(element => {
      element.style.transition = `transform ${this.config.transitionDuration}s ease`;
      
      element.addEventListener('mouseenter', () => {
        element.style.transform = `scale(${this.config.zoomLevel})`;
        element.style.zIndex = '10';
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.zIndex = '';
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
      element.style.transform = '';
      element.style.transition = '';
      element.style.zIndex = '';
    });
  }
}