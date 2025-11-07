import './style.css'
import { oneclickview } from './index.ts'

// Initialize the library with configuration
new oneclickview({
  selector: '.gallery img',  // Target all images inside elements with class 'gallery'
  zoomLevel: 1.5,           // Optional: default is 2
  transitionDuration: 0.2,    // Optional: default is 0.3s,
  modalBackground: 'rgba(88, 114, 143, 0.52)', // Optional: default is 'rgba(0, 0, 0, 0.9)'
  modalZIndex: 1000 // Optional: default is 1000
});

// Example of how to update configuration later if needed
// ocv.updateConfig({
//   zoomLevel: 2.5,
//   transitionDuration: 0.4
// });

// Example of how to clean up when needed
// window.addEventListener('beforeunload', () => {
//   ocv.destroy();
// });

