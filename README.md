# OnClickView
## Description

Trying to mimic what *Dribble* does with just CSS for display single full images. By using CSS `:target` pseudo-class.

### Usage

Add `docs/css/main.css`

HTML markup would looks like something this.
```HTML
/* Thumbnail */
<a href="#img">
   <img class="thumbnail" src="thumbnail url" alt="Person on mountain">
</a>

/* Hidden containers */
/* The half-view when user clicks on the Thumbnail */
<div id="img" class="enlarged half-view">
 <a class="bg" href="#"></a>
 <div class="content">
   <a href="#img-full">
     <img src="full image size url" alt="Person on mountain">
   </a>
 </div>
</div>
/* The full-view when user clicks on the image displayed in the half-view container */
<div id="img-full" class="enlarged full-view">
 <div class="content">
   <a href="#img">
     <img src="full image size url" alt="Person on mountain">
   </a>
 </div>
</div>
```

Not meant for display many images, but it does what intended and without javascript(display one image). Check `docs/index.html` for multiple images.

### Lazy loading

Is posible to add `lazy loading` but with javascript(*data-src*, *loading* attributes).

```HTML
<img data-src="full image size url" alt="Person on mountain" loading="lazy">
```

```JavaScript
  window.addEventListener('hashchange', function() {
    var targetId = location.hash.substring(1);
    var overlay = document.getElementById(targetId);
    if (overlay) {
      overlay.querySelectorAll('img[data-src]').forEach(function(img) {
        if (!img.getAttribute('src')) {
          img.src = img.getAttribute('data-src');
        }
      });
    }
  });
```

This project is licensed under the MIT License - see the LICENSE file for details.
