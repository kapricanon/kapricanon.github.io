// Lazy loading script for image galleries
// Shows 12 images at a time, loads more as user scrolls

document.addEventListener('DOMContentLoaded', function() {
  var galleryContainers = document.querySelectorAll('.lazy-gallery');
  galleryContainers.forEach(function(container) {
    var images = JSON.parse(container.getAttribute('data-images'));
    var batchSize = 12;
    var loaded = 0;
    // Clear any existing content to avoid duplication
    container.innerHTML = '';
    function loadBatch() {
      // Only load if not already loaded all
      if (loaded >= images.length) return;
      var end = Math.min(loaded + batchSize, images.length);
      for (var i = loaded; i < end; i++) {
        var a = document.createElement('a');
        a.href = images[i].path;
        a.setAttribute('data-lightbox', container.getAttribute('data-lightbox'));
        a.setAttribute('data-title', images[i].name);
        var img = document.createElement('img');
        img.src = images[i].path;
        img.alt = images[i].name;
        img.width = 200;
        img.loading = 'lazy';
        a.appendChild(img);
        container.appendChild(a);
      }
      loaded = end;
    }
    function onScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadBatch();
        if (loaded >= images.length) {
          window.removeEventListener('scroll', onScroll);
        }
      }
    }
    loadBatch();
    window.addEventListener('scroll', onScroll);
  });
});
