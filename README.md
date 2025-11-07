# OnClickView

Trying to mimic what Dribble does(zoom-in/out, modal, keyboard).

## Usage

### Basic Setup

1. Include the library in your HTML:

```html
<div class="gallery">
  <img 
    src="thumbnail.jpg"
    data-src="full-size.jpg"
    alt="Description"
    loading="lazy"
    class="thumbnail"
  >
  <!-- Add more images as needed -->
</div>

<!-- Include the library -->
<script src="onclickview.umd.js"></script>
<script>
  const gallery = new OnClickView({
    selector: '.gallery .thumbnail',
    // Optional configuration
    zoomLevel: 1.5,
    transitionDuration: 0.3,
    modalBackground: 'rgba(0, 0, 0, 0.9)',
    modalZIndex: 1000
  });
</script>
```

### With Module Bundlers

```typescript
import { OnClickView } from 'onclickview';

const gallery = new OnClickView({
  selector: '.gallery .thumbnail',
  zoomLevel: 1.5,
  transitionDuration: 0.3
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selector` | `string` | **Required** | CSS selector for target images |
| `zoomLevel` | `number` | `1.5` | Zoom level on hover |
| `transitionDuration` | `number` | `0.3` | Transition duration in seconds |
| `modalBackground` | `string` | `'rgba(0, 0, 0, 0.9)'` | Modal background color |
| `modalZIndex` | `number` | `1000` | z-index for the modal |

## Methods

### `updateConfig(config: Partial<Config>)`
Update the configuration after initialization.

```typescript
gallery.updateConfig({
  zoomLevel: 2,
  modalBackground: 'rgba(88, 114, 143, 0.9)'
});
```

### `destroy()`
Clean up event listeners and remove the modal from the DOM.

```typescript
gallery.destroy();
```

## Styling

The library adds the following CSS classes that you can style:

- `.oneclickview-hover` - Applied to gallery images
- `.oneclickview-modal` - The modal container
- `.oneclickview-modal.visible` - When the modal is open
- `.oneclickview-modal.full-width` - When in full-width mode

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`
