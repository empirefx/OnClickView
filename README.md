# OnClickView

## Description

OnClickView is a lightweight JavaScript library that allows you to easily add zoom functionality to images on your web pages. Simply click on an image to zoom in and click again to zoom out.

### Usage

To use OnClickView, simply add the onclickview class to any image you want to be zoomable:
```HTML
<img src="your-image.jpg" class="onclickview" alt="Zoomable Image">
```

You can also initialize the library using JavaScript:
```JavaScript

document.addEventListener("DOMContentLoaded", function() {
    OnClickView.init();
});
```

### Configuration

The **config** object in *oneClickView.js* contains the following properties:

- `containerClassName`: The class name for the image container. Default: 'image-container'.
- `imageClassName`: The class name for the image node. Default: 'image-node'.
- `pathImage`: The path to the images. Default: 'images/'.
- `zoom`: A boolean indicating whether zoom functionality is enabled. Default: true.
- `patterns`: An object containing:
   - `thumbnail`: A regex pattern for matching thumbnail image names. Default: '(_thumbnail|-thumbnail|_thumb|_small|_medium)?'.
  - `caseInsensitive`: A boolean indicating whether the pattern matching is case insensitive. Default: true

This project is licensed under the MIT License - see the LICENSE file for details.

