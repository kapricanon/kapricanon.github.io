// Lazy loading script for image galleries
// Shows 12 images at a time, loads more as user scrolls

document.addEventListener('DOMContentLoaded', function() {
  var galleryContainers = document.querySelectorAll('.lazy-gallery');
  galleryContainers.forEach(function(container) {
    var images = JSON.parse(container.getAttribute('data-images'));
    // Deduplicate the entire image list before any batching occurs
    var seen = new Set();
    var filtered = [];
    for (var i = 0; i < images.length; i++) {
      var p = images[i].path || '';
      var name = p.split('/').pop().toLowerCase().replace(/\s+/g, '').trim();
      var key = name;
      if (images[i].size) {
        key += ':' + images[i].size;
      }
      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(images[i]);
      }
    }
    images = filtered;

    var batchSize = 24;
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
        // Do not set data-title, so no caption is shown in the lightbox
        a.style.setProperty('--i', i);
        var img = document.createElement('img');
        img.src = images[i].path;
        img.alt = images[i].name;
        img.width = 200;
        img.loading = 'lazy';
        a.appendChild(img);
        container.appendChild(a);
        // Trigger animation after insertion
        setTimeout((function(aEl){
          return function(){ aEl.classList.add('loaded'); };
        })(a), 30);
      }
      loaded = end;
      // Re-apply status bar suppression for new links
      if (window.suppressStatusBarLinks) {
        window.suppressStatusBarLinks('.lazy-gallery a');
      }
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
