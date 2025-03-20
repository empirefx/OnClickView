(function(){
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
})();